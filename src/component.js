import React, { Component } from 'react';
import Tabbar from './Tabbar';
import Layout from './Layout';
import {BrowserRouter} from 'react-router-dom';
import './components.css'

class Data extends Component{
  render(){
    return(
      <div className="components">
        <div className="tabbar"><Tabbar/></div>
        <div className="layout"><Layout/> </div>
      </div>
      
    )
  }
}

class ParentComponent extends Component{
    render(){
      return(
        <BrowserRouter>
          <Data/>
        </BrowserRouter>
      )
    }
  }
  
  export default ParentComponent;
  