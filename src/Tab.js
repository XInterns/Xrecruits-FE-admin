import React, { Component } from 'react';

var details = [];
var opt = [];
var counter = 0;
var id = 0;
var value;
var changeEvent;
var div;
var testLanguages = [];
var divid = 0;


var button=[];

class Tags extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    
  }
  handleClick(event){

    var element = event.target.id;
    var val =document.getElementById(element).innerHTML;
    console.log(val);
    testLanguages.push(val);
    console.log(testLanguages);
  }

  
  render() {
    return(
      // <div id='idelement' onClick={this.handleClick}>hello</div>
      <div className= "tags" id={`div${divid++}`} onClick={(e)=>this.handleClick(e)}>{this.props.it}</div>
    );
  }
}

class SCQuestion extends Component {
  render() {
    return (
      <div className="options" style={{ visibility: 'visible' }}>Enter Options:
      <input type='text' onChange={this.props.onChange}></input>
        <button value="Add Option" onClick={this.props.onClick} >Add Option</button>
      </div>
    );
  }
}

class MCQuestion extends Component {
  render() {
    return (
      <div className="options" style={{ visibility: 'visible' }}>Enter Options:
      <input type='text' onChange={this.props.onChange}></input>
        <button value="Add Option" onClick={this.props.onClick} >Add Option</button>

      </div>
    );
  }
}

