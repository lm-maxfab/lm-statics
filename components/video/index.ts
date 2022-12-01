/// <reference path="../../types/main.d.ts" />

interface Props {
  source?: string
  title?: string
  kicker?: string
  legend?: string
  credits?: string
  loop?: boolean
  autoplay?: boolean
  sound?: boolean
  sound_controls?: boolean
  play_controls?: boolean
  time_controls?: boolean
  fullscreen_controls?: boolean
  sensitive_content?: boolean
  disclaimer_text?: string
  disclaimer_button?: string
}

interface State {
  is_playing: boolean
  is_muted: boolean
  is_disclosed: boolean
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

  const loudIconDom = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" class="bg" /><path fill-rule="evenodd" clip-rule="evenodd" class="fill-1" d="M10 8L14 5V19L10 16H7V8H10ZM18 12C18 13.4806 17.1956 14.7732 16 15.4649V8.53513C17.1956 9.22674 18 10.5194 18 12Z" /></svg>'
  const muteIconDom = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" class="bg" /><path fill-rule="evenodd" clip-rule="evenodd" class="fill-1" d="M14 5L10 8H7V16H10L14 19V5ZM15.88 10.5821L16.5871 9.875L18.0013 11.2892L19.4155 9.875L20.1226 10.5821L18.7084 11.9963L20.1226 13.4105L19.4155 14.1176L18.0013 12.7034L16.5871 14.1176L15.88 13.4105L17.2942 11.9963L15.88 10.5821Z" /></svg>'
  const pauseIconDom = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" class="bg" /><path fill-rule="evenodd" clip-rule="evenodd" class="fill-1" d="M11 6H8V18H11V6ZM16 6H13V18H16V6Z" /></svg>'
  const playIconDom = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" class="bg" /><path class="fill-1" d="M7 5L19 12L7 19V12V5Z" /></svg>'

  /* * * * * * * * * * * * * * * * * * *
   *
   * SELECT NODE AND RENDER
   *
   * * * * * * * * * * * * * * * * * * */
  LMV_COMPONENT.initAll(`.${c}`, renderer)

