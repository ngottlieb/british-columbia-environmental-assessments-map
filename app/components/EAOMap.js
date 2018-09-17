import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import ProjectMarker from './ProjectMarker';
import L from 'leaflet';

L.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/';

export default class EAOMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      latlng: {
        lat: 55.4085,
        lng: -125.0257
      },
      zoom: 6
    }
    this.loadData();
  }

  loadData() {
    const self = this;
    fetch("https://cors-anywhere.herokuapp.com/https://projects.eao.gov.bc.ca/api/projects/published")
      .then(function(response) { return response.json(); })
      .then(function(j) { 
        self.setState({ projects: j });
      });
  }

  render() {
    const position = this.state.latlng;
    const zoom = this.state.zoom;
    const access_token = 'pk.eyJ1IjoibmdvdHRsaWViIiwiYSI6ImNqOW9uNGRzYTVmNjgzM21xemt0ZHVxZHoifQ.A6Mc9XJp5q23xmPpqbTAcQ'
    const map = (
      <Map center={position} zoom={zoom}>
        <TileLayer
          url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
          accessToken={access_token}
          id="mapbox.outdoors"
          attribution="data <a href='https://projects.eao.gov.bc.ca/'>courtesy of the BC government</a>"
          minZoom={5}
        />
        <ProjectMarkers projects={this.state.projects} />
      </Map>
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
