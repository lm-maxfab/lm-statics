class CustomError extends Error {
  details: string[]
  constructor (message: string, data: string[]) {
    super(message)
    this.details = data
  }
}

async function injectStyles (_hrefs: string|string[]): Promise<true|CustomError> {
  let isResolved = false
  return new Promise(resolve => {
    const hrefs = Array.isArray(_hrefs) ? _hrefs : [_hrefs]

    const loadedTags = hrefs.map(href => ({ href, loaded: false }))
    window.setTimeout(() => {
      if (isResolved) return
      const notLoaded = loadedTags.filter(tag => tag.loaded === false).map(tag => tag.href)
      console.warn('Some styles could not be loaded:\n', notLoaded.join('\n'))
      const error = new CustomError('Some styles could not be loaded.', notLoaded)
      resolve(error)
    }, 500)

    function handleLoadSuccess (href: string) {
      const found = loadedTags.find(tag => tag.href === href)
      if (found === undefined) return
      found.loaded = true
      const allLoaded = loadedTags.every(tag => tag.loaded === true)
      if (allLoaded && !isResolved) {
        isResolved = true
        resolve(true)
      }
    }

    const styleTags = hrefs.map(href => {
      const tag = document.createElement('link')
      tag.setAttribute('rel', 'stylesheet')
      tag.setAttribute('type', 'text/css')
      tag.setAttribute('href', href)
      tag.addEventListener('load', () => handleLoadSuccess(href))
      return tag
    })

    const head = document.head
    for (const tag of styleTags) head.append(tag)
  })
}

export default injectStyles
