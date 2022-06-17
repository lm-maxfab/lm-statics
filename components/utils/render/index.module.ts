import getPropsNode from '../get-props-node/index.module.js'
import readPropsNode from '../read-props-node/index.module.js'
import renderers from './renderers-data.module.js'

export default async function render (compNode: HTMLElement) {
  const compType = compNode.dataset['type']
  const validCompTypes = Object.keys(renderers)
  const isValidCompType = validCompTypes.includes(compType)
  if (!isValidCompType) return console.error(`Cannot find a component renderer for ${compType} component type.`)

  type RendererType = (rootNode: HTMLElement, props: any) => Promise<void>|void
  let renderer: RendererType|null = null
  const rendererUrl = renderers[compType] as string
  try { renderer = (await import(rendererUrl)).default as RendererType }
  catch (err) { console.error(`Something went wrong while fetching the ${compType} renderer.`, err) }
  if (renderer === null) return
  
  const propsNode = getPropsNode(compNode)
  const props = propsNode !== null ? readPropsNode(propsNode) : {}
  await renderer(compNode, props)
}
