import React, { Component } from 'react';
import './App.css';

import axios from 'axios'

class App extends Component {

  constructor() {
    super()
    this.state = {name: ''}
  }

  componentDidMount() {
    axios.get('/user')
    .then(resp => {
      console.log(resp)
      this.setState({
        name: resp.name
      })
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.name}
      </div>
    );
  }
}

export default App;
