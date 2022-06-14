function getNodes () {
  const allNodes = document.querySelectorAll('.lmh-component')
  return [...allNodes] as HTMLElement[]
}

export default getNodes
