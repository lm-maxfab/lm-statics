/// <reference path="../../types/main.d.ts" />

/*

PROPS
- autoplay: 'load'|'screen'|'false'
- muted: true|false
- sou
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
  source?: string //
  title?: string //
  kicker?: string //
  legend?: string //
  credits?: string //

  loop?: boolean //

  autoplay?: boolean 
  autoplay_trigger?: 'loaded'|'visible'

  sound?: boolean //
  sound_controls?: boolean //

  play_controls?: boolean

  time_controls?: boolean
  fullscreen_controls?: boolean
  sensitive_content?: boolean
}

interface State {
  is_playing: boolean
  is_muted: boolean
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

  function getVideoNode (getNode: () => HTMLElement|null): HTMLVideoElement|null {
    const node = getNode()
    const video = node?.querySelector(`.${c}__video`) as HTMLVideoElement|null|undefined
    return video ?? null
  }

  function videoIsPlaying (videoNode: HTMLVideoElement) {
    return videoNode.currentTime > 0
      && !videoNode.paused
      && !videoNode.ended
      && videoNode.readyState > 2
  }

  const c = 'lmv-video'

  /* * * * * * * * * * * * * * * * * * *
   *
   * SELECT NODE AND RENDER
   *
   * * * * * * * * * * * * * * * * * * */
  LMV_COMPONENT.initAll(`.${c}`, renderer)


  function renderer (args: LM.CompRendererArgs<Props, State, Values>): LM.CompRendererReturnValue {
    const { props: _props, state, setState, values, setValues, getNode } = args
    const props = _props ?? {}

    /* * * * * * * * * * * * * * * * * * *
     *
     * PREVENT RE-RENDER
     *
     * * * * * * * * * * * * * * * * * * */
    setValues({ has_rendered: true })

    /* * * * * * * * * * * * * * * * * * *
     *
     * DOM STRING
     *
     * * * * * * * * * * * * * * * * * * */
    const videoAttributes = []
    if (props.loop) videoAttributes.push('loop')
    if (props.sound !== true) videoAttributes.push('muted')

    const videoNode = getVideoNode(getNode)
    const isPlaying = videoNode !== null
      ? videoIsPlaying(videoNode)
      : false

    const innerDomString = values?.has_rendered === true ? null : `
      <div class="${c}__video-slot">
        <video class="${c}__video" ${videoAttributes.join(' ')}>
          <source src="${props.source}" />
        </video>
        <div class="${c}__sound-button">Mute</div>
        <div class="${c}__controls-bottom-bar">
          <div class="${c}__play-pause-button">${isPlaying ? '||': '|>'}</div>
          <div class="${c}__timeline">
            <div class="${c}__timeline-progress-bar"></div>
          </div>
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

    /* * * * * * * * * * * * * * * * * * *
     *
     * LISTENERS
     *
     * * * * * * * * * * * * * * * * * * */
    const playPauseClickListener: LM.CompRendererListenerDescriptor = {
      selector: `.${c}__play-pause-button`,
      eventType: 'click',
      handler: () => {
        const node = getNode()
        const $video = node?.querySelector(`.${c}__video`) as HTMLVideoElement|null|undefined
        if ($video === undefined || $video === null) return
        const isPlaying = videoIsPlaying($video)
        setState({ is_playing: !isPlaying })
        if (isPlaying) {
          $video.pause()
          const playBtn = node?.querySelector(`.${c}__play-pause-button`) ?? null
          if (playBtn !== null) playBtn.innerHTML = '|>'
        } else {
          $video.play()
          const playBtn = node?.querySelector(`.${c}__play-pause-button`) ?? null
          if (playBtn !== null) playBtn.innerHTML = '||'
        }
      }
    }

    const muteClickListener: LM.CompRendererListenerDescriptor = {
      selector: `.${c}__sound-button`,
      eventType: 'click',
      handler: () => {
        const node = getNode()
        const $video = node?.querySelector(`.${c}__video`) as HTMLVideoElement|null|undefined
        if ($video === undefined || $video === null) return
        const isMuted = $video.muted
        setState({ is_muted: !isMuted })
        if (isMuted) $video.muted = false
        else $video.muted = true
      }
    }

    const videoTimeupdateListener: LM.CompRendererListenerDescriptor = {
      selector: `.${c}__video`,
      eventType: 'timeupdate',
      handler: () => {
        const node = getNode()
        const $video = (node?.querySelector(`.${c}__video`) ?? null) as HTMLVideoElement|null
        const $progressBar = (node?.querySelector(`.${c}__timeline-progress-bar`) ?? null) as HTMLElement|null
        if ($video === null || $progressBar === null) return
        const percentProgress = 100 * $video.currentTime / $video.duration
        $progressBar.style.width = `${percentProgress}%`
      }
    }

    const videoEndedListener: LM.CompRendererListenerDescriptor = {
      selector: `.${c}__video`,
      eventType: 'ended',
      handler: () => {
        const node = getNode()
        const $playButton = (node?.querySelector(`.${c}__play-pause-button`) ?? null) as HTMLElement|null
        if ($playButton !== null) $playButton.innerHTML = '|>'
      }
    }

    const timelineClickListener: LM.CompRendererListenerDescriptor = {
      selector: `.${c}__timeline`,
      eventType: 'click',
      handler: (e: Event) => {
        const node = getNode()
        const $video = (node?.querySelector(`.${c}__video`) ?? null) as HTMLVideoElement|null
        const $timeline = (node?.querySelector(`.${c}__timeline`) ?? null) as HTMLElement|null
        if ($timeline === null || $video === null) return
        const asMouseEvent = e as MouseEvent
        const clickXPos = asMouseEvent.offsetX
        const timelineWidth = $timeline.clientWidth
        const targetRatio = clickXPos / timelineWidth
        const videoDuration = $video.duration
        const targetTimestamp = targetRatio * videoDuration
        $video.currentTime = targetTimestamp
      }
    }

    const listeners = [
      playPauseClickListener,
      muteClickListener,
      videoTimeupdateListener,
      videoEndedListener,
      timelineClickListener
    ]

    /* * * * * * * * * * * * * * * * * * *
     *
     * CLASS MODIFIERS
     *
     * * * * * * * * * * * * * * * * * * */
    const classModifiers = []
    if (state?.is_playing) classModifiers.push('playing')
    if (state?.is_muted) classModifiers.push('muted')
    if (props.sound_controls) classModifiers.push('with-sound-controls')
    if (props.play_controls) classModifiers.push('with-play-controls')
    if (props.time_controls) classModifiers.push('with-timeline')
    if (props.fullscreen_controls) classModifiers.push('with-fullscreen-controls')

    /* * * * * * * * * * * * * * * * * * *
     *
     * RETURN
     *
     * * * * * * * * * * * * * * * * * * */
    return {
      mainClass: c,
      innerDomString,
      listeners,
      classModifiers
    }
  }

})();
