/// <reference path="../../types/main.d.ts" />

;(() => {

  const { LMV_COMPONENT } = (window as LM.Window)
  if (LMV_COMPONENT === undefined) {
    console.warn('This components relies on a missing script: {{ROOT_URL}}/components/index.js')
    return
  }

  /* * * * * * * * * * * * * * * * * * * *
   *
   * COMPONENT DEFINITION
   * 
   * * * * * * * * * * * * * * * * * * * */
  interface Props {
    image_url?: string
    image_width?: number
    image_height?: number
    placeholder_text?: string
    image_legend?: string
    image_credits?: string
  }

  const className = 'lmv-stvimgtglr2'
  const c = className

  const getNodes = (): HTMLElement[] => {
    const nodes = document.querySelectorAll(`.${c}`) as NodeListOf<HTMLElement>
    return [...nodes]
  }
  
  const getNodesToInit = (): HTMLElement[] => {
    return getNodes().filter(node => !isNodeInited(node))
  }

  const getInitedNodes = () => {
    return getNodes().filter(node => isNodeInited(node))
  }
  
  const isNodeInited = (node: HTMLElement): boolean => {
    const isInited = !node.classList.contains(`${c}_init`)
    return isInited
  }

  const generateInnerDomString = (props?: Props) => {
    const width = props?.image_width ?? 0
    const height = props?.image_height ?? 0
    const rawRatio = height / width
    let strRatio: string = ''
    if (
      rawRatio <= .2
      || rawRatio >= 10
      || Number.isNaN(rawRatio)
      || !Number.isFinite(rawRatio)
    ) strRatio = 'unset'
    else strRatio = `${rawRatio * 100}%`

    const imageStateClass = strRatio === 'unset'
      ? `${c}__image_relative`
      : `${c}__image_absolute`

    return `
      <div class="${c}__image-slot" style="padding-bottom: ${strRatio};">
        <img src=${props?.image_url} loading="lazy" class="${c}__image ${imageStateClass}" />
        <button class="${c}__hide-button">Masquer</button>
        <div class="${c}__hider">
          <div class="${c}__placeholder-text">${props?.placeholder_text}</div>
          <button class="${c}__show-button">Afficher</button>
        </div>
      </div>
      <div class="${c}__text-slot">
        <span class=${c}__legend>${props?.image_legend}&nbsp;</span>
        <span class=${c}__credits>${props?.image_credits}</span>
      </div>`
  }

  const attachListeners = (node: HTMLElement) => {
    const $hideButton = node.querySelector(`.${c}__hide-button`)
    const $showButton = node.querySelector(`.${c}__show-button`)

    const handleHideButtonClick = (e: Event) => {
      const target = e.target as HTMLElement|null
      const rootNode = (target?.parentNode?.parentNode ?? undefined) as HTMLElement|undefined
      if (rootNode === undefined) return
      rootNode.classList.remove(`${c}_disclosed`)
    }

    const handleShowButtonClick = (e: Event) => {
      const target = e.target as HTMLElement|null
      const rootNode = (target?.parentNode?.parentNode?.parentNode ?? undefined) as HTMLElement|undefined
      if (rootNode === undefined) return
      rootNode.classList.add(`${c}_disclosed`)
    }

    $hideButton?.addEventListener('click', handleHideButtonClick)
    $showButton?.addEventListener('click', handleShowButtonClick)

    return [
      { node: $hideButton, eventType: 'click', handler: handleHideButtonClick },
      { node: $showButton, eventType: 'click', handler: handleShowButtonClick }
    ]
  }

  const render = async (node: HTMLElement) => {
    const props = LMV_COMPONENT.readProps(node)
    const innerHTML = generateInnerDomString(props)
    const propsNode = LMV_COMPONENT.getPropsNode(node)
    node.innerHTML = `
      ${propsNode?.outerHTML}
      ${innerHTML}`

    await new Promise((resolve) => {
      window.setTimeout(() => {
        attachListeners(node)
        resolve(node)
      }, 100)
    })

    return node
  }
  
  /* * * * * * * * * * * * * * * * * * * *
   *
   * COMPONENTS INITIALIZATION
   * 
   * * * * * * * * * * * * * * * * * * * */

  getNodesToInit().forEach(render)

})();
