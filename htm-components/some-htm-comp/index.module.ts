import { html, render, Component } from '../../lib/htm/v3.1.1/preact/typed.standalone.module.js'
import injectStyles from '../utils/inject-styles/index.module.js'

// Types
interface Props {}
interface State {
  count: number
}

// Component
class SomeHTMComp extends Component<Props, State> {
  state: State = { count: 0 }

  /* * * * * * * * * * * * * * * * * * *
   * CONSTRUCTOR
   * * * * * * * * * * * * * * * * * * */
  constructor (props: Props) {
    super(props)
    this.increment = this.increment.bind(this)
  }
  
  /* * * * * * * * * * * * * * * * * * *
   * METHODS
   * * * * * * * * * * * * * * * * * * */
  increment () {
    this.setState(curr => ({
      ...curr,
      count: curr.count + 1
    }))
  }

  /* * * * * * * * * * * * * * * * * * *
   * RENDER
   * * * * * * * * * * * * * * * * * * */
  render () {
    return html`<div onclick="${this.increment}">
      Le compte est de: ${this.state.count}
    </div>`
  }
}

// Renderer
export default async function renderer (node: HTMLElement, props: any) {
  await injectStyles('{{PARENT_URL}}/styles.css')
  render(html`<${SomeHTMComp} ...${props} />`, node)
}
