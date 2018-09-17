(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/App.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EAOMap = require('./EAOMap');

var _EAOMap2 = _interopRequireDefault(_EAOMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'app' },
        _react2.default.createElement(_EAOMap2.default, null)
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;
});

;require.register("components/EAOMap.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactLeaflet = require('react-leaflet');

var _ProjectMarker = require('./ProjectMarker');

var _ProjectMarker2 = _interopRequireDefault(_ProjectMarker);

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_leaflet2.default.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/';

var EAOMap = function (_React$Component) {
  _inherits(EAOMap, _React$Component);

  function EAOMap(props) {
    _classCallCheck(this, EAOMap);

    var _this = _possibleConstructorReturn(this, (EAOMap.__proto__ || Object.getPrototypeOf(EAOMap)).call(this, props));

    _this.state = {
      projects: [],
      latlng: {
        lat: 55.4085,
        lng: -125.0257
      },
      zoom: 6
    };
    _this.loadData();
    return _this;
  }

  _createClass(EAOMap, [{
    key: 'loadData',
    value: function loadData() {
      var self = this;
      fetch("https://cors-anywhere.herokuapp.com/https://projects.eao.gov.bc.ca/api/projects/published").then(function (response) {
        return response.json();
      }).then(function (j) {
        self.setState({ projects: j });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var position = this.state.latlng;
      var zoom = this.state.zoom;
      var access_token = 'pk.eyJ1IjoibmdvdHRsaWViIiwiYSI6ImNqOW9uNGRzYTVmNjgzM21xemt0ZHVxZHoifQ.A6Mc9XJp5q23xmPpqbTAcQ';
      var map = _react2.default.createElement(
        _reactLeaflet.Map,
        { center: position, zoom: zoom },
        _react2.default.createElement(_reactLeaflet.TileLayer, {
          url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
          accessToken: access_token,
          id: 'mapbox.outdoors',
          attribution: 'data <a href=\'https://projects.eao.gov.bc.ca/\'>courtesy of the BC government</a>',
          minZoom: 5
        }),
        _react2.default.createElement(ProjectMarkers, { projects: this.state.projects })
      );
      return map;
    }
  }]);

  return EAOMap;
}(_react2.default.Component);

exports.default = EAOMap;


var ProjectMarkers = function ProjectMarkers(_ref) {
  var projects = _ref.projects;

  var items = projects.map(function (props) {
    return _react2.default.createElement(_ProjectMarker2.default, _extends({ key: props.id }, props));
  });

  return _react2.default.createElement(
    'div',
    { style: { display: 'none' } },
    items
  );
};
});

;require.register("components/ProjectMarker.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactLeaflet = require('react-leaflet');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectMarker = function (_React$Component) {
  _inherits(ProjectMarker, _React$Component);

  function ProjectMarker(props) {
    _classCallCheck(this, ProjectMarker);

    return _possibleConstructorReturn(this, (ProjectMarker.__proto__ || Object.getPrototypeOf(ProjectMarker)).call(this, props));
  }

  _createClass(ProjectMarker, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactLeaflet.Marker,
        { position: [this.props.lat, this.props.lon], icon: this.projectIcon() },
        _react2.default.createElement(
          _reactLeaflet.Popup,
          null,
          _react2.default.createElement(
            'h3',
            null,
            this.props.name
          ),
          _react2.default.createElement(
            'p',
            null,
            this.props.description
          ),
          _react2.default.createElement(
            'a',
            { target: '_blank', href: this.projectUrl() },
            'More Info'
          )
        )
      );
    }
  }, {
    key: 'projectUrl',
    value: function projectUrl() {
      return "https://projects.eao.gov.bc.ca/p/" + this.props.code + "/detail";
    }

    // icons courtesy of https://mapicons.mapsmarker.com/

  }, {
    key: 'projectIcon',
    value: function projectIcon() {
      var iconUrl;
      switch (this.props.type) {
        case 'Mines':
          iconUrl = 'images/mine-icon.png';
          break;
        case 'Energy-Electricity':
          if (this.props.name.includes("Hydro")) {
            iconUrl = 'images/dam-icon.png';
          } else if (this.props.name.includes("Wind")) {
            iconUrl = 'images/wind-icon.png';
          } else {
            iconUrl = 'images/power-icon.png';
          }
          break;
        case 'Transportation':
          iconUrl = 'images/road-icon.png';
          break;
        case 'Energy-Petroleum & Natural Gas':
          iconUrl = 'images/oil-icon.png';
          break;
        case 'Water Management':
          iconUrl = 'images/water-management-icon.png';
          break;
        case 'Waste Disposal':
          iconUrl = 'images/waste-icon.png';
          break;
        case 'Tourist Destination Resorts':
          iconUrl = 'images/tourism-icon.png';
          break;
        case 'Industrial':
          iconUrl = 'images/industry-icon.png';
          break;
        default:
          iconUrl = 'images/marker-icon.png';
          break;
      }

      var icon = _leaflet2.default.icon({ iconUrl: iconUrl });
      return icon;
    }
  }]);

  return ProjectMarker;
}(_react2.default.Component);

exports.default = ProjectMarker;
});

;require.register("initialize.js", function(exports, require, module) {
'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _App = require('components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  _reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('mapContainer'));
});
});

require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map