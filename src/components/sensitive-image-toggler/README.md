# Sensitive image toggler

## Usage

In any article, add this script and the css via a snippet:

```html
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/le-monde/styles/reset.css">
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/styles/fonts.css">
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/styles/variables.css">
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/components/styles.css">
<link rel="stylesheet" type="text/css" href="{{PARENT_URL}}/styles.css" />
<script defer type="text/javascript" src="{{ROOT_URL}}/components/index.js"></script>
<script defer type="text/javascript" src="{{PARENT_URL}}/index.js"></script>
```

Then, create as many snippets as you want, containing the following dom structure. The contents in .lmv-image-sensitive-toggler__config must be a string of valid JSON in order to be understood by the js.

```html
<figure class="lmv-image-toggler article__media image-container node_image">
  <span
    class="lmv-image-toggler__config"
    style="opacity: 0; visibility: collapse; display: none;">{
    
    "image_url": "https://example.com/image.jpg",
    "placeholder_image_url": "",
    "placeholder_text": "Attention, images violentes.",
    "placeholder_button_text_show": "Afficher",
    "placeholder_button_text_hide": "Masquer",
    "image_legend": "La légende de l'image",
    "image_credits": "© Crédits"
  
  }</span>
  <span class="lmv-image-toggler__image-and-placeholder image">
    <img class="lmv-image-toggler__image" loading="lazy" src="" />
    <span class="lmv-image-toggler__placeholder"></span>
    <span class="lmv-image-toggler__placeholder-content">
      <p class="lmv-image-toggler__text"></p>
      <button class="lmv-image-toggler__show-button"></button>
    </span>
  </span>
  <button class="lmv-image-toggler__hide-button"></button>
</figure>
```

## Example
[See an example here]({{PARENT_URL}}/example.html)
