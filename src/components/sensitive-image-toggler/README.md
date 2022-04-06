# Sensitive image toggler

## Usage

```html
<!-- Application -->
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/styles/reset.css">
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/styles/fonts.css">
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/styles/variables.css">
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/components/styles.css">
<link rel="stylesheet" type="text/css" href="{{PARENT_URL}}/styles.css" />
<script defer type="text/javascript" src="{{ROOT_URL}}/components/index.js"></script>
<script defer type="text/javascript" src="{{PARENT_URL}}/index.js"></script>

<!-- Component -->
<figure class="lmv-component lmv-sensitive-image-toggler article__media image-container node_image">
  <span
    class="lmv-sensitive-image-toggler__config"
    style="opacity: 0; visibility: collapse; display: none;">{
    
    "image_url": "https://example.com/image.jpg",
    "placeholder_image_url": "",
    "placeholder_text": "Attention, images violentes.",
    "placeholder_button_text_show": "Afficher",
    "placeholder_button_text_hide": "Masquer",
    "image_legend": "La légende de l'image",
    "image_credits": "© Crédits"
  
  }</span>
  <span class="lmv-sensitive-image-toggler__image-and-placeholder image">
    <img class="lmv-sensitive-image-toggler__image" loading="lazy" src="" />
    <span class="lmv-sensitive-image-toggler__placeholder"></span>
    <span class="lmv-sensitive-image-toggler__placeholder-content">
      <p class="lmv-sensitive-image-toggler__text"></p>
      <button class="lmv-sensitive-image-toggler__show-button"></button>
    </span>
  </span>
  <button class="lmv-sensitive-image-toggler__hide-button"></button>
</figure>
```

## Exemple
[Voir un exemple ici]({{PARENT_URL}}/example.html)
