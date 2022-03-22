/// <reference path="../../types/main.d.ts" />

declare namespace LM {
  export interface Window {
    LM_CARTO_URKAINE_LOADED?: boolean
  }
}

;(() => {
  if ((window as LM.Window).LM_CARTO_URKAINE_LOADED === true) return
  (window as LM.Window).LM_CARTO_URKAINE_LOADED = true

  /* * * * * * * * * * * * * * * * * * * * *
   *
   * UTILS
   *
   * * * * * * * * * * * * * * * * * * * * */
  function rawDateToReadable (rawDate?: string) {
    const { dayjs } = (window as LM.Window)
    const [year, month, date, hour, minute] = rawDate?.split('-') ?? []
    const dayObj = dayjs().year(year ?? '2022').month(month ?? '1').subtract(1, 'month').date(date ?? '1').hour(hour ?? '12').minute(minute ?? '0')
    let dateEnText = ''
    if (year === undefined || month === undefined || date === undefined) dateEnText = ''
    else if (hour === undefined) dateEnText = dayObj.format('[Publié le] D MMM YYYY')
    else if (minute === undefined) dateEnText = dayObj.format('[Publié le] D MMM YYYY [à] HH')
    else dateEnText = dayObj.format('[Publié le] D MMM YYYY [à] HH[h]mm')
    const dateFrText = dateEnText
      .replace('Jan', 'janvier')
      .replace('Feb', 'février')
      .replace('Mar', 'mars')
      .replace('Apr', 'avril')
      .replace('May', 'mai')
      .replace('Jun', 'juin')
      .replace('Jul', 'juillet')
      .replace('Aug', 'août')
      .replace('Sep', 'septembre')
      .replace('Oct', 'octobre')
      .replace('Nov', 'novembre')
      .replace('Dec', 'décembre')
      .replace('Le 1 ', 'Le 1<sup>er</sup> ')
    return dateFrText
  }

  function normalizeString (string: string) {
    return string.toLowerCase()
      .replace(/[^a-z0-9]/igm, '-')
  }

  /* * * * * * * * * * * * * * * * * * * * *
   *
   * COVER
   *
   * * * * * * * * * * * * * * * * * * * * */
  interface CoverProps {
    text?: string
  }

  function renderCover (node: HTMLElement) {
    const { LMV_COMPONENT } = (window as LM.Window)
    const props: CoverProps = LMV_COMPONENT?.readProps(node) ?? {}
    const propsNode = LMV_COMPONENT?.getPropsNode(node)
    
    node.innerHTML = `
      ${propsNode?.outerHTML}
      <div class="carto-ukraine-cover__image"></div>
      <span class="carto-ukraine-cover__text">${props.text}</span>`

    const parent = node.parentElement
    if (parent?.tagName === 'DIV') {
      const currentStyle = parent.getAttribute('style')
      if (currentStyle === null) {
        parent.style.width = '100vw'
      }
    }
    
  }

  const coverBlocks = [...document.querySelectorAll('.carto-ukraine-cover')] as Array<HTMLElement>
  coverBlocks.forEach(node => {
    renderCover(node)
  })

  /* * * * * * * * * * * * * * * * * * * * *
   *
   * HEAD PARAGRAPHS
   *
   * * * * * * * * * * * * * * * * * * * * */
  interface HeadParagraphProps {
    title?: string
    text?: string
  }

  function renderHeadParagraph (node: HTMLElement) {
    const { LMV_COMPONENT } = (window as LM.Window)
    const props: HeadParagraphProps = LMV_COMPONENT?.readProps(node) ?? {}
    const propsNode = LMV_COMPONENT?.getPropsNode(node)
    node.innerHTML = `
      ${propsNode?.outerHTML}
      <p class="carto-ukraine-head-paragraph__title">${props.title}</p>
      <p class="carto-ukraine-head-paragraph__text">${props.text}</p>`
  }

  const headParagraphBlocks = [...document.querySelectorAll('.carto-ukraine-head-paragraph')] as Array<HTMLElement>
  headParagraphBlocks.forEach(node => {
    renderHeadParagraph(node)
  })

  /* * * * * * * * * * * * * * * * * * * * *
   *
   * CONTEXT PARAGRAPHS
   *
   * * * * * * * * * * * * * * * * * * * * */
  interface ContextParagraphProps {
    title?: string
    text?: string
    end_link_text?: string
    end_link_url?: string
  }

  function renderContextParagraph (node: HTMLElement) {
    const { LMV_COMPONENT } = (window as LM.Window)
    const props: ContextParagraphProps = LMV_COMPONENT?.readProps(node) ?? {}
    const propsNode = LMV_COMPONENT?.getPropsNode(node)
    node.innerHTML = `
      ${propsNode?.outerHTML}
      <span class="carto-ukraine-context-paragraph__title">${props.title ?? ''}</span>
      ${props.text !== undefined && props.text !== '' ? '<br />' : ''}
      <span class="carto-ukraine-context-paragraph__text">${props.text ?? ''}</span>
      <span class="carto-ukraine-context-paragraph__link"><a href="${props.end_link_url}">${props.end_link_text ?? props.end_link_url}</a></span>`
  }

  const contextParagraphBlocks = [...document.querySelectorAll('.carto-ukraine-context-paragraph')] as Array<HTMLElement>
  contextParagraphBlocks.forEach(node => {
    renderContextParagraph(node)
  })

  /* * * * * * * * * * * * * * * * * * * * *
   *
   * USEFUL LINKS
   *
   * * * * * * * * * * * * * * * * * * * * */
  interface UsefulLinksProps {
    title?: string
    links?: Array<{
      text?: string
      post_id?: string
      date_yyyy_mm_dd_hh_mm?: string
    }>
  }
  
  function renderUsefulLinks (node: HTMLElement) {
    const { LMV_COMPONENT } = (window as LM.Window)
    const props: UsefulLinksProps = LMV_COMPONENT?.readProps(node) ?? {}
    const propsNode = LMV_COMPONENT?.getPropsNode(node)
    node.innerHTML = `
      ${propsNode?.outerHTML}
      <h3 class="carto-ukraine-useful-links__title">${props.title}</h3>
      <ul class="carto-ukraine-useful-links__links">${props.links?.map(linkData => `
        <li class="carto-ukraine-useful-links__link">
          <a class="carto-ukraine-useful-links__actual-link" href="#${normalizeString(linkData.post_id ?? '')}">${linkData.text}</a>
          <p class="carto-ukraine-useful-links__date">${rawDateToReadable(linkData.date_yyyy_mm_dd_hh_mm)}</p>
        </li>`
      ).join('')}</ul>`
  }
  
  const usefulLinksBlocks = [...document.querySelectorAll('.carto-ukraine-useful-links')] as Array<HTMLElement>
  usefulLinksBlocks.forEach(node => {
    renderUsefulLinks(node)
  })

  /* * * * * * * * * * * * * * * * * * * * *
   *
   * POST HEADS
   *
   * * * * * * * * * * * * * * * * * * * * */
  interface PostHeadProps {
    post_date_yyyy_mm_dd_hh_mm?: string
    post_title?: string
    post_id?: string
  }

  function renderPostHead (node: HTMLElement) {
    const { LMV_COMPONENT } = (window as LM.Window)
    const props: PostHeadProps = LMV_COMPONENT?.readProps(node) ?? {}
    const propsNode = LMV_COMPONENT?.getPropsNode(node)
    node.innerHTML = `
      ${propsNode?.outerHTML}
      <p class="carto-ukraine-post-head__date">${rawDateToReadable(props.post_date_yyyy_mm_dd_hh_mm)}</p>
      <p class="carto-ukraine-post-head__title">${props.post_title}</p>
      <span class="carto-ukraine-post-head__anchor" id="${normalizeString(props.post_id ?? '')}"></span>`
  }

  const postHeadBlocks = [...document.querySelectorAll('.carto-ukraine-post-head')] as Array<HTMLElement>
  postHeadBlocks.forEach(node => {
    renderPostHead(node)
  })
  
})();
