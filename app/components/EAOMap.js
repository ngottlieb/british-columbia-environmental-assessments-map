import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, Pane } from 'react-leaflet';
import ProjectMarker from './ProjectMarker';
import L from 'leaflet';
import FilterBox from './FilterBox';
import moment from 'moment';

L.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/';

export default class EAOMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      currProjects: [],
      latlng: {
        lat: 55.4085,
        lng: -125.0257
      },
      zoom: 6
    }
    this.applyFilter = this.applyFilter.bind(this);
    this.fetchData();
  }

  fetchData() {
    var self = this;
    fetch("https://cors-anywhere.herokuapp.com/https://projects.eao.gov.bc.ca/api/projects/published")
      .then(function(response) { return response.json(); })
      .then(function(j) { self.setState({ projects: j, currProjects: self.filteredProjects(j, {}) }) });
  }

  filteredProjects(projects, filter) {
    return projects.filter(function(proj) {
      // check each condition and return false if it doesn't meet the test
      if (filter.type && filter.type !== proj.type) { return false; }
      if (filter.decision && filter.decision !== proj.eacDecision) { return false; }
      if (filter.phase && filter.phase !== proj.currentPhase.name) {return false; }

      if (filter.startDate) {
        if (moment(filter.startDate) > moment(proj.decisionDate)) {
          return false;
        }
      }
      if (filter.endDate) {
        if (moment(filter.endDate) < moment(proj.decisionDate)) {
          return false;
        }
      }
      return true;
    });
  }

  applyFilter(filter) {
    const newProjects = this.filteredProjects(this.state.projects, filter);
    this.setState({
      currProjects: newProjects
    });
  }

  optionsForFilters() {
    var options = {};
    // type options
    const types = this.state.projects.map(function(p) { return p.type; });
    options.typeOptions = new Set(types)

    var decisions = this.state.projects.map(function(p) { return p.eacDecision; });
    options.decisionOptions = new Set(decisions.filter(
      function(p) { 
        if (p) {
          return p.length > 0;
        } else {
          return false;
        }}));
    
    var phases = this.state.projects.map(function(p) { return p.currentPhase.name; });
    options.phaseOptions = new Set(phases);

    return options;
  }


  render() {
    const position = this.state.latlng;
    const zoom = this.state.zoom;
    const access_token = 'pk.eyJ1IjoibmdvdHRsaWViIiwiYSI6ImNqOW9uNGRzYTVmNjgzM21xemt0ZHVxZHoifQ.A6Mc9XJp5q23xmPpqbTAcQ'
    const map = (
      <div>
        <Map center={position} zoom={zoom}>
          <TileLayer
            url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
            accessToken={access_token}
            id="mapbox.outdoors"
            attribution="data <a href='https://projects.eao.gov.bc.ca/'>courtesy of the BC government</a>"
            minZoom={5}
          />
          <ProjectMarkers projects={this.state.currProjects} />
        </Map>
        <FilterBox
          optionsForFilters={this.optionsForFilters()}
          applyFilter={this.applyFilter}
        />
      </div>
    );
    return map;
  }
}

const ProjectMarkers = ({ projects }) => {
  const items = projects.map((props) => (
    <ProjectMarker key={props.id} {...props} />
  ));

  return <div style={{ display: 'none' }}>{items}</div>
}
