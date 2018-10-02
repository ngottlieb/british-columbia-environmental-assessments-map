import { Marker, Popup } from 'react-leaflet';
import React from 'react';
import L from 'leaflet';
import moment from 'moment';

export default class ProjectMarker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Marker position={[this.props.lat, this.props.lon]} icon={this.projectIcon()}>
        <Popup>
          <h3>{this.props.name}</h3>
          <dl>
            <dt>Type</dt>
            <dd>{this.props.type}</dd>
            <dt>Decision</dt>
            <dd>{this.props.eacDecision ? this.props.eacDecision : 'N/A'}</dd>
            <dt>Decision Date</dt>
            <dd>{this.props.decisionDate ? moment(this.props.decisionDate).format('MMMM Do YYYY') : 'N/A'}</dd>
            <dt>Proponent</dt>
            <dd>{this.props.proponent ? this.props.proponent.name : ''}</dd>
          </dl>
          <p>{this.props.description}</p>
          <a target="_blank" href={this.projectUrl()}>More Info</a>
        </Popup>
      </Marker>
    );
  }

  projectUrl() {
    return "https://projects.eao.gov.bc.ca/p/" + this.props.code + "/detail";
  }

  // icons courtesy of https://mapicons.mapsmarker.com/
  projectIcon() {
    var iconUrl;
    switch(this.props.type) {
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

    var icon = L.icon({ iconUrl: iconUrl });
    return(icon);
  }
}
