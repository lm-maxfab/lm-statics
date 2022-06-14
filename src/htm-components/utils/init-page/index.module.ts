import getNodes from '../get-nodes/index.module.js'
import render from '../render/index.module.js'

// [WIP] Should inject generic styles

const allNodes = getNodes()
console.log('I got all nodes:')
console.log(allNodes)
allNodes.forEach(node => {
  console.log('I require rendering of', node)
  render(node)
})
