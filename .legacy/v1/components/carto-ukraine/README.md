# Carto Urkaine

## Usage

```html
<!-- Application -->
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/styles/reset.css">
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/styles/fonts.css">
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/styles/variables.css">
<link rel="stylesheet" type="text/css" href="{{ROOT_URL}}/components/styles.css">
<link rel="stylesheet" type="text/css" href="{{PARENT_URL}}/styles.css">
<script defer type="text/javascript" src="{{ROOT_URL}}/components/index.js"></script>
<script defer type="text/javascript" src="{{ROOT_URL}}/lib/dayjs/v1.8.21/dayjs.1.8.21.min.js"></script>
<script defer type="text/javascript" src="{{ROOT_URL}}/lib/index.js"></script>
<script defer type="text/javascript" src="{{PARENT_URL}}/index.js"></script>

<!-- Cover -->
<div class="lmv-component carto-ukraine-cover">
  <div class="lmv-component__props" style="display: none;">
    <data title="text">Guerre en Ukraine</data>
  </div>
</div>

<!-- Paragraphe de tête -->
<div class="lmv-component carto-ukraine-head-paragraph">
  <div class="lmv-component__props" style="display: none;">
    <data title="title">Depuis le début de la guerre en Ukraine, le 24 février 2022, visualisez l’évolution de la situation en Ukraine et dans le monde sur les cartes actualisées du Monde.</data>
    <data title="text">Les cartes ci-dessous permettent de voir, jour après jour, l’évolution des territoires contrôlés par les Russes en Ukraine depuis le 24 février. Elles sont basées sur les observations de l’Institut pour l’étude de la guerre (Institute for the Study of War, ISW), une organisation non gouvernementale américaine ainsi que celles de l’Institut australien de politique stratégique (Australian Strategic Policy Institute, ASPI). Enfin, elles sont mises à jour autant que possible, plusieurs fois par semaine.</data>
  </div>
</div>

<!-- Paragraphe de contexte -->
<div class="lmv-component carto-ukraine-context-paragraph">
  <div class="lmv-component__props" style="display: none;">
    <data title="title">Le point sur la situation aujourd’hui</data>
    <data title="text">Selon le maire, Vitali Klitschko, il reste « un peu moins de deux millions d’habitants » sur les quatre millions que comptait la capitale. L’armée indique que les troupes russes poursuivent l’encerclement de la ville, en s’attaquant à des bourgs aux alentours.</data>
    <data title="end_link_text">Voir le live</data>
    <data title="end_link_url">https://lemonde.fr</data>
  </div>
</div>

<!-- Block de liens utiles -->
<div class="lmv-component carto-ukraine-useful-links">
  <div class="lmv-component__props" style="display: none;">
    <data title="title">Les cartes pour comprendre</data>
    <data title="links">
      <data>
        <data title="text">La situation en cours à Kiev et Kharkiv</data>
        <data title="post_id">un-id-de-post</data>
        <data title="date_yyyy_mm_dd_hh_mm">2022-01-1-11-05</data>
      </data>
      <data>
        <data title="text">La situation aux différentes frontières de l’Ukraine</data>
        <data title="post_id">un-id-de-post</data>
        <data title="date_yyyy_mm_dd_hh_mm">2022-02-11-11-05</data>
      </data>
      <data>
        <data title="text">Les zones contrôlées par l’armée russe au 12ème jour</data>
        <data title="post_id">un-id-de-post</data>
        <data title="date_yyyy_mm_dd_hh_mm">2022-03-11-11-05</data>
      </data>
    </data>
  </div>
</div>

<!-- Têtière de posts -->
<div class="lmv-component carto-ukraine-post-head">
  <div class="lmv-component__props" style="display: none;">
    <data title="post_date_yyyy_mm_dd_hh_mm">2022-03-11-11-05</data>
    <data title="post_title">La situation à Kiev et Kharkiv</data>
    <data title="post_id">un-id-de-post</data>
  </div>
</div>
```

## Exemple
[Voir un exemple ici]({{PARENT_URL}}/example.html)
