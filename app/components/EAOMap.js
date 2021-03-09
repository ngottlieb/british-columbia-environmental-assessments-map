import React from "react";
import { render } from "react-dom";
import { Map, Marker, Popup, TileLayer, Pane } from "react-leaflet";
import ProjectMarker from "./ProjectMarker";
import L from "leaflet";
import FilterBox from "./FilterBox";
import moment from "moment";
import Spinner from "react-spinner";

L.Icon.Default.imagePath =
  "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/";

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
      optionsForFilters: {
        typeOptions: [],
        decisionOptions: [],
        phaseOptions: []
      },
      zoom: 6
    };
    this.applyFilter = this.applyFilter.bind(this);
    this.fetchData();
  }

  fetchData() {
    fetch(
      "https://eagle-prod.pathfinder.gov.bc.ca/api/public/search?dataset=Project&pageNum=0&pageSize=1000&sortBy=-score&populate=true"
    )
      .then(response => response.json())
      .then(j => {
        this.parseResponse(j);
      })
      .catch(error => {
        console.log(`Failed to retrieve projects from BC EAO API: ${error}`);
        console.log("Using local backup");
        fetch("backup_data.json")
          .then(response => response.json())
          .then(j => {
            this.parseResponse(j);
          });
      });
  }

  parseResponse(results) {
    const projs = results[0].searchResults;
    this.setState({
      projects: this.processProjects(projs),
      currProjects: this.filteredProjects(projs, { includeNA: true })
    });
  }

  // get decisionYear for all projects
  processProjects(projects) {
    if (projects) {
      // get options for the drop down filters
      this.setState({
        optionsForFilters: this.optionsForFilters(projects)
      });

      projects.map(proj => {
        proj.decisionYear = moment(proj.decisionDate).year();
        return proj;
      });

      // get beginning and end years for the date sliders
      const years = projects
        .map(function(p) {
          return p.decisionYear;
        })
        .filter(function(y) {
          return y ? y > 0 : false;
        });
      this.setState({
        minYear: Math.min.apply(Math, years),
        maxYear: Math.max.apply(Math, years)
      });
    }
    return projects;
  }

  filteredProjects(projects, filter) {
    return projects.filter(function(proj) {
      // check each condition and return false if it doesn't meet the test
      if (filter.type && proj.type && filter.type !== proj.type) {
        return false;
      }
      if (
        filter.decision &&
        proj.eacDecision &&
        filter.decision !== proj.eacDecision
      ) {
        return false;
      }
      if (
        filter.phase &&
        proj.currentPhaseName &&
        filter.phase !== proj.currentPhaseName
      ) {
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

  applyFilter(filter) {
    const newProjects = this.filteredProjects(this.state.projects, filter);
    this.setState({
      currProjects: newProjects
    });
  }

  optionsForFilters(projects) {
    var options = {};
    // type options
    const types = projects.map(function(p) {
      return p.type;
    });
    options.typeOptions = new Set(types);

    var decisions = projects.map(function(p) {
      return p.eacDecision;
    });
    options.decisionOptions = new Set(
      decisions.filter(function(p) {
        if (p) {
          return p.length > 0;
        } else {
          return false;
        }
      })
    );

    var phases = projects.map(function(p) {
      return p.currentPhaseName;
    });
    options.phaseOptions = new Set(phases);

    return options;
  }

  render() {
    const position = this.state.latlng;
    const zoom = this.state.zoom;
    const access_token =
      "pk.eyJ1IjoibmdvdHRsaWViIiwiYSI6ImNqOW9uNGRzYTVmNjgzM21xemt0ZHVxZHoifQ.A6Mc9XJp5q23xmPpqbTAcQ";
    const markers = <ProjectMarkers projects={this.state.currProjects} />;
    const isLoading = this.state.projects.length == 0;
    const map = (
      <div>
        <Map center={position} zoom={zoom}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}"
            accessToken={access_token}
            id="outdoors-v10"
            attribution="data <a href='https://projects.eao.gov.bc.ca/'>courtesy of the BC government</a>"
            minZoom={5}
          />
          {isLoading ? <Spinner /> : markers}
        </Map>
        <FilterBox
          openModal={this.props.openModal}
          optionsForFilters={this.state.optionsForFilters}
          applyFilter={this.applyFilter}
          minYear={this.state.minYear}
          maxYear={this.state.maxYear}
        />
      </div>
    );
    return map;
  }
}

const ProjectMarkers = ({ projects }) => {
  if (projects) {
    const items = projects.map(props => (
      <ProjectMarker key={props._id} {...props} />
    ));
    return <div style={{ display: "none" }}>{items}</div>;
  }
};
