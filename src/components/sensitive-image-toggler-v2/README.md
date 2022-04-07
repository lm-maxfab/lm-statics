# Sensitive image toggler v2

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
<div class="lmv-component lmv-stvimgtglr2 lmv-stvimgtglr2_init">
  <div class="lmv-component__props" style="display: none;">
    <data title="image_url">https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png</data>
    <data title="image_width" data-type="number">800</data>
    <data title="image_height" data-type="number">1600</data>
    <data title="placeholder_text" data-type="string">Attention, images violentes.</data>
    <data title="image_legend" data-type="string">La légende de l'image</data>
    <data title="image_credits" data-type="string">© Crédits</data>
  </div>
</div>
```

## Exemple
[Voir un exemple ici]({{PARENT_URL}}/example.html)
