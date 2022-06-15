/* {{IMPORT: ../../lib/htm/v3.1.1/preact/standalone.module.js}} */

import { html, render, Component as UntypedComponent } from '../../lib/htm/v3.1.1/preact/standalone.module.js'

type MyCompStateSetterObj<S> = Partial<S>
type MyCompStateSetterFunction<S> = (curr: S) => S|null
type MyCompStateSetter<S> = MyCompStateSetterObj<S>|MyCompStateSetterFunction<S>
interface MyCompInterface<P, S> {
  props: P
  state: S
  setState: ((param: MyCompStateSetter<S>) => void)
}
interface Props {}
interface State {
  count: number
}

const Component = UntypedComponent

class SomeHTMComp extends Component {
  constructor (props: Props) {
    super(props)
    this.increment = this.increment.bind(this)
  }
  
  state: State = { count: 0 }
  
  increment () {
    console.log(this.setState)
    this.setState(curr => {
      return {
        ...curr,
        count: curr.count + 1
      }
    })
  }
  
  render () {
    return html`<div onclick="${this.increment}">Le compte est de: ${this.state.count}</div>`
  }
}

export default async function renderer (node: HTMLElement, props: any) {
  render(html`<${SomeHTMComp} />`, node)
}
