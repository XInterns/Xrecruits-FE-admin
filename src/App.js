import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import About from './About';
import Navbar from './Navbar';
import Career from './Career';
import Contact from './Contact';
class App extends Component {
  render() {
    return (
      <div className="app" id="page-top">
        <Navbar/>
        <Header/>
        <About/>
        <Career/>
        <Contact/>
      </div>
    );
  }
}

export default App;
