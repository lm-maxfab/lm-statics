/// <reference path="../../types/main.d.ts" />

/*

PROPS
- autoplay: 'load'|'screen'|'false'
- muted: true|false
- soundControls
- timeline


- sensitive_content


- source
- title
- kicker
- legend
- credits

*/

interface Props {
  source?: string
  title?: string
  kicker?: string
  legend?: string
  credits?: string

  autoplay?: boolean
  autoplay_trigger?: 'loaded'|'visible'
  sound?: boolean
  sound_controls?: boolean
  time_controls?: boolean
  fullscreen_controls?: boolean
  sensitive_content?: boolean
}

interface State {
  is_playing: boolean
}

interface Values {
  has_rendered: boolean
}

;(() => {
  const { LMV_COMPONENT } = (window as LM.Window)
  if (LMV_COMPONENT === undefined) {
    console.warn('This components relies on a missing script: {{ROOT_URL}}/components/index.js')
    return
  }

  const c = 'lmv-video'

  function renderer (args: LM.CompRendererArgs<Props, State, Values>): LM.CompRendererReturnValue {
    const { props: _props, state, setState, values, setValues, getNode } = args
    const props = _props ?? {}

    const innerDomString = values?.has_rendered === true ? null : `
      <div class="${c}__video-slot">
        <video class="${c}__video">
          <source src="${props.source}" />
        </video>
        <div class="${c}__sound-button">Mute</div>
        <div class="${c}__controls-bottom-bar">
          <div class="${c}__play-pause-button">Play</div>
          <div class="${c}__timeline">Timeline</div>
          <div class="${c}__fullscreen-button">FS</div>
        </div>
        <div class="${c}__text-overlay">
          <div class="${c}__title">${props.title}</div>
          <div class="${c}__kicker">${props.kicker}</div>
        </div>
      </div>
      <div class="${c}__info">
        <span class="${c}__legend">${props.legend}&nbsp;</span>
        <span class="${c}__credits">${props.credits}</span>
      </div>
    `

    setValues({ has_rendered: true })

    const playPauseClickListener: LM.CompRendererListenerDescriptor = {
      selector: `.${c}__play-pause-button`,
      eventType: 'click',
      handler: e => {
        const node = getNode()
        if (node === null) return
        const $video = node.querySelector(`.${c}__video`)
        console.log($video)
      }
    }

    const classModifiers = []
    if (state?.is_playing) classModifiers.push('playing')

    return {
      mainClass: c,
      innerDomString,
      listeners: [
        playPauseClickListener
      ],
      classModifiers
    }
  }

  LMV_COMPONENT.initAll(`.${c}`, renderer)

})();
