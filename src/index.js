import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Comp from './component.js'
import { Route } from 'react-router'

import Admin from './Admin.js'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter >
        <Switch>
            <Route path="/" exact component={App}/>
            <Route path="/comp" exact component={Comp}/>
            <Route path="/admin" exact component={Admin}/> 
          
        </Switch>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
