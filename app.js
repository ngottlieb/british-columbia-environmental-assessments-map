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

var _FilterBox = require('./FilterBox');

var _FilterBox2 = _interopRequireDefault(_FilterBox);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactSpinner = require('react-spinner');

var _reactSpinner2 = _interopRequireDefault(_reactSpinner);

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
      currProjects: [],
      latlng: {
        lat: 55.4085,
        lng: -125.0257
      },
      optionsForFilters: {
        typeOptions: [],
        decisionOptions: [],
        phaseOptions: []
      },
      zoom: 6
    };
    _this.applyFilter = _this.applyFilter.bind(_this);
    _this.fetchData();
    return _this;
  }

  _createClass(EAOMap, [{
    key: 'fetchData',
    value: function fetchData() {
      var self = this;
      fetch("https://cors-anywhere.herokuapp.com/https://projects.eao.gov.bc.ca/api/projects/published").then(function (response) {
        return response.json();
      }).then(function (j) {
        self.setState({ projects: self.processProjects(j), currProjects: self.filteredProjects(j, { includeNA: true }) });
      });
    }

    // get decisionYear for all projects

  }, {
    key: 'processProjects',
    value: function processProjects(projects) {
      if (projects) {
        // get options for the drop down filters
        this.setState({
          optionsForFilters: this.optionsForFilters(projects)
        });

        projects.map(function (proj) {
          proj.decisionYear = (0, _moment2.default)(proj.decisionDate).year();
          return proj;
        });

        // get beginning and end years for the date sliders
        var years = projects.map(function (p) {
          return p.decisionYear;
        }).filter(function (y) {
          return y ? y > 0 : false;
        });;
        this.setState({
          minYear: Math.min.apply(Math, years),
          maxYear: Math.max.apply(Math, years)
        });
      }
      return projects;
    }
  }, {
    key: 'filteredProjects',
    value: function filteredProjects(projects, filter) {
      return projects.filter(function (proj) {
        // check each condition and return false if it doesn't meet the test
        if (filter.type && proj.type && filter.type !== proj.type) {
          return false;
        }
        if (filter.decision && proj.eacDecision && filter.decision !== proj.eacDecision) {
          return false;
        }
        if (filter.phase && proj.currentPhase.name && filter.phase !== proj.currentPhase.name) {
          return false;
        }

        if (!filter.includeNA && !proj.decisionYear) {
          return false;
        }

        if (filter.startDate && proj.decisionYear) {
          if (filter.startDate > proj.decisionYear) {
            return false;
          }
        }
        if (filter.endDate && proj.decisionYear) {
          if (filter.endDate < proj.decisionYear && proj.decisionYear) {
            return false;
          }
        }
        return true;
      });
    }
  }, {
    key: 'applyFilter',
    value: function applyFilter(filter) {
      var newProjects = this.filteredProjects(this.state.projects, filter);
      this.setState({
        currProjects: newProjects
      });
    }
  }, {
    key: 'optionsForFilters',
    value: function optionsForFilters(projects) {
      var options = {};
      // type options
      var types = projects.map(function (p) {
        return p.type;
      });
      options.typeOptions = new Set(types);

      var decisions = projects.map(function (p) {
        return p.eacDecision;
      });
      options.decisionOptions = new Set(decisions.filter(function (p) {
        if (p) {
          return p.length > 0;
        } else {
          return false;
        }
      }));

      var phases = projects.map(function (p) {
        return p.currentPhase.name;
      });
      options.phaseOptions = new Set(phases);

      return options;
    }
  }, {
    key: 'render',
    value: function render() {
      var position = this.state.latlng;
      var zoom = this.state.zoom;
      var access_token = 'pk.eyJ1IjoibmdvdHRsaWViIiwiYSI6ImNqOW9uNGRzYTVmNjgzM21xemt0ZHVxZHoifQ.A6Mc9XJp5q23xmPpqbTAcQ';
      var markers = _react2.default.createElement(ProjectMarkers, { projects: this.state.currProjects });
      var isLoading = this.state.projects.length == 0;
      var map = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactLeaflet.Map,
          { center: position, zoom: zoom },
          _react2.default.createElement(_reactLeaflet.TileLayer, {
            url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
            accessToken: access_token,
            id: 'mapbox.outdoors',
            attribution: 'data <a href=\'https://projects.eao.gov.bc.ca/\'>courtesy of the BC government</a>',
            minZoom: 5
          }),
          isLoading ? _react2.default.createElement(_reactSpinner2.default, null) : markers
        ),
        _react2.default.createElement(_FilterBox2.default, {
          optionsForFilters: this.state.optionsForFilters,
          applyFilter: this.applyFilter,
          minYear: this.state.minYear,
          maxYear: this.state.maxYear
        })
      );
      return map;
    }
  }]);

  return EAOMap;
}(_react2.default.Component);

exports.default = EAOMap;


