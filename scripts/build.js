import fse from 'fs-extra'
import path from 'path'
import CleanCSS from 'clean-css'
import { marked } from 'marked'
import { exec } from 'child_process'
import sanitizeHtml from 'sanitize-html'
import sass from 'sass'
import config from '../config.json'

build ()

async function build () {
  console.time('Built')
  const SRC = path.join(process.cwd(), 'src')
  const BUILDS = path.join(process.cwd(), 'builds')

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * RESET BUILDS OUTPUT
   * 
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  try {
    await fse.access(BUILDS)
    await fse.rm(BUILDS, { recursive: true, force: true })
    await fse.mkdir(BUILDS)
  } catch (err) {
    console.error('Something went wrong while accessing /builds directory')
    throw err
  }

  for (const buildData of config.builds) {

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *
     * CREATE BUILD OUTPUT
     * 
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    const BUILD = path.join(process.cwd(), `builds/${buildData.name}`)

    try {
      await fse.access(BUILD)
      await fse.rm(BUILD, { recursive: true, force: true })
    } catch (err) {

    } finally {
      await fse.copy(SRC, BUILD)
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *
     * TRANSFORM SRC FILES (TEMPLATES, TYPESCRIPT, SASS, ETC...)
     * 
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    let files = await deepLs(BUILD)
    await batchFileEdit(
      files,
      BUILD,
      async fileData => {

        // {{TEMPLATES}} replacement
        if (fileData.basename === '.DS_Store') return undefined
        const relPath = path.relative(BUILD, fileData.path)
        const content = fileData.content
        let newContent = content

        const lineKeepRegexp = /\{\{LINE_KEEP:([^\}]|(\}[^\}]))+\}\}/gm
        const lineKeepMatch = newContent.match(lineKeepRegexp)
        if (lineKeepMatch) {
          const lines = newContent.split('\n')
          const newLines = lines.filter(line => {
            const hasLineKeep = line.match(lineKeepRegexp)
            if (!hasLineKeep) return true
            const shouldKeep = line.match(new RegExp(`\{\{LINE_KEEP:${buildData.name}\}\}`, 'gm'))
            if (shouldKeep) return true
            return false
          })
          newContent = newLines.join('\n')
        }

        const lineStripRegexp = /\{\{LINE_STRIP:([^\}]|(\}[^\}]))+\}\}/gm
        const lineStripMatch = newContent.match(lineStripRegexp)
        if (lineStripMatch) {
          const lines = newContent.split('\n')
          const newLines = lines.filter(line => {
            const hasLineStrip = line.match(lineStripRegexp)
            if (!hasLineStrip) return true
            const shouldStrip = line.match(new RegExp(`\{\{LINE_STRIP:${buildData.name}\}\}`, 'gm'))
            if (shouldStrip) return false
            return true
          })
          newContent = newLines.join('\n')
        }

        newContent = newContent.replace(new RegExp(config.ROOT_URL_TEMPLATE, 'gm'), buildData.ROOT_URL)
        newContent = newContent.replace(new RegExp(config.THIS_URL_TEMPLATE, 'gm'), `${buildData.ROOT_URL}/${relPath}`)
        newContent = newContent.replace(new RegExp(config.PARENT_URL_TEMPLATE, 'gm'), `${buildData.ROOT_URL}/${path.join(relPath, '..')}`)
        
        return newContent
      },
      async fileData => {
        
        // README.md => README.html
        if (fileData.basename === 'README.md') {
          const htmlMarkdownPath = path.join(fileData.path, '../README.html')
          const htmlContent = marked.parse(fileData.content)
          const sanitizedHtmlContent = sanitizeHtml(htmlContent, { USE_PROFILES: { html: true } })
          await fse.writeFile(
            htmlMarkdownPath,
            sanitizedHtmlContent,
            { encoding: 'utf-8' }
          )
          await fse.rm(fileData.path)
        }

        // Compile TypeScript
        if (fileData.extension === '.ts') {
          const outPath = fileData.path.replace(/\.ts$/gm, '.js')
          exec(`tsc ${fileData.path} --outFile ${outPath}`, async (err, stdin, stderr) => {
            await fse.rm(fileData.path)
            if (err !== null) {
              console.error(err)
              console.error(stdin)
              console.error(stderr)
            }
          })
        }

        // Compile SASS
        if (fileData.extension === '.scss') {
          const outPath = fileData.path.replace(/\.scss$/gm, '.css')
          const compiled = sass.compile(fileData.path).css
          const minified = new CleanCSS({}).minify(compiled)
          await fse.writeFile(outPath, minified.styles, 'utf-8')
          await fse.rm(fileData.path)
        }

        // Minify CSS
        if (fileData.extension === '.css') {
          const minified = new CleanCSS({}).minify(fileData.content)
          await fse.writeFile(fileData.path, minified.styles, 'utf-8')
        }
      }
    )

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    *
    * ALIASES
    * 
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
 
    for (const alias of Object.entries(buildData.aliases)) {
      const [_to, _from] = alias
      const from = path.join(BUILD, _from)
      const to = path.join(BUILD, _to)
      console.log('\n\nCreating alias')
      console.log('from:', from)
      console.log('to:  ', to)

      try {
        await fse.access(from)
      } catch (err) {
        console.error(`Could not create alias from ${from} because this path does not exist.`)
        continue
      }

      try {
        await fse.access(to)
        console.error(`Could not create alias at ${to} because this path already exists.`)
        continue
      } catch (err) {

      }

      if (!isPathInScope(from, BUILD)) {
        console.error(`Could not create alias from ${from} because this path is out of build scope.`)
        continue
      }

      if (!isPathInScope(to, BUILD)) {
        console.error(`Could not create alias at ${to} because this path is out of build scope.`)
        continue
      }
      
      await fse.copy(from, to)
    }
  }

  console.log('')
  console.timeEnd('Built')
}

