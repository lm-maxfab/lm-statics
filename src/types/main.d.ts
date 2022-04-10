type RawWindow = Window

declare namespace LM {
  export type ComponentId = string

  export type ComponentStringProp = string
  export type ComponentNumberProp = number
  export type ComponentBooleanProp = boolean
  export type ComponentNullProp = null

  export type ComponentObjectProp = { [key: string]: ComponentStringProp|ComponentNumberProp|ComponentBooleanProp|ComponentNullProp|ComponentObjectProp|ComponentArrayProp }
  export type ComponentArrayProp = Array<ComponentStringProp|ComponentNumberProp|ComponentBooleanProp|ComponentNullProp|ComponentObjectProp|ComponentArrayProp>

  export type ComponentProp = ComponentStringProp|ComponentNumberProp|ComponentBooleanProp|ComponentNullProp|ComponentObjectProp|ComponentArrayProp

  export interface ComponentProps { [key: string]: ComponentProp }
  export type ComponentState = ComponentProps
  export type ComponentValues = ComponentProps

  export type ComponentStateSetterFunction = (prevState: ComponentState) => ComponentState|null
  export type ComponentValuesSetterFunction = (prevValues: ComponentValues) => ComponentValues|null
  
  export type ComponentStateSetter = ComponentState|ComponentStateSetterFunction
  export type ComponentValuesSetter = ComponentValues|ComponentValuesSetterFunction

  export interface ComponentRegisterData {
    id: string
    node: HTMLElement
    props?: ComponentProps
    state?: ComponentState
    values?: ComponentValues
    renderer: ComponentRenderer
  }

  export type ComponentSetStateFunction = (id: ComponentId, stateSetter: ComponentStateSetter) => void
  export type ComponentSetValuesFunction = (id: ComponentId, valuesSetter: ComponentValuesSetter) => void

  export interface ComponentRendererArgs {
    props?: ComponentRegisterData['props']
    state?: ComponentRegisterData['state']
    values?: ComponentRegisterData['values']
    setState: (setter: ComponentStateSetter) => ReturnType<ComponentSetStateFunction>
    setValues: (setter: ComponentValuesSetter) => ReturnType<ComponentSetValuesFunction>
  }
  export interface ComponentRendererListenerDescriptor {
    selector: string
    eventType: Event['type']
    handler: (e: Event) => void
  }
  export interface ComponentRendererReturnValue {
    mainClass: string,
    classModifiers: string[],
    innerDomString: string,
    listeners: Array<ComponentRendererListenerDescriptor>
  }
  export type ComponentRenderer = (args: ComponentRendererArgs) => ComponentRendererReturnValue

  export type ComponentIniter = (node: HTMLElement, renderer: ComponentRenderer) => Promise<string|undefined>
  export type ComponentInitAll = (selector: string, renderer: ComponentRenderer) => Promise<Array<string|undefined>>
  export interface ComponentSelectNodesOptions {
    initialized?: true|false
  }
  export type ComponentSelectNodes = (selector: string, options?: ComponentSelectNodesOptions) => HTMLElement[]

  export type LibName = 'dayjs'|'OpenSeadragon'

  export interface Window extends RawWindow {
    LMV_COMPONENT?: {
      init: ComponentIniter
      initAll: ComponentInitAll
      selectNodes: ComponentSelectNodes

      // Deprecated
      getPropsNode: (node: HTMLElement) => HTMLElement|null
      readProps: (node: HTMLElement) => ComponentProps|undefined
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
