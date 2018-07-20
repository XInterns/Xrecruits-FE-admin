import React, {Component} from 'react';
import './User.css';

var details= []

  class User extends Component{
    constructor (props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: "",
            easy_ques: "",
            medium_ques: "",
            hard_ques: "",
            message: "" ,
            duration: "" 
        }
      }   
      
      handleSubmit(event){
          this.callFunction();
      }
      
      handleAdd(event) {
        event.preventDefault();
        details.push(this.state);
        console.log(details);      
        
      }

     handleChange(event,type){
         var target= event.target;
         var name = target.name;
         var value = target.value;
         this.setState({[name]: value})
         
     }
    
      callFunction() {
        fetch("http://192.168.2.188:5000/addusers", {
        method: "post", 
        headers: {
          "Content-Type": "application/json"
      },
        
        body: JSON.stringify(details)
        
      })
      .then( (response) => {  
          return response.json();
       } 
      )
      .then(data => {
            console.log(data.message);  
            console.log(data.email);
            
      })

      }
        render() {
          return (
            
            <div className = "add-user-tab">
            <div className = "user-tab">
            <div className = "user-header">ADD CANDIDATE TEST DETAILS</div>
            <div className = "user-body">
            <div className = "row">
                        <div className = "col1">Email:</div><div className = "col2"><input type='text' className='col2_content' placeholder='Email' onChange={
                          (e)=>{ this.handleChange(e, 'email')}
                        }/></div></div>
            <div className = "row">
                        <div className = "col1">Number of Easy Question:</div><div className = "col2"><input type='text'  className='col2_content' placeholder='Number of Easy Question' onChange={
                          (e)=>{ this.handleChange(e, 'easy')}
                        }/></div></div>
            <div className = "row">
                        <div className = "col1">Number of Medium Question:</div><div className = "col2"><input type='text' className='col2_content' placeholder='Number of Medium Question' onChange={
                          (e)=>{ this.handleChange(e, 'medium')}
                        }/></div></div>
            <div className = "row">
                        <div className = "col1">Number of Hard Question:</div><div className = "col2"><input type='text'  className='col2_content' placeholder='Number of Hard Question' onChange={
                          (e)=>{ this.handleChange(e, 'hard')}
                        }/></div></div>
            <div className = "row">
                        <div className = "col1">Enter message:</div><div className = "col2"><input type='text'  className='col2_content' placeholder='Enter message' onChange={
                          (e)=>{ this.handleChange(e, 'message')}
                        }/></div></div>
            <div className = "row">
                        <div className = "col1">Enter duration of the test:</div><div className = "col2"><input type='text' className='col2_content' placeholder='Enter duration of the test' onChange={
                          (e)=>{ this.handleChange(e, 'duration')}
                        }/></div></div>
            </div>
           

            <div className = "buttons" >
            <div className = "addUser" ><input className='user-added' type='submit' value='Add User' onClick={this.handleAdd}/></div>
            <div className = "submitUser" ><input className='submit-user' type='submit' value='Submit User' onClick={this.handleSubmit}/></div>
            </div>
            </div>
            </div>
      
          );
        }
  }


  export default User;