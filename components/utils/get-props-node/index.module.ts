export default function getPropsNode (element: HTMLElement): HTMLDataElement|null {
  const selector = 'data.lmh-component__props'
  const select = element.querySelector.bind(element)
  return select(selector) as HTMLDataElement|null
}
