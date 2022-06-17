# Video

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
<div class="lmv-component lmv-video">
  <div class="lmv-component__props" style="display: none;">
    <data title="source">URL de la vidéo</data>
    <data title="poster_url">URL de l'image de preview</data>
    <data title="title">Un titre</data>
    <data title="kicker">Un sous-titre</data>
    <data title="legend">Une légende</data>
    <data title="credits">Un crédit</data>

    <data title="loop" data-lmv-datatype="boolean">oui/non</data>
    <data title="autoplay" data-lmv-datatype="boolean">oui/non</data>
    <data title="sound" data-lmv-datatype="boolean">oui/non</data>
    
    <data title="sound_controls" data-lmv-datatype="boolean">oui/non</data>
    <data title="play_controls" data-lmv-datatype="boolean">oui/non</data>
    <data title="time_controls" data-lmv-datatype="boolean">oui/non</data>
    
    <data title="sensitive_content" data-lmv-datatype="boolean">oui/non</data>
    <data title="disclaimer_text">Attention images violentes</data>
    <data title="disclaimer_button">Voir la vidéo</data>
  </div>
</div>
```

## Exemple
[Voir un exemple ici]({{PARENT_URL}}/example.html)
