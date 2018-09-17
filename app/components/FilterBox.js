import React from 'react';
import { MapControl } from 'react-leaflet';

export default class FilterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        start_date: '',
        end_date: '',
        type: '',
        decision: '',
        phase: ''
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    var newFilter = Object.assign({}, this.state.filter);
    newFilter[name] = value;
    this.props.applyFilter(newFilter);
    this.setState({
      filter: {
        [name]: value
      }
    });
  }

  render() {
    const selectOptions = []
    for (let opt of typeSelectOptions) {
      selectOptions.push(<option value={opt}>{opt}</option>);
    }

    return (
      <div className='leaflet-control-container'>
        <div className='filter-box leaflet-top leaflet-control leaflet-right'>
          <h3>Filter Results</h3>
          <form>
            <label>Project Type: 
              <select name="type" value={this.state.filter.type} onChange={this.handleInputChange}>
                <option value="">All</option>
                {selectOptions}
              </select>
            </label>
          </form>
        </div>
      </div>
    );
  }
}

const typeSelectOptions = ['Mines', 'Industrial', 'Energy-Electricity', 'Transportation', 'Energy-Petroleum & Natural Gas', 'Water Management', 'Waste Disposal', 'Tourist Desination Resorts'];
