import getNodes from '../utils/get-nodes/index.module.js'
import getPropsNode from '../utils/get-props-node/index.module.js'
import readPropsNode from '../utils/read-props-node/index.module.js'

const allNodes = getNodes()
allNodes.forEach(node => {
  const propsNode = getPropsNode(node)
  if (propsNode === null) return
  const jsProps = readPropsNode(propsNode)
  console.log(jsProps)
})

// import { html, render } from '../../lib/htm/v3.1.1/preact/standalone.module.js'

// console.log(html)
// console.log(render)
