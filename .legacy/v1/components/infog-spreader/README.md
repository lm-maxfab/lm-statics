# Infog spreader

## Usage

In any article, add these css and js:

```html
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/styles/reset.css">
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/styles/fonts.css">
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/styles/variables.css">
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/components/styles.css">
<link rel="stylesheet" type="text/css" href="{{PARENT_URL}}/styles.css">
<style>.lmv-infog-spreader data { display: none; }</style>
<script defer type="text/javascript" src="{{ROOT_URL}}/components/index.js"></script>
<script defer type="text/javascript" src="{{PARENT_URL}}/index.js"></script>
```

Then create as many snippets as you want, containing this DOM structure

```html
<div class="lmv-component lmv-infog-spreader lmv-infog-spreader_init">
  <data title="image_collapsed_url">URL de l'image d'appel</data>
  <data title="image_expanded_url">URL de l'image complète</data>
  <data title="collapsed_height_percent">Pourcentage de la hauteur totale quand la boite est fermée</data>
  <data title="block_title">Titre apparaissant en haut du bloc</data>
  <data title="button_text">Texte du bouton d'ouverture</data>
</div>
```

## Example
[See an example here]({{PARENT_URL}}/example.html)