  function renderer (args: LM.CompRendererArgs<Props, State, Values>): LM.CompRendererReturnValue<Props, State, Values> {
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
    const isPlaying = videoNode !== null ? videoIsPlaying(videoNode) : false

    const statusIconDom = isPlaying ? pauseIconDom : playIconDom
    const soundIconDom = props.sound !== true ? muteIconDom : loudIconDom

    const innerDomString = values?.has_rendered === true ? null : `
      <div class="${c}__video-slot">
        <video class="${c}__video" ${videoAttributes.join(' ')}>
          <source src="${props.source}" />
        </video>
        <div class="${c}__text-overlay">
          <div class="${c}__title">${props.title}</div>
          <div class="${c}__kicker">${props.kicker}</div>
        </div>
        <div class="${c}__sound-button">${soundIconDom}</div>
        <div class="${c}__controls-bottom-bar">
          <div class="${c}__play-pause-button">${statusIconDom}</div>
          <div class="${c}__timeline">
            <div class="${c}__timeline-progress-bar"></div>
          </div>
          <!-- <div class="${c}__fullscreen-button">FS</div> -->
        </div>
        <div class="${c}__sensitive-content-overlay">
          <div class="${c}__disclaimer">${props.disclaimer_text}</div>
          <button class="${c}__discloser">${props.disclaimer_button}</button>
        </div>
      </div>
      <div class="${c}__info">
        <span class="${c}__legend">${props.legend}&nbsp;</span>
        <span class="${c}__credits">${props.credits}</span>
      </div>
    `

    /* * * * * * * * * * * * * * * * * * *
     *
     * AFTER RENDER
     *
     * * * * * * * * * * * * * * * * * * */
    const afterRender: LM.CompAfterRenderer<Props, State, Values> = ({
      getProps,
      getState,
      getNode
    }) => {
      const props = getProps()
      if (props?.autoplay !== true) return
      
      const node = getNode()
      const $video = node?.querySelector(`.${c}__video`) as HTMLVideoElement|null|undefined
      if ($video === undefined || $video === null) return
      
      const options = { threshold: .3 }
      const observer = new IntersectionObserver(entries => {
        const entry = entries[0]
        if (entry === undefined) return
        if (entry.isIntersecting) {
          const props = getProps()
          const state = getState()
          if (props?.sensitive_content) {
            if (state?.is_disclosed) (entry.target as HTMLVideoElement).play()
          } else (entry.target as HTMLVideoElement).play()
        } else (entry.target as HTMLVideoElement).pause()
      }, options)
      observer.observe($video)
    }

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
          if (playBtn !== null) playBtn.innerHTML = playIconDom
        } else {
          $video.play()
          const playBtn = node?.querySelector(`.${c}__play-pause-button`) ?? null
          if (playBtn !== null) playBtn.innerHTML = pauseIconDom
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
        if (isMuted) {
          $video.muted = false
          const muteBtn = node?.querySelector(`.${c}__sound-button`) ?? null
          if (muteBtn !== null) muteBtn.innerHTML = loudIconDom
        } else {
          $video.muted = true
          const muteBtn = node?.querySelector(`.${c}__sound-button`) ?? null
          if (muteBtn !== null) muteBtn.innerHTML = muteIconDom
        }
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

    const discloserClickListener: LM.CompRendererListenerDescriptor = {
      selector: `.${c}__discloser`,
      eventType: 'click',
      handler: () => {
        setState({ is_disclosed: true })
      }
    }

    const videoPlayingListener: LM.CompRendererListenerDescriptor = {
      selector: `.${c}__video`,
      eventType: 'playing',
      handler: () => {
        const node = getNode()
        const $playButton = (node?.querySelector(`.${c}__play-pause-button`) ?? null) as HTMLElement|null
        if ($playButton !== null) {
          $playButton.innerHTML = pauseIconDom
          if (node === null) return
          node.classList.add(`${c}_playing`)
        }
      }
    }

    const videoWaitingListener: LM.CompRendererListenerDescriptor = {
      selector: `.${c}__video`,
      eventType: 'waiting',
      handler: () => {
        const node = getNode()
        const $playButton = (node?.querySelector(`.${c}__play-pause-button`) ?? null) as HTMLElement|null
        if ($playButton !== null) $playButton.innerHTML = playIconDom
        if (node === null) return
        node.classList.remove(`${c}_playing`)
      }
    }

    const videoEndedListener: LM.CompRendererListenerDescriptor = {
      selector: `.${c}__video`,
      eventType: 'ended',
      handler: () => {
        const node = getNode()
        const $playButton = (node?.querySelector(`.${c}__play-pause-button`) ?? null) as HTMLElement|null
        if ($playButton !== null) $playButton.innerHTML = playIconDom
        if (node === null) return
        node.classList.remove(`${c}_playing`)
      }
    }

    const videoPausedListener: LM.CompRendererListenerDescriptor = {
      selector: `.${c}__video`,
      eventType: 'pause',
      handler: () => {
        const node = getNode()
        const $playButton = (node?.querySelector(`.${c}__play-pause-button`) ?? null) as HTMLElement|null
        if ($playButton !== null) $playButton.innerHTML = playIconDom
        if (node === null) return
        node.classList.remove(`${c}_playing`)
      }
    }

    const videoClickListener: LM.CompRendererListenerDescriptor = {
      selector: `.${c}__video`,
      eventType: 'click',
      handler: (e) => {
        const target = e.target as HTMLVideoElement|null
        if (target === null) return
        if (!target.classList.contains(`${c}__video`)) return
        if (videoIsPlaying(target)) target.pause()
        else target.play()
      }
    }

    const listeners = [
      playPauseClickListener,
      muteClickListener,
      timelineClickListener,
      discloserClickListener,
      videoTimeupdateListener,
      videoPlayingListener,
      videoWaitingListener,
      videoEndedListener,
      videoPausedListener,
      videoClickListener
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
    // if (props.fullscreen_controls) classModifiers.push('with-fullscreen-controls')
    if (props.sensitive_content) classModifiers.push('sensitive')
    if (state?.is_disclosed) classModifiers.push('disclosed')

    /* * * * * * * * * * * * * * * * * * *
     *
     * RETURN
     *
     * * * * * * * * * * * * * * * * * * */
    return {
      mainClass: c,
      innerDomString,
      listeners,
      classModifiers,
      afterRender
    }
  }

})();
