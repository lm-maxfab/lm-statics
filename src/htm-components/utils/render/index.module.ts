import getPropsNode from '../get-props-node/index.module.js'
import readPropsNode from '../read-props-node/index.module.js'
import factories from './factories-data.module.js'

async function render (compNode: HTMLElement) {
  const compType = compNode.dataset['type']
  const validCompTypes = Object.keys(factories)
  const isValidCompType = validCompTypes.includes(compType)

  if (!isValidCompType) return

  const propsNode = getPropsNode(compNode)
  const props = propsNode !== null ? readPropsNode(propsNode) : {}

  const factoryUrl = factories[compType] as string
  const factory = await import(factoryUrl)
  console.log(factory)
  
}

export default render
