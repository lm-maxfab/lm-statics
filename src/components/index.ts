/// <reference path="../types/main.d.ts" />

(function () {
  if ((window as LM.Window).LMV_COMPONENT !== undefined) return
  
  /* * * * * * * * * * * * * * * * * * * *
   *
   * GET PROPS NODE
   * 
   * * * * * * * * * * * * * * * * * * * */
  function getPropsNode (node: HTMLElement): HTMLElement|null {
    return node.querySelector(':scope > .lmv-component__props') as HTMLElement|null
  }

  /* * * * * * * * * * * * * * * * * * * *
   *
   * READ PROPS
   * 
   * * * * * * * * * * * * * * * * * * * */
  function readProps (node: HTMLElement): LM.ComponentProps|undefined {
    const propsNode = getPropsNode(node)
    if (propsNode === null) return
    const topLevelFieldNodes = [...propsNode.querySelectorAll(':scope > data:not([title=""])')] as Array<HTMLElement>
    const props: LM.ComponentProps = {}
    topLevelFieldNodes.forEach(node => {
      const key = node.getAttribute('title')
      if (key === null || key === '') return
      props[key] = parsePropNode(node)
    })
    return props

    function parsePropNode (node: HTMLElement): LM.ComponentProp {
      const unnamedDataChildren = [...node.querySelectorAll(':scope > data:not([title])')] as Array<HTMLElement>
      const namedDataChildren = [...node.querySelectorAll(':scope > data[title]:not([title=""])')] as Array<HTMLElement>
      const dataChildren = [...unnamedDataChildren, ...namedDataChildren]
      if (dataChildren.length === 0) return node.innerHTML.trim()
      if (unnamedDataChildren.length !== 0) return unnamedDataChildren.map(node => parsePropNode(node))
      const namedProps: LM.ComponentProp = {}
      namedDataChildren.forEach(node => {
        const key = node.getAttribute('title')
        if (key === null || key === undefined) return
        namedProps[key] = parsePropNode(node)
      })
      return namedProps
    }
  }
  
  ;(window as LM.Window).LMV_COMPONENT = {
    getPropsNode,
    readProps
  }
})();
