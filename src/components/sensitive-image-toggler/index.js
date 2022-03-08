!(() => {
  const $togglers = document.querySelectorAll('.lmv-sensitive-image-toggler')
  $togglers.forEach($toggler => {
    try {
      const $config = $toggler.querySelector('.lmv-sensitive-image-toggler__config')
      const config = JSON.parse($config.innerText)
      const $image = $toggler.querySelector('.lmv-sensitive-image-toggler__image')
      const $text = $toggler.querySelector('.lmv-sensitive-image-toggler__text')
      const $showButton = $toggler.querySelector('.lmv-sensitive-image-toggler__show-button')
      const $hideButton = $toggler.querySelector('.lmv-sensitive-image-toggler__hide-button')
      
      const $figcaption = document.createElement('figcaption')
      $figcaption.classList.add('article__legend')
      $figcaption.classList.add('caption')
      $figcaption.setAttribute('aria-hidden', 'true')
      $figcaption.innerHTML = `${config.image_legend} <span class="article__credit" aria-hidden="true">${config.image_credits}</span>`
      $hideButton.after($figcaption)
      $image.setAttribute('src', config.image_url)
      $text.innerHTML = config.placeholder_text

      const toggleFunction = e => {
        const isDisclosed = $toggler.classList.contains('lmv-sensitive-image-toggler_disclosed')
        if (!isDisclosed) $toggler.classList.add('lmv-sensitive-image-toggler_disclosed')
        else $toggler.classList.remove('lmv-sensitive-image-toggler_disclosed')
      }

      $showButton.innerHTML = config.placeholder_button_text_show
      $hideButton.innerHTML = config.placeholder_button_text_hide
      $showButton.addEventListener('click', toggleFunction)
      $hideButton.addEventListener('click', toggleFunction)

    } catch (err) {
      console.warn(err)
    }
  })
})();
