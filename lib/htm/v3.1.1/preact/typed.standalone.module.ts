/* {{IMPORT: ./standalone.module.js}} */

// @ts-ignore
import { html, render, Component as UntypedComponent } from './standalone.module.js'

type ComponentStateSetterObj<S> = Partial<S>
type ComponentStateSetterFunc<S> = (curr: S) => S|null
type ComponentStateSetter<S> = ComponentStateSetterObj<S>|ComponentStateSetterFunc<S>

interface ComponentInterface<P, S> {
  props: P
  state: S
  setState: (stateSetter: ComponentStateSetter<S>) => void
}

class Component<P, S> extends UntypedComponent implements ComponentInterface<P, S> {
  props: ComponentInterface<P, S>['props']
  state: ComponentInterface<P, S>['state']
  setState: ComponentInterface<P, S>['setState']
  constructor (props: P) {
    super(props)
  }
}

export {
  html,
  render,
  Component
}

export type {
  ComponentStateSetterObj,
  ComponentStateSetterFunc,
  ComponentStateSetter,
  ComponentInterface
}