async function deepLs (srcPath) {
  const files = await fse.readdir(srcPath)
  const results = []
  for (let file of files) {
    const filePath = path.join(srcPath, file)
    const fileStat = await fse.stat(filePath)
    const isDirectory = fileStat.isDirectory()
    if (!isDirectory) results.push(filePath)
    else results.push(...(await deepLs(filePath)))
  }
  return results
}

function isPathInScope (_path, scope = './') {
  const isScopeAbsolute = path.isAbsolute(scope)
  const absoluteScope = isScopeAbsolute ? scope : path.join(process.cwd(), scope)
  const absolutePath = path.isAbsolute(_path) ? _path : path.join(process.cwd(), _path)
  const relativeToScopePath = path.relative(absoluteScope, absolutePath)
  const isInScope = relativeToScopePath  
      && !relativeToScopePath.startsWith('..')
      && !path.isAbsolute(relativeToScopePath)
  return isInScope
}

async function batchFileEdit (paths, scope = './', editorFunc, editorCallback) {
  const isScopeAbsolute = path.isAbsolute(scope)
  const absoluteScope = isScopeAbsolute ? scope : path.join(process.cwd(), scope)
  const absolutePaths = paths.map(relativePath => {
    return path.isAbsolute(relativePath)
      ? relativePath
      : path.join(process.cwd(), relativePath)
  }).filter(absolutePath => {
    return isPathInScope(absolutePath, absoluteScope)
  })

  for (const absolutePath of absolutePaths) {
    const extension = path.extname(absolutePath)
    const basename = path.basename(absolutePath)
    const content = await fse.readFile(absolutePath, 'utf8')
    const newContent = await editorFunc({ path: absolutePath, extension, basename, content })
    
    if (newContent === undefined) {
      await fse.rm(absolutePath, { force: true })
      continue
    }
    
    if (content !== newContent) await fse.writeFile(
      absolutePath,
      newContent,
      { encoding: 'utf8' }
    )

    if (typeof editorCallback === 'function') await editorCallback({
      path: absolutePath,
      extension,
      basename,
      content: newContent
    })
  }
}
