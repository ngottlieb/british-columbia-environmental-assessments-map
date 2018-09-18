import React from 'react';
import { MapControl } from 'react-leaflet';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import { Well, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';


export default class FilterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(name + " " + value);
    this.updateFilter({ [name]: value });
  }

  updateFilter(updates) {
    var newFilter = Object.assign({}, this.state.filter);
    Object.assign(newFilter, updates);
    console.log(newFilter);
    this.setState({
      filter: updates
    });
    this.props.applyFilter(newFilter);
  }

  handleDateChange(day, modifiers, input) {
    const target = input.getInput();
    const name = target.name;
    const value = target.value.trim();
    this.updateFilter({ [name]: value });
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

          <label>Start Date:</label> 
          <DayPickerInput
            onDayChange={this.handleDateChange}
            value={this.state.filter.startDate}
            inputProps={ { name: 'startDate' } }
          />
          <label>End Date:</label>
          <DayPickerInput
            onDayChange={this.handleDateChange}
            value={this.state.filter.endDate}
            inputProps={ { name: 'endDate' } }
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

