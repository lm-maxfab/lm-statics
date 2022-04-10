/// <reference path="../../types/main.d.ts" />

/*
PROPS

- source
- autoplay: 'load'|'screen'|'false'
- muted: true|false
- soundControls
- timeline
- sensitive_content
- title
- kicker
- legend
- credits

*/

;(() => {
  const { LMV_COMPONENT } = (window as LM.Window)
  if (LMV_COMPONENT === undefined) {
    console.warn('This components relies on a missing script: {{ROOT_URL}}/components/index.js')
    return
  }

  function renderer (args: LM.ComponentRendererArgs): LM.ComponentRendererReturnValue {
    const { props, state, setState } = args
    
    const innerDomString = `
    <video>
      <source />
    </video>
    <p>LOL</p>`

    const clickListener: LM.ComponentRendererListenerDescriptor = {
      selector: 'p',
      eventType: 'click',
      handler: (e) => {
        console.log('C\'est moi, je suis un monsieur.')
      }
    }

    return {
      mainClass: 'lmv-video',
      innerDomString,
      listeners: [
        clickListener
      ],
      classModifiers: []
    }
  }

  LMV_COMPONENT.initAll('lmv-video', renderer)

})();
