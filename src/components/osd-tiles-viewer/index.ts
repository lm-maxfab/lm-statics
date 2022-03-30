/// <reference path="../../types/main.d.ts" />

interface ViewerProps {
  prefix_url?: string
  type?: string
  total_width?: string
  total_height?: string
  tiles_url?: string
  tile_size?: string
  file_format?: string
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
      <div id="${nodeFakeUuid}" class="osd-tiles-viewer__viewer"></div>`

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
    }, 100)
  }

  const viewerNodes = [...document.querySelectorAll('.lmv-component.osd-tiles-viewer')] as Array<HTMLElement>
  viewerNodes.forEach(node => render(node))

})();
