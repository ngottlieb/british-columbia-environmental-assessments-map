import React from 'react';
import EAOMap from './EAOMap';
import { Modal, Button } from 'react-bootstrap';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    return (
      <div id='app'>
        <EAOMap openModal={this.openModal} />
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>What is this?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>What is the map showing?</h4>
            <p>
              In British Columbia, Canada, "major projects" have to go through an environmental assessment process governed by
              the <a href="https://www2.gov.bc.ca/gov/content/environment/natural-resource-stewardship/environmental-assessments">Environmental Assessment Office</a>.
              This map shows all projects that either have been through or are going through the environmental assessment process since 1990.
            </p>
            <h4>How do I use it?</h4>
            <p>
              By default, and when you click "Reset Filter," all projects are displayed on the map. You can narrow the filters using the select boxes and date sliders
              on the right. You can find more information about what different "phases" and "decision statuses" actually
              mean <a href="https://www2.gov.bc.ca/gov/content/environment/natural-resource-stewardship/environmental-assessments/the-environmental-assessment-process">on the EAO website.</a>
            </p>
            <h4>Why would I use it?</h4>
            <p>
              Kind of an open question. It allows you to explore trends in development applications over the last three decades and compare different types of projects.
              For example, looking at just mines, you can see that over the last three years, far more mines (twenty) have been approved than in years prior.
              It can also help you find current and past projects in a particular area; I'd heard rumors about a ski resort in the Duffy Lake Provincial Park area, for example,
              and it's easy to find the project on the map and click through for more details.
            </p>
            <h4>Some notes</h4>
            <p>
              These data are from a public source provided by the EAO
              here: <a href="https://projects.eao.gov.bc.ca/">https://projects.eao.gov.bc.ca/</a>.
              If you go there, you'll see that they already have a visualization of projects on a map. I found their interface frustrating as it
              doesn't allow you to actually filter on the map itself, just in the table below, nor does it provide any visual indication of what a given project is until you click on it,
              so I built this enhanced interface instead.
            </p>
            <p>
              The points provided for each project with the data are not necessarily representative of the full scope of the project. For example,
              there are a handful of hydro projects including the "Narrows Inlet Hydro" west of the Tantalus Range that include multiple dams under one umbrella
              and are only shown as a single point on the map. We're hoping to find another data source at some point that will allow us to extend beyond the single
              point display per project, but for now, that's what the Epic API provides.
            </p>
            <h4>Suggestions?</h4>
            <p>
              This was created by <a href="http://www.nicholasgottlieb.com">Nick Gottlieb</a>. If you have suggestions or feedback, or want to contribute to this project
              or collaborate on something else, please reach out! This project is <a href="https://github.com/ngottlieb/british-columbia-environmental-assessments-map">hosted on Github</a>.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }
}
