# OSD Tiles Viewer

## Usage

```html
<!-- Application -->
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/styles/reset.css">
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/styles/fonts.css">
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/styles/variables.css">
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/components/styles.css">
<link rel="stylesheet" type="text/css" href="{{PARENT_URL}}/styles.css">
<script defer type="text/javascript" src="{{ROOT_URL}}/lib/openseadragon/v3.0.0/openseadragon.min.js"></script>
<script defer type="text/javascript" src="{{ROOT_URL}}/components/index.js"></script>
<script defer type="text/javascript" src="{{PARENT_URL}}/index.js"></script>

<!-- Component -->
<div class="lmv-component osd-tiles-viewer">
  <div class="lmv-component__props" style="display: none;">
    <data title="prefix_url">OSD assets root URL</data>
    <data title="type">Tiles type, default: zoomifytileservice</data>
    <data title="total_width">Total width in px</data>
    <data title="total_height">Total height in px</data>
    <data title="tiles_url">Tiles root URL</data>
    <data title="tile_size">Tile size</data>
    <data title="file_format">Tile file format, default: jpg</data>
  </div>
</div>
```

## Exemple
[Voir un exemple ici]({{PARENT_URL}}/example.html)
