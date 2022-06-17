/* {{IMPORT: ../../lib/htm/v3.1.1/preact/standalone.module.js}} */

import { html, render, Component } from '../../lib/htm/v3.1.1/preact/standalone.module.js'

interface Props {}
interface State {
  count: number
}

class SomeHTMComp extends Component {
  constructor (props: Props) {
    super(props)
    this.increment = this.increment.bind(this)
  }
  
  state: State = { count: 0 }
  
  increment () {
    const setState = (this as any).setState
    setState(curr => {
      return {
        ...curr,
        count: curr.count + 1
      }
    })
  }
  
  render () {
    return html`<div onclick="${this.increment}">
      Le compte est de: ${this.state.count}
    </div>`
  }
}

export default async function renderer (node: HTMLElement, props: any) {
  render(html`<${SomeHTMComp} ...${props} />`, node)
}
