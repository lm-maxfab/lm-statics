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

  export type ComponentPropsSetterFunction = (prevProps: ComponentProps) => ComponentProps|null
  export type ComponentStateSetterFunction = (prevState: ComponentState) => ComponentState|null
  export type ComponentValuesSetterFunction = (prevValues: ComponentValues) => ComponentValues|null
  
  export type ComponentPropsSetter = ComponentProps|ComponentPropsSetterFunction
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
  export interface ComponentRendererArgs {
    id: ComponentRegisterData['id']
    props?: ComponentRegisterData['props']
    state?: ComponentRegisterData['state']
    values?: ComponentRegisterData['values']
  }
  export type ComponentRenderer = (args: ComponentRendererArgs) => {
    mainClass: string,
    classModifiers: string[],
    innerDomString: string,
    listeners: Array<{
      selector: string
      eventType: Event['type']
      handler: (e: Event) => void
    }>
  }

  export type ComponentIniter = (node: HTMLElement, renderer: ComponentRenderer) => string|undefined
  export type ComponentRenderFunc = (id: ComponentId) => void
  export type ComponentSetPropsFunction = (id: ComponentId, propsSetter: ComponentPropsSetter) => void
  export type ComponentSetStateFunction = (id: ComponentId, stateSetter: ComponentStateSetter) => void
  export type ComponentSetValuesFunction = (id: ComponentId, valuesSetter: ComponentValuesSetter) => void

  export interface LMAppPageSettings {
    layout: string
    template: string
    env: string
  }

  export type LMLibName = 'dayjs'|'OpenSeadragon'

  export interface Window extends RawWindow {
    LMV_COMPONENT?: {
      getPropsNode: (node: HTMLElement) => HTMLElement|null
      readProps: (node: HTMLElement) => ComponentProps|undefined
      generateId: (length?: number) => string
      componentsRegister: ComponentRegisterData[]
      registerComponentData: (data: ComponentRegisterData) => ComponentRegisterData|undefined
      renderComponent: (node: HTMLElement) => Promise<void>

      init: ComponentIniter
      render: ComponentRenderFunc
      setProps: ComponentSetPropsFunction
      setState: ComponentSetStateFunction
      setValues: ComponentSetValuesFunction
    }

    LM_APP?: {
      applyPageSettings?: (settings: LMAppPageSettings) => void
    }

    LM_LIB?: {
      scope: (libs: LMLibName|LMLibName[]) => void
      dayjs?: any
      OpenSeadragon?: any
    }

    dayjs?: any
    OpenSeadragon?: any
  }
}
