import React from 'react';
import { MapControl } from 'react-leaflet';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';


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
    const typeSelectOptions = [];
    for (let opt of this.props.optionsForFilters.typeOptions) {
      typeSelectOptions.push(<option value={opt}>{opt}</option>);
    }
    const decisionSelectOptions = [];
    for (let opt of this.props.optionsForFilters.decisionOptions) {
      decisionSelectOptions.push(<option value={opt}>{opt}</option>);
    }
    const phaseSelectOptions = [];
    for (let opt of this.props.optionsForFilters.phaseOptions) {
      phaseSelectOptions.push(<option value={opt}>{opt}</option>);
    }

    return (
      <div className='leaflet-control-container'>
        <div className='filter-box leaflet-top leaflet-control leaflet-right'>
          <h3>Filter Results</h3>
          <form>
            <label>Project Type: 
              <select name="type" value={this.state.filter.type} onChange={this.handleInputChange}>
                <option value="">All</option>
                {typeSelectOptions}
              </select>
            </label>
            <label>Decision Status:
              <select name='decision' value={this.state.filter.decision} onChange={this.handleInputChange}>
                <option value="">All</option>
                {decisionSelectOptions}
              </select>
            </label>
            <label>Phase:
              <select name='phase' value={this.state.filter.phase} onChange={this.handleInputChange}>
                <option value="">All</option>
                {phaseSelectOptions}
              </select>
            </label>
            <br/>
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
          </form>
        </div>
      </div>
    );
  }
}
