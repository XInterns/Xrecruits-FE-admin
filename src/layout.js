import React from 'react';
import {Route, Switch} from 'react-router-dom';
import User from './User';
import Tab from './Tab';
import Evaluate from './Evaluate';
import Delete from './Delete';

class Layout extends React.Component{
    render(){
        return(
            <Switch>
                <Route path='/user' component={User} />
                <Route path='/addQuestions' component={Tab} />
                <Route path='/evaluate' component={Evaluate} />
                <Route path='/deleteQuestions' component={Delete}/>
            </Switch>
        );
    }
}

export default Layout;