/// <reference path="../types/main.d.ts" />

(function () {
  const lmWindow = window as LM.Window
  const lmvComponent = lmWindow.LMV_COMPONENT
  if (lmvComponent !== undefined) return console.warn('window.LMV_COMPONENT already exists.')

  /* * * * * * * * * * * * * * * * * * * *
   *
   * GENERATE COMPONENT ID
   * 
   * * * * * * * * * * * * * * * * * * * */

  const generatedComponentsIds: string[] = []
  function generateComponentId (length: number = 8): string {
    const genChar = () => Math.floor(Math.random() * 36).toString(36)
    const generated = new Array(length).fill(null).map(genChar).join('')
    if (generatedComponentsIds.includes(generated)) return generateComponentId(length)
    generatedComponentsIds.push(generated)
    return generated
  }

  /* * * * * * * * * * * * * * * * * * * *
   *
   * GET & READ COMPONENT PROPS NODE
   * 
   * * * * * * * * * * * * * * * * * * * */

  function getComponentPropsNode (node: HTMLElement): HTMLElement|null {
    return node.querySelector(':scope > .lmv-component__props') as HTMLElement|null
  }

  function readComponentProps <P>(node: HTMLElement): LM.CompProps<P>|undefined {
    const propsNode = getComponentPropsNode(node)
    if (propsNode === null) return

    const topLevelFieldNodes = [...propsNode.querySelectorAll(':scope > data:not([title=""])')] as HTMLElement[]
    const props: any = {}

    topLevelFieldNodes.forEach(node => {
      const key = node.getAttribute('title')
      if (key === null || key === '') return
      props[key] = parsePropNode(node)
    })
    const returned: LM.CompProps<P> = props
    return returned

    function parsePropNode (node: HTMLElement): LM.CompProp {
      const unnamedDataChildren = [...node.querySelectorAll(':scope > data:not([title])')] as HTMLElement[]
      const namedDataChildren = [...node.querySelectorAll(':scope > data[title]:not([title=""])')] as HTMLElement[]
      
      // If named data children are found, the node represents an object
      if (namedDataChildren.length !== 0) {
        const namedProps: LM.CompProp = {}
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
      const nodeType = node.getAttribute('data-lmv-datatype')
      const rawNodeValue = node.innerHTML.trim()
      let nodeValue: string|number|boolean|null = rawNodeValue
      if (nodeType === 'number') nodeValue = parseFloat(rawNodeValue)
      else if (nodeType === 'boolean') {
        const normalizedRawValue = rawNodeValue.toLowerCase().trim()
        const trueishValues = ['oui', 'yes', 'vrai', 'true']
        nodeValue = trueishValues.includes(normalizedRawValue)
      }
      else if (nodeType === 'null') nodeValue = null      
      return nodeValue
    }
  }

  /* * * * * * * * * * * * * * * * * * * *
   *
   * COMPONENTS REGISTER
   * 
   * * * * * * * * * * * * * * * * * * * */
  const register: LM.CompRegisterData<any, any, any>[] = []
  function queryRegisterById <P, S, V>(id: LM.CompId) {
    const found = register.find(elt => elt.id === id) as LM.CompRegisterData<P, S, V>|undefined
    return found
  }

  function registerComponent <P, S, V>(componentData: LM.CompRegisterData<P, S, V>) {
    const foundInRegister: LM.CompRegisterData<P, S, V>|undefined = queryRegisterById<P, S, V>(componentData.id)
    if (foundInRegister !== undefined) {
      // What to do with already inited ?
      console.warn('Component with this id has already been initialized.')
    } else {
      register.push(componentData)
    }
  }

  /* * * * * * * * * * * * * * * * * * * *
   *
   * STATE & VALUES SETTERS
   * 
   * * * * * * * * * * * * * * * * * * * */
  async function setState <S>(id: LM.CompId, stateSetter: LM.CompStateSetter<S>) {
    const componentData = queryRegisterById<any, S, any>(id)
    if (componentData === undefined) return
    const prevState: LM.CompProps<S>|undefined = componentData.state
    if (typeof stateSetter === 'function') {
      const state = prevState !== undefined
        ? stateSetter({ ...prevState })
        : stateSetter(undefined)
      if (state === null) return
      componentData.state = state
      await render(id)
      return { prevState, state }
    } else {
      const state = prevState !== undefined
        ? { ...(prevState ?? {}), ...stateSetter }
        : { ...stateSetter }
      componentData.state = state as LM.CompProps<S>
      await render(id)
      return { prevState, state }
    }
  }

  function setValues <V>(id: LM.CompId, valuesSetter: LM.CompValuesSetter<V>) {
    const componentData = queryRegisterById<any, any, V>(id)
    if (componentData === undefined) return
    const prevValues: LM.CompProps<V>|undefined = componentData.values
    if (typeof valuesSetter === 'function') {
      const values = prevValues !== undefined
        ? valuesSetter({ ...prevValues })
        : valuesSetter(undefined)
      if (values === null) return
      componentData.values = values
      return { prevValues, values }
    } else {
      const values = prevValues !== undefined
        ? { ...(prevValues ?? {}), ...valuesSetter }
        : { ...valuesSetter }
      componentData.values = values as LM.CompProps<V>
      return { prevValues, values }
    }
  }

  /* * * * * * * * * * * * * * * * * * * *
   *
   * RENDERER
   * 
   * * * * * * * * * * * * * * * * * * * */

  function render <P, S, V>(id: LM.CompId) {
    return new Promise((resolve, reject) => {
      const node = document.querySelector(`.lmv-component[data-lmv-id="${id}"]`)
      if (node === null) return reject(`Could not find node with data-lmv-id === ${id}`)

      const componentData: LM.CompRegisterData<P, S, V> | undefined = queryRegisterById<P, S, V>(id)
      if (componentData === undefined) return reject(`Component node seems to have been initialized but cannot be found in components register.`)

      const {
        mainClass,
        classModifiers,
        innerDomString,
        afterRender,
        listeners
      } = componentData.renderer({
        props: componentData.props,
        state: componentData.state,
        values: componentData.values,
        setState: (stateSetter: LM.CompStateSetter<S>) => setState(id, stateSetter),
        setValues: (valuesSetter: LM.CompValuesSetter<V>) => setValues(id, valuesSetter),
        getNode: () => document.querySelector(`.lmv-component[data-lmv-id="${id}"]`)
      })

      const newWrapperClasses = [
        'lmv-component',
        mainClass,
        ...classModifiers.map(modifier => `${mainClass}_${modifier}`)
      ].join(' ')

      let classesAreSet = false
      let innerHTMLIsSet = (innerDomString === null)

      const observer = new MutationObserver((mutations, observer) => {
        const node = document.querySelector(`.lmv-component[data-lmv-id="${id}"]`)
        if (node === null) return reject(`Could not find node with data-lmv-id === ${id}`)
        for (const mut of mutations) {
          if (mut.type === 'attributes') { classesAreSet = true }
          else if (mut.type === 'childList') { innerHTMLIsSet = true }
        }
        if (classesAreSet && innerHTMLIsSet) {
          observer.disconnect()
          if (afterRender !== undefined && innerDomString !== null) afterRender({
            props: componentData.props,
            state: componentData.state,
            values: componentData.values,
            getProps: () => queryRegisterById<P, S, V>(id)?.props,
            getState: () => queryRegisterById<P, S, V>(id)?.state,
            getValues: () => queryRegisterById<P, S, V>(id)?.values,
            getNode: () => document.querySelector(`.lmv-component[data-lmv-id="${id}"]`)
          })
          if (innerDomString !== null) listeners.forEach(listener => {
            const { selector, eventType, handler } = listener
            const target = node.querySelector(selector)
            if (target === null) return
            target.addEventListener(eventType, handler)
          })
          resolve(id)
        }
      })
      observer.observe(node, {
        childList: true,
        attributes: true,
        attributeFilter: ['class']
      })

      if (innerDomString !== null) node.innerHTML = innerDomString
      node.setAttribute('class', newWrapperClasses)
    })
  }

  /* * * * * * * * * * * * * * * * * * * *
   *
   * PUBLIC: COMPONENT INIT
   * 
   * * * * * * * * * * * * * * * * * * * */

  async function init (node: HTMLElement, renderer: LM.CompRenderer<any, any, any>): Promise<string|undefined> {
    return new Promise((resolve, reject) => {
      const idAttribute = node.getAttribute('data-lmv-id') ?? ''
      const componentData = queryRegisterById(idAttribute)
      if (componentData !== undefined) return resolve(componentData.id)

      const props = readComponentProps(node)
      const id = generateComponentId()

      let attributeIsSet = false
      let innerHTMLIsSet = false
      const observer = new MutationObserver(async (mutations, observer) => {
        const node = document.querySelector(`.lmv-component[data-lmv-id="${id}"]`) as HTMLElement
        if (node === null) return reject(`Could not find node with data-lmv-id === ${id}`)
        for (const mut of mutations) {
          if (mut.type === 'attributes') { attributeIsSet = true }
          else if (mut.type === 'childList') { innerHTMLIsSet = true }
        }
        if (attributeIsSet && innerHTMLIsSet) {
          observer.disconnect()
          registerComponent({ id, node, props, renderer })
          await render(id)
          resolve(id)
        }
      })
      observer.observe(node, {
        childList: true,
        attributes: true,
        attributeFilter: ['data-lmv-id']
      })

      node.setAttribute('data-lmv-id', id)
      node.innerHTML = ''
    })
  }

  async function initAll (selector: string, renderer: LM.CompRenderer<any, any, any>): Promise<Array<string|undefined>> {
    const nodes = selectNodes(selector, { initialized: false })
    const results = []
    for (const node of nodes) {
      const result = await init(node, renderer)
      results.push(result)
    }
    return results
  }

  /* * * * * * * * * * * * * * * * * * * *
   *
   * PUBLIC: SELECT NODES
   * 
   * * * * * * * * * * * * * * * * * * * */
  function selectNodes (selector: string, options?: LM.CompSelectNodesOptions): HTMLElement[] {
    const allNodes = [...document.querySelectorAll(`.lmv-component${selector}`)] as HTMLElement[]
    if (options === undefined) return allNodes

    if (options.initialized === undefined) return allNodes

    if (options.initialized === false) return allNodes.filter(node => {
      const nodeId = node.getAttribute('data-lmv-id')
      if (nodeId === null || nodeId === '') return true
      const foundInRegister = register.find(compData => compData.id === nodeId)
      if (foundInRegister) return false
      return true
    })

    if (options.initialized === true) return allNodes.filter(node => {
      const nodeId = node.getAttribute('data-lmv-id')
      if (nodeId === null || nodeId === '') return false
      const foundInRegister = register.find(compData => compData.id === nodeId)
      if (foundInRegister) return true
      return false
    })

    return allNodes
  }
  
  /* * * * * * * * * * * * * * * * * * * *
   *
   * EXPORT
   * 
   * * * * * * * * * * * * * * * * * * * */
  lmWindow.LMV_COMPONENT = {
    init,
    initAll,
    selectNodes,

    // Deprecated
    getPropsNode: (...args) => {
      console.warn('LMV_COMPONENT.getPropsNode() is deprecated, use LMV_COMPONENT.init() instead.')
      return getComponentPropsNode(...args)
    },
    readProps: (...args) => {
      console.warn('LMV_COMPONENT.readProps() is deprecated, use LMV_COMPONENT.init() instead.')
      return readComponentProps(...args)
    },
    generateId: (...args) => {
      console.warn('LMV_COMPONENT.generateId() is deprecated, use LMV_COMPONENT.init() instead.')
      return generateComponentId(...args)
    }
  }
})();
