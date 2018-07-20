import React, { Component } from 'react';

const form = 
{
  username: "",
  password: ""

};

class AuthUser extends Component 
{

  constructor(props) 
  {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = 
    {
      redirect: false
    }
  }

  handleSubmit(event) 
  {
    event.preventDefault();
    this.callFunction();

  }

  handleChange(event, type) 
  {
    form[type] = event.target.value;
  }

  callFunction() 
  {
    console.log(this.props);
    console.log(form['username']);
    console.log(form['password']);
    fetch("http://192.168.2.188:5000/adminlogin", 
    {
      method: "post",
      headers: 
      {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(
      {
        username: form['username'],
        password: form['password']
      })

    })
      .then((response) => 
      { 
        return response.json(); 
      })
      .then(data => 
      {
        if (data.message === '1') 
        {
          this.setState({ redirect: true });
          console.log(this.state.redirect);
          this.props.history.push("/user");
        }
        else if(data.message === '0'){          
        }

      }).catch((error) => 
        {
        console.log(error);
        })
  }


  render() 
  {
    return (
      <div className='body'>
        <div className="div1">

          <div className="header">XRECRUITS</div>
          <div className="username"><input type='text' placeholder='Username' onChange={
            (e) => { this.handleChange(e, 'username') }
          } /></div>
          <div className="password"><input type='text' placeholder='Password' onChange={
            (e) => { this.handleChange(e, 'password') }
          } /></div>
          <div className="login" ><input type='submit' value='Login' onClick={this.handleSubmit} />
            {this.redirectPage}
          </div>
        </div>
      </div>

    );
  }
}

export default AuthUser;


