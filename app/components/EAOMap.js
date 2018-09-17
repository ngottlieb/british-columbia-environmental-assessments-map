import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';

export default class EAOMap extends React.Component {
  render() {
    const position = [55.4085433,-125.025737];
    const zoom = 6;
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
      </Map>
    );
    return map;
  }
}
