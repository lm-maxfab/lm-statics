import injectStyles from '../inject-styles/index.module.js'
import getNodes from '../get-nodes/index.module.js'
import render from '../render/index.module.js'

async function initPage () {
  const styles = [
    '{{ROOT_URL}}/styles/reset.css',
    '{{ROOT_URL}}/styles/fonts.css',
    '{{ROOT_URL}}/styles/variables.css',
    '{{ROOT_URL}}/components/styles.css'
  ]
  await injectStyles(styles)
  getNodes().forEach(render)
}

initPage()

export default initPage
