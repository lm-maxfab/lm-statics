type RawWindow = Window

declare namespace LM {
  export type ComponentStringProp = string
  export type ComponentObjectProp = { [key: string]: ComponentStringProp|ComponentObjectProp|ComponentArrayProp }
  export type ComponentArrayProp = Array<ComponentStringProp|ComponentObjectProp|ComponentArrayProp>
  export type ComponentProp = ComponentStringProp|ComponentObjectProp|ComponentArrayProp
  export interface ComponentProps { [key: string]: ComponentProp }

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
