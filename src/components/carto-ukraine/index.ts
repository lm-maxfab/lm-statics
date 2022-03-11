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
    const dayObj = dayjs().year(year).month(month).subtract(1, 'month').date(date).hour(hour).minute(minute)
    const dateEnText = dayObj.format('[Le] D MMM YYYY [à] HH[h]mm')
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
      <p class="carto-ukraine-context-paragraph__title">${props.title}</p>
      <p class="carto-ukraine-context-paragraph__text">${props.text}${props.end_link_url !== undefined ? ` <a href="${props.end_link_url}">${props.end_link_text ?? props.end_link_url}</a>` : ''}</p>`
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
      link_text?: string
      link_url?: string
      link_date_yyyy_mm_dd_hh_mm?: string
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
          <a class="carto-ukraine-useful-links__actual-link" href="${linkData.link_url}">${linkData.link_text}</a>
          <p class="carto-ukraine-useful-links__date">${rawDateToReadable(linkData.link_date_yyyy_mm_dd_hh_mm)}</p>
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
  }

  function renderPostHead (node: HTMLElement) {
    const { LMV_COMPONENT } = (window as LM.Window)
    const props: PostHeadProps = LMV_COMPONENT?.readProps(node) ?? {}
    const propsNode = LMV_COMPONENT?.getPropsNode(node)
    node.innerHTML = `
      ${propsNode?.outerHTML}
      <p class="carto-ukraine-post-head__date">${rawDateToReadable(props.post_date_yyyy_mm_dd_hh_mm)}</p>
      <p class="carto-ukraine-post-head__title">${props.post_title}</p>`
  }

  const postHeadBlocks = [...document.querySelectorAll('.carto-ukraine-post-head')] as Array<HTMLElement>
  postHeadBlocks.forEach(node => {
    renderPostHead(node)
  })
  
})();
