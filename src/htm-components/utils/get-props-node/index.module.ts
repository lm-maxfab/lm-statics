function getPropsNode (element: HTMLElement) {
  return element.querySelector('data.lmh-component__props') as HTMLDataElement|null
}

export default getPropsNode
