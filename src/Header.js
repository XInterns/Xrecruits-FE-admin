import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';

class Header extends React.Component{
    render()
    {
        return(
            <div className="tab-links">
                <Link to="/user">Add User</Link>
                <Link to="/addQuestions">Add Questions</Link>
                <Link to="/evaluate">Evaluate Tests</Link>
                <Link to="/deleteQuestions">Delete Questions</Link>
          </div>
        )
    }
}

export default Header;

