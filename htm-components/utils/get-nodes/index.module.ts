export default function getNodes (): HTMLElement[] {
  const selector = '.lmh-component'
  const select = document.querySelectorAll.bind(document)
  return [...select(selector)] as HTMLElement[]
}
