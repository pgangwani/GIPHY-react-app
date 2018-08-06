import React, { Component } from 'react';
import './App.css';
import ViewGIPHYs from './GIPHYs/Views/ViewGIPHYs.js';

class App extends Component {
  render() {
    const content = <div key="app-container" className="container-fluid"><ViewGIPHYs /></div>;
    return (content);
  }
}

export default App;
