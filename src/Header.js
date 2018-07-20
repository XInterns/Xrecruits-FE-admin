import React, { Component } from 'react';
import './index.css';
import './Header.css'
export default class Header extends Component {
    render() {
      return (
        <div>
      <header class="d-flex justify-content-center">
      <div class="container">
        <div class="intro-text">
          <div class="intro-heading text-uppercase">Welcome To Xebia</div>
         {
             console.log('inside return')
         }
          <a class="btn btn-primary btn-xl bg-default text-uppercase js-scroll-trigger" href="admin">admin login</a>
        </div>
      </div>
      </header>
      </div>

      )
    }
}