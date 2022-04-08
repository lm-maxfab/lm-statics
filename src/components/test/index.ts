/// <reference path="../../types/main.d.ts" />

;(() => {
  const { LMV_COMPONENT } = (window as LM.Window)
  if (LMV_COMPONENT === undefined) {
    console.warn('This components relies on a missing script: {{ROOT_URL}}/components/index.js')
    return
  }

  // mainClass
  // classModifiers
  // innerDomString
  // listeners
  //   selector
  //   eventType
  //   handler

  // const renderer: LM.ComponentRenderer = {
  //   mainClass: 'lmv-lol',
  //   classModifiers: 
  // }

  const renderer: LM.ComponentRenderer = (args) => {
    const { id, state } = args

    const innerDomString = state !== undefined
      ? `<strong class="lmv-lol-comp__clicker">${state.count}</strong>`
      : `<strong class="lmv-lol-comp__clicker">State is unknown.</strong>`

    const classModifiers = []
    if ((state?.count ?? 0) > 10) classModifiers.push('many-clicks')

    return {
      mainClass: 'lmv-lol-comp',
      classModifiers,
      innerDomString,
      listeners: [{
        selector: '.lmv-lol-comp__clicker',
        eventType: 'click',
        handler: () => {
          console.log('clicked')
          LMV_COMPONENT.setState(id, curr => ({
            ...curr,
            count: ((curr?.count as number) ?? 0) + 1
          }))
        }
      }]
    }
  }

  const nodes = [...document.querySelectorAll('.lmv-component.lmv-test')] as HTMLElement[]

  nodes.forEach(node => {
    LMV_COMPONENT.init(node, renderer)
  })
})();
