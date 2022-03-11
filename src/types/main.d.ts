type RawWindow = Window

declare namespace LM {
  export type ComponentStringProp = string
  export type ComponentObjectProp = { [key: string]: ComponentStringProp|ComponentObjectProp|ComponentArrayProp }
  export type ComponentArrayProp = Array<ComponentStringProp|ComponentObjectProp|ComponentArrayProp>
  export type ComponentProp = ComponentStringProp|ComponentObjectProp|ComponentArrayProp
  export interface ComponentProps { [key: string]: ComponentProp }

  export interface Window extends RawWindow {
    LMV_COMPONENT?: {
      getPropsNode: (node: HTMLElement) => HTMLElement|null
      readProps: (node: HTMLElement) => ComponentProps|undefined
    }

    dayjs?: any
  }
}
