!(() => {
  initAllNodesToInit()

  function initAllNodesToInit () {
    const nodesToInit = getInitNodes()
    nodesToInit.forEach(node => {
      const config = getNodeConfig(node)
      initNode(node, config)
    })
  }

  window.addEventListener('resize', setAllNodesTargetDimensions)
  window.setInterval(() => {
    initAllNodesToInit()
    setAllNodesTargetDimensions()
  }, 1000)

  function getNodes () {
    const nodes = document.querySelectorAll('.lmv-infog-spreader')
    return nodes
  }

  function getInitNodes () {
    const nodes = document.querySelectorAll('.lmv-infog-spreader.lmv-infog-spreader_init')
    return nodes
  }

  function getNodeConfig (node) {
    const config = {}
    const nodeDataChildren = node.querySelectorAll('data[title]:not([title=""])')
    nodeDataChildren.forEach(dataNode => {
      const key = dataNode.getAttribute('title')
      config[key] = dataNode.innerText
    })
    return config
  }

  function initNode (node, config) {
    node.classList.remove('lmv-infog-spreader_init')
    node.classList.add('lmv-component')
    node.innerHTML += `
    <div class="lmv-infog-spreader__head">
      <div class="lmv-infog-spreader__title">${config.block_title}</div>
      <button class="lmv-infog-spreader__arrow-button"></button>
    </div>
    <div class="lmv-infog-spreader__content">
      <img src="${config.image_collapsed_url}" class="lmv-infog-spreader__image-collapsed" />
      <img src="${config.image_expanded_url}" class="lmv-infog-spreader__image-expanded" />
      <button class="lmv-infog-spreader__expand-button">
        <div class="lmv-infog-spreader__expand-icon"></div>
        <div class="lmv-infog-spreader__expand-text">${config.button_text}</div>
      </button>
    </div>`
  
    const expandedImage = node.querySelector('.lmv-infog-spreader__image-expanded')  
    if (expandedImage.complete) setNodeTargetDimensions(node)
    else expandedImage.addEventListener('load', () => setNodeTargetDimensions(node))
    setNodeEventListeners(node)

    return node
  }

  function setNodeEventListeners (node) {
    const headBarNode = node.querySelector('.lmv-infog-spreader__head')
    const contentBlockNode = node.querySelector('.lmv-infog-spreader__content')
    headBarNode.addEventListener('click', headBarClickHandler(node))
    contentBlockNode.addEventListener('click', contentBlockClickHandler(node))
  }

  function headBarClickHandler (node) {
    return () => toggleNodeOpenedState(node)
  }

  function contentBlockClickHandler (node) {
    return () => toggleNodeOpenedState(node)
  }

  function toggleNodeOpenedState (node) {
    setNodeTargetDimensions(node)
    const nodeClasses = [...node.classList]
    const isOpened = nodeClasses.includes('lmv-infog-spreader_opened')
    if (isOpened) node.classList.remove('lmv-infog-spreader_opened')
    else node.classList.add('lmv-infog-spreader_opened')
  }

  function setNodeTargetDimensions (node) {
    const imagesDimensions = getImagesDimensions(node)
    const expandedHeight = imagesDimensions.expanded.height
    const config = getNodeConfig(node)
    const collapsedHeightPercent = config.collapsed_height_percent !== undefined
      ? parseFloat(config.collapsed_height_percent)
      : 50
    node.style.setProperty('--expanded-height', `${expandedHeight}px`)
    node.style.setProperty('--collapsed-height', `${expandedHeight * collapsedHeightPercent / 100}px`)
  }

  function setAllNodesTargetDimensions () {
    const allNodes = getNodes()
    allNodes.forEach(node => setNodeTargetDimensions(node))
  }

  function getImagesDimensions (node) {
    const collapsedImage = node.querySelector('.lmv-infog-spreader__image-collapsed')
    const expandedImage = node.querySelector('.lmv-infog-spreader__image-expanded')
    const collapsedBox = collapsedImage.getBoundingClientRect()
    const expandedBox = expandedImage.getBoundingClientRect()
    const returned = {
      collapsed: {
        width: collapsedBox.width,
        height: collapsedBox.height
      },
      expanded: {
        width: expandedBox.width,
        height: expandedBox.height
      }
    }
    return returned
  }

})();
