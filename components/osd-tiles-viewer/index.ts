/// <reference path="../../types/main.d.ts" />

interface ViewerProps {
  prefix_url?: string
  type?: string
  total_width?: string
  total_height?: string
  tiles_url?: string
  tile_size?: string
  file_format?: string
  open_info_button_text?: string
  close_info_button_text?: string
  info_text?: string
}

;(() => {
  function genUuidChunk () {
    return Math.random().toString(36).slice(2, 8)
  }
  
  function genUuid () {
    return new Array(4)
      .fill(null)
      .map(genUuidChunk)
      .join('-')
  }

  function render (node: HTMLElement) {
    const { LMV_COMPONENT, OpenSeadragon } = (window as LM.Window)
    const props: ViewerProps = LMV_COMPONENT?.readProps(node) ?? {}
    const propsNode = LMV_COMPONENT?.getPropsNode(node)
    
    const nodeFakeUuid = genUuid()

    node.innerHTML = `
      ${propsNode?.outerHTML}
      <div id="${nodeFakeUuid}" class="osd-tiles-viewer__viewer"></div>
      <button class="osd-tiles-viewer__open-info-button">${props.open_info_button_text}</button>
      <div class="osd-tiles-viewer__info-panel">
        <div class="osd-tiles-viewer__info-panel-inner">
          <button class="osd-tiles-viewer__close-info-button">${props.close_info_button_text}</button>
          <div class="osd-tiles-viewer__info-panel-inner-content">${props.info_text}</div>
        </div>
      </div>`

    window.setTimeout(() => {
      OpenSeadragon({
        id: nodeFakeUuid,
        prefixUrl: props.prefix_url,
        tileSources: [{
          type:       props.type ?? 'zoomifytileservice',
          width:      parseInt(props.total_width ?? '0'),
          height:     parseInt(props.total_height ?? '0'),
          tilesUrl:   props.tiles_url,
          tileSize:   parseInt(props.tile_size ?? '0'),
          fileFormat: props.file_format ?? 'jpg'
        }]
      })
    }, 50)
  }

  function attachListeners (node: HTMLElement) {
    const $openInfoButton = node.querySelector('.osd-tiles-viewer__open-info-button') as HTMLElement
    const $closeInfoButton = node.querySelector('.osd-tiles-viewer__close-info-button') as HTMLElement
    const $infoPanelBackground = node.querySelector('.osd-tiles-viewer__info-panel') as HTMLElement
    $openInfoButton.addEventListener('click', () => node.classList.toggle('osd-tiles-viewer_show-info'))
    $closeInfoButton.addEventListener('click', () => node.classList.toggle('osd-tiles-viewer_show-info'))
    $infoPanelBackground.addEventListener('click', event => {
      const isPanel = (event.target as HTMLElement).classList.contains('osd-tiles-viewer__info-panel')
      if (isPanel) node.classList.toggle('osd-tiles-viewer_show-info')
    })
  }

  const viewerNodes = [...document.querySelectorAll('.lmv-component.osd-tiles-viewer')] as Array<HTMLElement>
  viewerNodes.forEach(node => render(node))
  window.setTimeout(() => {
    const viewerNodes = [...document.querySelectorAll('.lmv-component.osd-tiles-viewer')] as Array<HTMLElement>
    viewerNodes.forEach(node => attachListeners(node))
  }, 200)
  

})();
