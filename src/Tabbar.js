import React from 'react';
import {Link} from 'react-router-dom';
import './Tabbar.css';

class Tabbar extends React.Component{
    render()
    {
        return(
            <div>
            <div className="tab-links">
                <div className="logo">XRECRUITS</div>
                <div className="home"><Link to="/home">HOME</Link></div>
                <div className="add-user"><Link to="/user">ADD USER</Link></div>
                <div className="tabs"><Link to="/tab">TAB</Link></div>
                <div className="evaluate"><Link to="/evaluate">EVALUATE TEST</Link></div>
                <div className="deleteQuestions"><Link to="/deleteQuestions">DELETE QUESTIONS</Link></div>
            </div>
            </div>
        )
    }
}

export default Tabbar;

