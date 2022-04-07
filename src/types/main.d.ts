type RawWindow = Window

declare namespace LM {
  export type ComponentStringProp = string
  export type ComponentNumberProp = number
  export type ComponentBooleanProp = boolean
  export type ComponentNullProp = null
  
  export type ComponentObjectProp = {
    [key: string]:
      ComponentStringProp
      |ComponentNumberProp
      |ComponentBooleanProp
      |ComponentNullProp
      |ComponentObjectProp
      |ComponentArrayProp
  }
  
  export type ComponentArrayProp = Array<
    ComponentStringProp
    |ComponentNumberProp
    |ComponentBooleanProp
    |ComponentNullProp
    |ComponentObjectProp
    |ComponentArrayProp
  >
  
  export type ComponentProp = ComponentStringProp
    |ComponentNumberProp
    |ComponentBooleanProp
    |ComponentNullProp
    |ComponentObjectProp
    |ComponentArrayProp
  
    export interface ComponentProps {
    [key: string]: ComponentProp
  }

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
