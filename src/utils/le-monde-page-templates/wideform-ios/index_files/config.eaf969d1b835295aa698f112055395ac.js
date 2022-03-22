if (typeof define !== "undefined") {
  define.amd = false;
}

requirejs.config({
  'baseUrl': 'https://asset.lemde.fr/medias/legacy/libs',
  'waitSeconds': 15,
  'paths': {
    'd3': 'd3/2.8.1/d3',
    'd3/2.8.1': 'd3/2.8.1/d3',
    'd3/3.5.6': 'd3/3.5.6/d3.min',
    'd3/4.2': 'd3/4.2.2/d3.min',
    'd3/4.2.2': 'd3/4.2.2/d3.min',
    'd3-topojson/v1': 'd3/d3-topojson-v1.min',
    'd3-geo-projection/v0': 'd3/d3-geo-projection-v0.min',
    'jquery': 'jquery/2.1.0/jquery',
    'jquery-ui': 'jquery-ui/1.10.4/jquery.ui.core',
    'jquery-ui/autocomplete': 'jquery-ui/1.10.4/jquery.ui.autocomplete',
    'jquery-ui/core': 'jquery-ui/1.10.4/jquery.ui.core',
    'jquery-ui/menu': 'jquery-ui/1.10.4/jquery.ui.menu',
    'jquery-ui/mouse': 'jquery-ui/1.10.4/jquery.ui.mouse',
    'jquery-ui/position': 'jquery-ui/1.10.4/jquery.ui.position',
    'jquery-ui/slider': 'jquery-ui/1.10.4/jquery.ui.slider',
    'jquery-ui/tooltip': 'jquery-ui/1.10.4/jquery.ui.tooltip',
    'jquery-ui/widget': 'jquery-ui/1.10.4/jquery.ui.widget',
  },
  'shim': {
    'd3': {
      'exports': 'd3',
    },
    'd3/2.8.1': {
      'exports': 'd3',
    },
    'd3/3.5.6': {
      'exports': 'd3',
    },
    'd3/4.2': {
      'exports': 'd3',
    },
    'd3/4.2.2': {
      'exports': 'd3',
    },
    'd3-geo-projection/v0': {
      'deps': [
        'd3/3.5.6',
      ],
    },
    'd3-topojson/v1': {
      'deps': [
        'd3/3.5.6',
      ],
      'exports': 'topojson',
    },
    'jquery': {
      'exports': 'jQuery',
    },
    'jquery-ui': {
      'deps': [
        'jquery',
      ],
      'exports': '$',
    },
    'jquery-ui/autocomplete': {
      'deps': [
        'jquery-ui/core',
        'jquery-ui/widget',
        'jquery-ui/position',
        'jquery-ui/menu',
      ],
    },
    'jquery-ui/core': {
      'deps': [
        'jquery',
      ],
      'exports': '$',
    },
    'jquery-ui/menu': {
      'deps': [
        'jquery-ui/core',
        'jquery-ui/widget',
        'jquery-ui/position',
      ],
    },
    'jquery-ui/mouse': {
      'deps': [
        'jquery-ui/core',
        'jquery-ui/widget',
      ],
    },
    'jquery-ui/tooltip': {
      'deps': [
        'jquery',
        'jquery-ui/core',
        'jquery-ui/widget',
        'jquery-ui/position',
      ],
      'exports': '$.fn.tooltip',
    },
    'jquery-ui/position': {
      'deps': [
        'jquery',
      ],
    },
    'jquery-ui/slider': {
      'deps': [
        'jquery-ui/core',
        'jquery-ui/widget',
        'jquery-ui/mouse',
      ],
    },
    'jquery-ui/widget': {
      'deps': [
        'jquery',
      ],
    },
    'highcharts': {
      'exports': 'Highcharts',
      'deps': [
        'highcharts-standalone',
      ],
    },
    'highcharts-more': {
      'deps': [
        'highcharts',
      ],
    },
    'highcharts/4.1.9': {
      'exports': 'Highcharts',
      'deps': [
        'highcharts-standalone',
      ],
    },
    '//s1.lemde.fr/assets-redaction/js/grumpycharts/highcharts-6-1-1.js': {
      'exports': 'Highcharts',
    },
    '//s1.lemde.fr/assets-redaction/js/grumpycharts/highchartsmore-6-1-1.js': {
      'deps': [
        '//s1.lemde.fr/assets-redaction/js/grumpycharts/highcharts-6-1-1.js',
      ],
    },
    '//s1.lemde.fr/assets-redaction/js/grumpycharts/streamgraph-6-1-1.js': {
      'deps': [
        '//s1.lemde.fr/assets-redaction/js/grumpycharts/highcharts-6-1-1.js',
      ],
    },
    '//s1.lemde.fr/assets-redaction/js/grumpycharts/accessibility-6-1-1.js': {
      'deps': [
        '//s1.lemde.fr/assets-redaction/js/grumpycharts/highcharts-6-1-1.js',
      ],
    },
    '//s1.lemde.fr/assets-redaction/js/grumpycharts/annotations-6-1-1.js': {
      'deps': [
        '//s1.lemde.fr/assets-redaction/js/grumpycharts/highcharts-6-1-1.js',
      ],
    },
    'dataTables': {
      'deps': [
        'jquery',
      ],
    },
    '//s1.lemde.fr/assets-redaction/js/topojson.v2.min.js': {
      'deps': [
        'd3/4.2.2',
      ],
      'exports': 'topojson',
    },
    '//s1.lemde.fr/assets-redaction/grumpymap/js/francedom.js': {
      'deps': [
        'd3/3.5.6',
      ],
    },
    '//s1.lemde.fr/assets-redaction/js/moment.js': {
      'exports': 'moment',
    },
    '//s1.lemde.fr/assets-redaction/js/textures.js': {
      'deps': [
        'd3/4.2.2',
      ],
      'exports': 'textures',
    },
    '//assets-decodeurs.lemonde.fr/decodeurs/assets/jqueryui/jquery-ui.js': {
      'deps': [
        'jquery',
      ],
    },
  },
});
