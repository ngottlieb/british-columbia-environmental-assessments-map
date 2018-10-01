import React from 'react';
import { MapControl } from 'react-leaflet';
import { Well, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import ReactSlider from 'react-slider';

export default class FilterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        startDate: this.props.minYear,
        endDate: this.props.maxYear
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateSliderChange = this.handleDateSliderChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.updateFilter({ [name]: value });
  }

  updateFilter(updates) {
    var newFilter = Object.assign({}, this.state.filter);
    Object.assign(newFilter, updates);
    this.setState({
      filter: newFilter
    });
    this.props.applyFilter(newFilter);
  }

  handleDateSliderChange(value) {
    this.updateFilter({
      startDate: value[0],
      endDate: value[1]
    });
  }

  render() {

    return (
      <Well className='filter-box leaflet-top leaflet-control leaflet-right'>
        <h3>Filter Results</h3>
        <Form>
          <FilterSelect
            attribute="type"
            value={this.state.filter.type}
            onChange={this.handleInputChange}
            label="Project Type"
            options={this.optionsForFilter("type")}
          />

          <FilterSelect
            attribute="decision"
            value={this.state.filter.decision}
            onChange={this.handleInputChange}
            label="Decision Status"
            options={this.optionsForFilter("decision")}
          />

          <FilterSelect
            attribute="phase"
            value={this.state.filter.phase}
            onChange={this.handleInputChange}
            label="Phase"
            options={this.optionsForFilter("phase")}
          />

          <label>Decision Date:</label> 
          <ReactSlider
            min={this.props.minYear}
            max={this.props.maxYear}
            withBars
            pearling
            value={[this.state.filter.startDate, this.state.filter.endDate]}
            onChange={this.handleDateSliderChange}
          />
        </Form>
      </Well>
    );
  }

  optionsForFilter(attribute) {
    const options = [];
    for (let opt of this.props.optionsForFilters[attribute + "Options"]) {
      options.push(<option value={opt}>{opt}</option>);
    }
    return(options);
  }

}

const FilterSelect = ({ attribute, value, onChange, label, options }) => {
  return (
    <FormGroup controlId={attribute}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        componentClass="select"
        value={value}
        onChange={onChange}
        name={attribute}
      >
        <option value="">All</option>
        {options}
      </FormControl>
    </FormGroup>
  );
}

