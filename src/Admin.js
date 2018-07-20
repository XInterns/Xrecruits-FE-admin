import React, { Component } from 'react';
import './index.css';
import './Admin.css';
class Admin extends Component {
    constructor(props){
        super(props);
        this.renderPage = this.renderPage.bind(this);
    }

    renderPage(){
        this.props.history.push("/comp");
    }

    render() {
        
        return (  
            // <div  id="admin">
            //             <div className = "admin_login">
                        
            //                     {/* <div className = "header">XRECRUITS</div>
            //                     <div className = "username"><input className = "user" type='text' placeholder='Username'/></div>
            //                     <div className = "password"><input  className = "pass"type='text' placeholder='Password'/></div>
                                
            //                     <div className = "login" ><input class="btn btn-primary btn-xl bg-danger text-uppercase js-scroll-trigger" type='submit' value='Login' href="login" onClick={this.renderPage}/></div>
            //                      */}
            //             </div>            
            // </div>

            <div className="admin-body">
            <div className="admin-login">
                        <div className = "header">XRECRUITS</div>
                        <div className = "username"><input className = "user" type='text' placeholder='Username'/></div>
                        <div className = "password"><input  className = "pass"type='text' placeholder='Password'/></div>        
                        <div className = "login" ><input class="btn btn-primary btn-xl bg-default text-uppercase js-scroll-trigger" type='submit' value='Login' href="login" onClick={this.renderPage}/></div>                      
            </div>
            </div>
        )
    }
}

export default Admin;