type RawWindow = Window

declare namespace LM {
  export type CompId = string

  export type CompStringProp = string
  export type CompNumberProp = number
  export type CompBooleanProp = boolean
  export type CompNullProp = null

  export type CompObjectProp = { [key: string]: CompStringProp|CompNumberProp|CompBooleanProp|CompNullProp|CompObjectProp|CompArrayProp }
  export type CompArrayProp = Array<CompStringProp|CompNumberProp|CompBooleanProp|CompNullProp|CompObjectProp|CompArrayProp>

  export type CompProp = CompStringProp|CompNumberProp|CompBooleanProp|CompNullProp|CompObjectProp|CompArrayProp

  export type CompProps<P> = { [K in keyof P]: CompProp }
  export type CompState<S> = CompProps<S>
  export type CompValues<V> = CompProps<V>

  export type CompStateUpdate<S> = { [K in keyof S]?: CompProp }
  export type CompValuesUpdate<V> = { [K in keyof V]?: CompProp }

  export type CompStateSetterFunction<S> = (prevState: CompState<S>|undefined) => CompState<S>|null
  export type CompValuesSetterFunction<V> = (prevValues: CompValues<V>|undefined) => CompValues<V>|null
  
  export type CompStateSetter<S> = CompStateUpdate<S>|CompStateSetterFunction<S>
  export type CompValuesSetter<V> = CompValuesUpdate<V>|CompValuesSetterFunction<V>

  export interface CompRegisterData<P, S, V> {
    id: string
    node: HTMLElement
    props?: CompProps<P>
    state?: CompState<S>
    values?: CompValues<V>
    renderer: CompRenderer
  }

  export type CompSetStateFunction<S> = (id: CompId, stateSetter: CompStateSetter<S>) => void
  export type CompSetValuesFunction<V> = (id: CompId, valuesSetter: CompValuesSetter<V>) => void

  export interface CompRendererArgs<P, S, V> {
    props: CompRegisterData<P, S, V>['props']
    state: CompRegisterData<P, S, V>['state']
    values: CompRegisterData<P, S, V>['values']
    setState: (setter: CompStateSetter<S>) => ReturnType<CompSetStateFunction<S>>
    setValues: (setter: CompValuesSetter<V>) => ReturnType<CompSetValuesFunction<V>>
    getNode: () => HTMLElement|null
  }
  export interface CompRendererListenerDescriptor {
    selector: string
    eventType: Event['type']
    handler: (e: Event) => void
  }
  export interface CompRendererReturnValue {
    mainClass: string,
    classModifiers: string[],
    innerDomString: string|null,
    listeners: Array<CompRendererListenerDescriptor>
  }
  export type CompRenderer = <P, S, V>(args: CompRendererArgs<P, S, V>) => CompRendererReturnValue

  export type CompIniter = <P, S, V>(node: HTMLElement, renderer: CompRenderer<P, S, V>) => Promise<string|undefined>
  export type CompInitAll = <P, S, V>(selector: string, renderer: CompRenderer<P, S, V>) => Promise<Array<string|undefined>>
  export interface CompSelectNodesOptions {
    initialized?: true|false
  }
  export type CompSelectNodes = (selector: string, options?: CompSelectNodesOptions) => HTMLElement[]

  export type LibName = 'dayjs'|'OpenSeadragon'

  export interface Window extends RawWindow {
    LMV_COMPONENT?: {
      init: CompIniter
      initAll: CompInitAll
      selectNodes: CompSelectNodes

      // Deprecated
      getPropsNode: (node: HTMLElement) => HTMLElement|null
      readProps: (node: HTMLElement) => CompProps<any>|undefined
      generateId: (length?: number) => string
    }

    LM_LIB?: {
      scope: (libs: LibName|LibName[]) => void
      dayjs?: any
      OpenSeadragon?: any
    }

    dayjs?: any
    OpenSeadragon?: any
  }
}