class Questions extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addOption = this.addOption.bind(this);
    this.renderDiv=this.renderDiv.bind(this);
    this.handleAddLanguage = this.handleAddLanguage.bind(this);
    this.state = {
      question: "",
      qtype: "",
      difficulty: "",
      options: "",
      answers: "",
      languages: "",
      tags: "",
    }
  }

  handleSubmit(event) {

    this.callFunction();
  }

  handleAdd(event) {
    event.preventDefault();
    console.log("hello all" + opt.length);
    var rate_value = "";
    for (var i = 0; i < opt.length; i++) {

      if (document.getElementById(i).checked) {       
        
        rate_value += document.getElementById(i).value + "~";
      
        console.log(rate_value);

      }
    }
    let pr = () => new Promise((res, resolve) => {
      this.setState({ answers: rate_value });
      res(1);
    });
    pr().then(() => {
      this.state.options=this.state.options.slice(0,-1);
      this.state.answers=this.state.answers.slice(0,-1);
      this.state.tags=this.state.tags.slice(0,-1);
      details.push(this.state);
      this.setState({ options: "" });
      opt.length = 0;
      document.getElementById('wrapper').innerHTML = "";
      //value = "";
      counter = 0;

      id = 0;
      value = "";
      document.getElementById('question').value = "";

      var elements = document.getElementsByName("difficulty")
      for (i = 0; i < elements.length; i++) {
        elements[i].selectedIndex = 0;
      }

      var elements = document.getElementsByName("qtype")
      for (i = 0; i < elements.length; i++) {
        elements[i].selectedIndex = 0;
      }

    }
    )
    console.log(this.state.answers);
    console.log(details);
  }

  handleChange(event, type) {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({ [name]: value });
    if(target.value!=""){
      this.handleSearchDebounced(target.value);
    }
  }

  handleSearchDebounced(value){
    var results = [];
    console.log('before')
    fetch(`http://192.168.2.191:7000/getlanguage/${value}`)
    .then((response) => response.json())
    .then(parsedJson => {
      results = parsedJson;
      console.log( results);
      button=(results.map((item) => (
        this.renderDiv(item.lang_name)
  
      )) );
      
    }).catch((error) => console.log(error))
    
    console.log('after')
  }

  

  handleChangeOption(event, type) {
    changeEvent = event.target;
    value = changeEvent.value;
  }

  handleAddLanguage(){
    var lang = document.getElementById('languages').value;
    console.log("the value is:"+lang);
    var obj = { "lang_name" : lang};
    testLanguages.push(lang);
    console.log(testLanguages);

    this.setState({ tags: this.state.tags.concat(lang + "~") });
    
   
    fetch("http://192.168.2.191:7000/addlanguage", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      
      body: JSON.stringify(obj)


    })
      .then((response) => {
        return response.json();
      }
      )
      .then(data => {
        console.log(data.message);
      })
    document.getElementById('languages').value="";
    
  }

  addOption() {
    changeEvent.value = null;
    opt.push(value);
    console.log("this is OPT " + opt);
    console.log("this is " + value);
    this.setState({ options: this.state.options.concat(value + "~") });

    console.log(this.state.options);

    var wrapper = document.getElementById('wrapper');

    //var randomIndex = Math.floor(Math.random() * opt.length);
    var val = opt[counter++];//opt.splice(randomIndex, 1)[0];

    if (this.state.qtype == "SC") {
      var radio = document.createElement('input');
      var label = document.createElement('label');

      radio.type = 'radio';
      radio.name = 'radio_button';
      radio.value = val;
      radio.setAttribute("id", id++);

      label.setAttribute("for", val);
      label.innerHTML = val;


      wrapper.appendChild(label);
      wrapper.appendChild(radio);

    }
    else if (this.state.qtype == "MC") {
      var checkbox = document.createElement('input');
      var label = document.createElement('label')
      checkbox.type = "checkbox";
      checkbox.name = "checkbox";
      checkbox.value = val;
      checkbox.setAttribute("id", id++);

      
      label.setAttribute( "for", val);
      label.innerHTML = val;

      wrapper.appendChild(checkbox);
      wrapper.appendChild(label);
    }

  }

  renderDiv(lang_item){
    return(
      <Tags it={lang_item} />
    );

  }

  callFunction() {
    fetch("http://192.168.2.191:7000/addquestion", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details)

    })
      .then((response) => {
        return response.json();
      }
      )
      .then(data => {
        console.log(data.message);
      })
  }
  render() {
    const quest_type = this.state.qtype;



    if (quest_type === "SC") {
      div = <div>
        <SCQuestion onChange={(e) => { this.handleChangeOption(e, 'options') }} onClick={this.addOption} />
        <div id="wrapper"></div>
      </div>

    }
    else if (quest_type === "MC") {
      div = <div>
      <MCQuestion onChange={(e) => { this.handleChangeOption(e, 'options') }} onClick={this.addOption} />
      <div id="wrapper"></div>
      </div>
    }
    else {

      div = <div style={{ visibility: 'hidden' }}> Enter Options:<input type='text' ></input>
      <div id="wrapper"></div>
      </div>
    }
 
    return (
      <div className="add-question">
       <div className="add-question-box">
        <div className="add-question-header">Add Question</div>
        <div className="add-question-body">
        <div className="question"><input type='text' name='question' id='question' placeholder='Add Question' onChange={
          (e) => { this.handleChange(e, 'question') }
        } /></div>

        <div className = "difficulty"><p>Select Difficulty:</p><select className="difficulty" name='difficulty' onChange={(e) => { this.handleChange(e, 'difficulty') }}>
          <option value="Select" selected disabled hidden >Select</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        </div>

        <div className = "qtype"><p>Ques Type:</p><select className="qtype" defaultValue="Select" name='qtype' onChange={(e) => { this.handleChange(e, 'qtype') }}>

          <option value="Select" selected disabled hidden>Select</option>
          <option value="SC" >Single Choice Question(s)</option>
          <option value="MC">Multiple Choice Question(s)</option>
          <option value="Text">Textual Question</option>
        </select>
        </div>

        <div className= "options">{div}</div>
        <div className = "language"><p>Select the language</p><input type ="text" name='languages' id ='languages' onChange={(e) => { this.handleChange(e, 'languages') }}/><input type='submit' value='Add Langauge to DBMS' onClick={this.handleAddLanguage} />
       
        {
           button
        } 
        </div>
        </div>
        <div className="button-onclick">
        <div className="addQuestion" ><input type='submit' value='Add Question' onClick={this.handleAdd} /></div>
        <div className="submitQuestion" ><input type='submit' value='Submit Question' onClick={this.handleSubmit} /></div>
      </div>
      </div>
      </div>

    );
  }
}

export default Questions;