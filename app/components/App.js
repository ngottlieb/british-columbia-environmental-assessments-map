import React from 'react';
import EAOMap from './EAOMap';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='app'>
        <EAOMap />
      </div>
    );
  }
}