var ProjectMarkers = function ProjectMarkers(_ref) {
  var projects = _ref.projects;

  if (projects) {
    var items = projects.map(function (props) {
      return _react2.default.createElement(_ProjectMarker2.default, _extends({ key: props.id }, props));
    });
    return _react2.default.createElement(
      'div',
      { style: { display: 'none' } },
      items
    );
  }
};
});

;require.register("components/FilterBox.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLeaflet = require('react-leaflet');

var _reactBootstrap = require('react-bootstrap');

var _reactSlider = require('react-slider');

var _reactSlider2 = _interopRequireDefault(_reactSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilterBox = function (_React$Component) {
  _inherits(FilterBox, _React$Component);

  function FilterBox(props) {
    _classCallCheck(this, FilterBox);

    var _this = _possibleConstructorReturn(this, (FilterBox.__proto__ || Object.getPrototypeOf(FilterBox)).call(this, props));

    _this.state = {
      filter: {
        minYear: _this.props.minYear,
        maxYear: _this.props.maxYear,
        includeNA: true
      }
    };
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.handleDateSliderChange = _this.handleDateSliderChange.bind(_this);
    return _this;
  }

  _createClass(FilterBox, [{
    key: 'handleInputChange',
    value: function handleInputChange(event) {
      var target = event.target;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var name = target.name;
      this.updateFilter(_defineProperty({}, name, value));
    }
  }, {
    key: 'updateFilter',
    value: function updateFilter(updates) {
      var newFilter = Object.assign({}, this.state.filter);
      Object.assign(newFilter, updates);
      this.setState({
        filter: newFilter
      });
      this.props.applyFilter(newFilter);
    }
  }, {
    key: 'handleDateSliderChange',
    value: function handleDateSliderChange(value) {
      this.updateFilter({
        startDate: value[0],
        endDate: value[1]
      });
    }
  }, {
    key: 'render',
    value: function render() {

      var decisionDateInputs;
      // only render the slider once we've established its bounds
      if (this.props.minYear && this.props.maxYear) {
        decisionDateInputs = _react2.default.createElement(
          _reactBootstrap.FormGroup,
          { controlId: 'decisionDate' },
          _react2.default.createElement(
            _reactBootstrap.ControlLabel,
            null,
            'Decision Date'
          ),
          _react2.default.createElement(
            _reactBootstrap.Checkbox,
            {
              checked: this.state.filter.includeNA,
              name: 'includeNA',
              onChange: this.handleInputChange
            },
            'Include Pending or Decision Date Not Available'
          ),
          _react2.default.createElement(
            _reactSlider2.default,
            {
              min: this.props.minYear,
              max: this.props.maxYear,
              withBars: true,
              pearling: true,
              onChange: this.handleDateSliderChange
            },
            _react2.default.createElement(
              'div',
              null,
              this.state.filter.startDate || this.props.minYear
            ),
            _react2.default.createElement(
              'div',
              null,
              this.state.filter.endDate || this.props.maxYear
            )
          )
        );
      }

      return _react2.default.createElement(
        _reactBootstrap.Well,
        { className: 'filter-box leaflet-top leaflet-control leaflet-right' },
        _react2.default.createElement(
          'h3',
          null,
          'Filter Results'
        ),
        _react2.default.createElement(
          _reactBootstrap.Form,
          null,
          _react2.default.createElement(FilterSelect, {
            attribute: 'type',
            value: this.state.filter.type,
            onChange: this.handleInputChange,
            label: 'Project Type',
            options: this.optionsForFilter("type")
          }),
          _react2.default.createElement(FilterSelect, {
            attribute: 'decision',
            value: this.state.filter.decision,
            onChange: this.handleInputChange,
            label: 'Decision Status',
            options: this.optionsForFilter("decision")
          }),
          _react2.default.createElement(FilterSelect, {
            attribute: 'phase',
            value: this.state.filter.phase,
            onChange: this.handleInputChange,
            label: 'Phase',
            options: this.optionsForFilter("phase")
          }),
          decisionDateInputs
        )
      );
    }
  }, {
    key: 'optionsForFilter',
    value: function optionsForFilter(attribute) {
      var options = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.optionsForFilters[attribute + "Options"][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var opt = _step.value;

          options.push(_react2.default.createElement(
            'option',
            { value: opt },
            opt
          ));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return options;
    }
  }]);

  return FilterBox;
}(_react2.default.Component);

exports.default = FilterBox;


var FilterSelect = function FilterSelect(_ref) {
  var attribute = _ref.attribute,
      value = _ref.value,
      onChange = _ref.onChange,
      label = _ref.label,
      options = _ref.options;

  return _react2.default.createElement(
    _reactBootstrap.FormGroup,
    { controlId: attribute },
    _react2.default.createElement(
      _reactBootstrap.ControlLabel,
      null,
      label
    ),
    _react2.default.createElement(
      _reactBootstrap.FormControl,
      {
        componentClass: 'select',
        value: value,
        onChange: onChange,
        name: attribute
      },
      _react2.default.createElement(
        'option',
        { value: '' },
        'All'
      ),
      options
    )
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
  _reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('container'));
});
});

require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map