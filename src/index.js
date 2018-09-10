import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <h1>Hello, World</h1>
    )
  }
}

const root = document.getElementById('root');

ReactDOM.render(<App />, root);
