/// <reference path="../types/main.d.ts" />

(function () {
  if ((window as LM.Window).LMV_COMPONENT !== undefined) {
    console.warn('window.LMV_COMPONENT already exists.')
    return
  }

  /********************************************************************************/
  /********************************************************************************/
  /********************************************************************************/
  /********************************************************************************/

  const register: LM.ComponentRegisterData[] = []

  function queryRegisterById (id: LM.ComponentId) {
    return register.find(elt => elt.id === id)
  }

  function registerComponent (componentData: any) {
    const foundInRegister = queryRegisterById(componentData.id)
    if (foundInRegister !== undefined) {
      // What to do with already inited ?
      console.warn('Component with this id has already been initialized.')
    } else {
      register.push(componentData)
    }
  }

  function init (node: HTMLElement, renderer: LM.ComponentRenderer): string|undefined {
    const idAttribute = node.getAttribute('data-lmv-id') ?? ''
    const componentData = queryRegisterById(idAttribute)
    if (componentData !== undefined) return componentData.id

    const props = readProps(node)
    const id = generateId()
    node.setAttribute('data-lmv-id', id)
    node.innerHTML = ''
    // [WIP]: await for dom changes and return
    registerComponent({ id, node, props, renderer })
    window.setTimeout(() => render(id), 50)
  }

  function render (id: LM.ComponentId) {
    const node = document.querySelector(`.lmv-component[data-lmv-id="${id}"]`)
    if (node === null) return

    const componentData = queryRegisterById(id)
    if (componentData === undefined) return

    const {
      mainClass,
      classModifiers,
      innerDomString,
      listeners
    } = componentData.renderer({
      id,
      props: componentData.props,
      state: componentData.state,
      values: componentData.values,
    })

    node.innerHTML = innerDomString
    node.setAttribute('class', [
      'lmv-component',
      mainClass,
      ...classModifiers.map(modifier => `${mainClass}_${modifier}`)
    ].join(' '))

    // [WIP]: cleanly await for dom changes
    window.setTimeout(() => {
      const node = document.querySelector(`.lmv-component[data-lmv-id="${id}"]`)
      if (node === null) return
      listeners.forEach(listener => {

        const { selector, eventType, handler } = listener
        const target = node.querySelector(selector)
        if (target === null) return
        target.addEventListener(eventType, handler)
      })
    }, 50)
  }

  function setState (id: LM.ComponentId, stateSetter: LM.ComponentStateSetter) {
    const componentData = queryRegisterById(id)
    if (componentData === undefined) return

    if (typeof stateSetter === 'function') {
      const newState = stateSetter({ ...componentData.state })
      if (newState === null) return
      componentData.state = newState
      render(id)
    } else {
      componentData.state = {
        ...(componentData.state ?? {}),
        ...stateSetter
      }
      render(id)
    }
  }

  function setProps (id: LM.ComponentId, propsSetter: LM.ComponentPropsSetter) {
    const componentData = queryRegisterById(id)
    if (componentData === undefined) return

    if (typeof propsSetter === 'function') {
      const newProps = propsSetter({ ...componentData.props })
      if (newProps === null) return
      componentData.props = newProps
      render(id)
    } else {
      componentData.props = {
        ...(componentData.props ?? {}),
        ...propsSetter
      }
      render(id)
    }
  }

  function setValues (id: LM.ComponentId, valuesSetter: LM.ComponentValuesSetter) {
    const componentData = queryRegisterById(id)
    if (componentData === undefined) return

    if (typeof valuesSetter === 'function') {
      const newValues = valuesSetter({ ...componentData.values })
      if (newValues === null) return
      componentData.values = newValues
    } else {
      componentData.values = {
        ...(componentData.values ?? {}),
        ...valuesSetter
      }
    }
  }


  /********************************************************************************/
  /********************************************************************************/
  /********************************************************************************/
  /********************************************************************************/

  const componentsRegister: LM.ComponentRegisterData[] = []

  function registerComponentData (componentData: LM.ComponentRegisterData): LM.ComponentRegisterData|undefined {
    if (componentData.id === '') return
    const alreadyRegisteredIndex = componentsRegister.findIndex(regCompData => regCompData.id === componentData.id)
    if (alreadyRegisteredIndex === -1) componentsRegister.push(componentData)
    else componentsRegister[alreadyRegisteredIndex] = componentData
    return componentData
  }

  function getComponentRegisterDataById (id: string): LM.ComponentRegisterData|undefined {
    if (id === '') return
    return componentsRegister.find(compData => compData.id === id)
  }

  function getComponentRegisterDataByNode (node: HTMLElement): LM.ComponentRegisterData|undefined {
    return componentsRegister.find(compData => compData.node === node)
  }

  function initComponent (node: HTMLElement): Promise<LM.ComponentRegisterData> {
    const props = readProps(node)
    const id = generateId()
    return new Promise((resolve, reject) => {
      new MutationObserver((_, observer) => {
        observer.disconnect()
        const componentRegisterData = registerComponentData({ id, node, props })
        if (componentRegisterData === undefined) return reject('Component could not be registered')
        resolve(componentRegisterData)
      }).observe(node, {
        attributes: true,
        attributeFilter: ['data-lmv-id']
      })
      node.setAttribute('data-lmv-id', id)
    })
  }

  async function renderComponent (node: HTMLElement): Promise<void> {
    const foundComponentId = node.dataset['lmvId'] ?? ''

    if (foundComponentId === '') await initComponent(node)
    const currentRegisterData = getComponentRegisterDataByNode(node)
    console.log(currentRegisterData)
    
    
    
    // let componentRegisterData = getComponentRegisterDataById(foundComponentId)
    
    // if (componentRegisterData === undefined) {
    //   await initComponent(node)
    // }



  }












  /********************************************************************************/
  /********************************************************************************/
  /********************************************************************************/
  /********************************************************************************/




  
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
  
  /* * * * * * * * * * * * * * * * * * * *
   *
   * EXPORT
   * 
   * * * * * * * * * * * * * * * * * * * */
  ;(window as LM.Window).LMV_COMPONENT = {
    getPropsNode,
    readProps,
    generateId,

    componentsRegister,
    registerComponentData,
    renderComponent,

    init,
    render,
    setState,
    setProps,
    setValues
  }
})();
