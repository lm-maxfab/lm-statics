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

    const topLevelFieldNodes = [...propsNode.querySelectorAll(':scope > data:not([title=""])')] as HTMLElement[]
    const props: LM.ComponentProps = {}

    topLevelFieldNodes.forEach(node => {
      const key = node.getAttribute('title')
      if (key === null || key === '') return
      props[key] = parsePropNode(node)
    })
    return props

    function parsePropNode (node: HTMLElement): LM.ComponentProp {
      const unnamedDataChildren = [...node.querySelectorAll(':scope > data:not([title])')] as HTMLElement[]
      const namedDataChildren = [...node.querySelectorAll(':scope > data[title]:not([title=""])')] as HTMLElement[]
      
      // If named data children are found, the node represents an object
      if (namedDataChildren.length !== 0) {
        const namedProps: LM.ComponentProp = {}
        namedDataChildren.forEach(node => {
          const key = node.getAttribute('title')
          if (key === null || key === undefined) return
          namedProps[key] = parsePropNode(node)
        })
        return namedProps
      }
      
      // If unnamed data children are found, the node represents an array
      if (unnamedDataChildren.length !== 0) {
        return unnamedDataChildren.map(node => parsePropNode(node))
      }

      // If no data children are found, the node represents a raw value
      const nodeType = node.dataset.type
      const rawNodeValue = node.innerHTML.trim()
      let nodeValue: string|number|boolean|null = rawNodeValue
      if (nodeType === 'number') nodeValue = parseFloat(rawNodeValue)
      else if (nodeType === 'boolean') nodeValue = rawNodeValue.toLowerCase().trim() === 'true'
      else if (nodeType === 'null') nodeValue = null      
      return nodeValue
    }
  }

  /* * * * * * * * * * * * * * * * * * * *
   *
   * GENERATE ID
   * 
   * * * * * * * * * * * * * * * * * * * */
  const generatedIds: string[] = []

  function generateId (length: number = 8): string {
    function genChar () {
      return Math
        .floor(Math.random() * 36)
        .toString(36)
    }

    const generated = new Array(length)
      .fill(null)
      .map(genChar)
      .join('')

    if (generatedIds.includes(generated)) {
      return generateId(length)
    }

    generatedIds.push(generated)
    return generated
  }
  
  ;(window as LM.Window).LMV_COMPONENT = {
    getPropsNode,
    readProps,
    generateId
  }
})();
