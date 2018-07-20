import React, { Component } from 'react';
import './index.css';
import './Navbar.css';
export default class Navbar extends Component {
    render() {
        return (
        <div class="fixed-top">
      <nav class="navbar navbar-expand-sm navbar-dark  navbar-shrink" id="mainNav">
            <div class="container">
              <a class="navbar-brand js-scroll-trigger" href="#page-top">XRECRUITS</a>
            
              <div class="collapse navbar-collapse" id="navbarResponsive">
                  <ul class="navbar-nav text-uppercase ml-auto">
                      <li class="nav-item">
                        <a class="nav-link js-scroll-trigger" href="#about">About</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link js-scroll-trigger" href="#career">career</a>
                      </li>
                  </ul>
              </div>
            </div>
      </nav>
      </div>
      )
    }
    }
    