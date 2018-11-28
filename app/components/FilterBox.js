import React from 'react';
import { MapControl } from 'react-leaflet';
import { Well, Form, FormGroup, FormControl, Checkbox, ControlLabel, Button } from 'react-bootstrap';
import ReactSlider from 'react-slider';

export default class FilterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: this.defaultFilter()
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateSliderChange = this.handleDateSliderChange.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.updateFilter({ [name]: value });
  }

  defaultFilter() {
    return {
      startDate: this.props.minYear,
      endDate: this.props.maxYear,
      includeNA: true,
      type: '',
      decision: '',
      phase: ''
    };
  }

  resetFilter() {
    const filter = this.defaultFilter();
    this.setState({
      filter: filter
    });
    this.props.applyFilter(filter);
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

  currentStartYear() {
    return this.state.filter.startDate || this.props.minYear;
  }
  currentEndYear() {
    return this.state.filter.endDate || this.props.maxYear;
  }

  render() {
    var decisionDateInputs;
    // only render the slider once we've established its bounds
    if (this.props.minYear && this.props.maxYear) {
      decisionDateInputs = (
        <FormGroup controlId="decisionDate">
          <ControlLabel>Decision Date</ControlLabel>
          <Checkbox
            checked={this.state.filter.includeNA}
            name="includeNA"
            onChange={this.handleInputChange}
          >
            Include Pending or Decision Date Not Available
          </Checkbox>
          <ReactSlider
            min={this.props.minYear}
            max={this.props.maxYear}
            withBars
            pearling
            onChange={this.handleDateSliderChange}
            value={[this.currentStartYear(), this.currentEndYear()]}
          >
            <div>{this.currentStartYear()}</div>
            <div>{this.currentEndYear()}</div>
          </ReactSlider>
        </FormGroup>
      );
    }

    return (
      <Well className='filter-box leaflet-top leaflet-control leaflet-right'>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.resetFilter}
          style={ { float: 'left' } }
        >
          Reset Filter
        </Button>
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

        { decisionDateInputs }

        </Form>
        <hr />
        <Button
          bsStyle="info"
          block
          onClick={this.props.openModal}
        >
          HELP -- What is this map?
        </Button>
      </Well>
    );
  }

  optionsForFilter(attribute) {
    const options = [];
    for (let opt of this.props.optionsForFilters[attribute + "Options"]) {
      options.push(<option key={opt} value={opt}>{opt}</option>);
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

