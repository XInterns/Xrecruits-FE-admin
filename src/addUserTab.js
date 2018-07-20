import React, { Component } from 'react';


var details = [];

var arrHead = [];
var button = [];
var testLanguages = [];
var divid = 0;
var tabCounter=0;
arrHead = ['', 'email', 'easy_ques', 'medium_ques', 'hard_ques', 'message', 'duration', 'test_type', 'tags'];
var trId=0;

class Tags extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    return (

      <div className="tags" id={`div${divid++}`} onClick={(e) => this.props.onClick(e)}>{this.props.it}</div>
    );
  }
}

class User extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderDiv = this.renderDiv.bind(this);
    this.updateLanguageState = this.updateLanguageState.bind(this);
    this.renderLang = this.renderLang.bind(this);
    this.state = {
      email: "",
      easy_ques: "",
      medium_ques: "",
      hard_ques: "",
      message: "",
      duration: "",
      test_type: "",
      tags: ""
    }
  }

  handleSubmit(event) {
    this.callFunction();
  }

  handleAdd(event) {
    event.preventDefault();
    this.state.tags = this.state.tags.slice(0, -1);
    details.push(this.state);
    console.log("hello");
    console.log(details);

    this.createTable();
    this.addRow();


  }

  handleChange(event, type) {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({ [name]: value });
    if (target.value != "") {
      this.handleSearchDebounced(target.value);
    }
  }

  updateLanguageState(event) {
    var element = event.target.id;
    var val = document.getElementById(element).innerHTML;
    document.getElementById('languages').value = "";
    console.log(val);
    testLanguages.push(val);
    console.log(testLanguages);
    this.setState({ tags: this.state.tags.concat(val + "~") });

  }

  handleSearchDebounced(value) {
    var results = [];
    console.log('before')
    fetch(`http://192.168.2.191:7000/getlanguage/${value}`)
      .then((response) => response.json())
      .then(parsedJson => {
        results = parsedJson;
        console.log(results);
        button = (results.map((item) => (
          this.renderDiv(item.lang_name)

        )));

      }).catch((error) => console.log(error))

    console.log('after')
  }

  renderDiv(lang_item) {
    return (
      <Tags it={lang_item} onClick={this.updateLanguageState} />
    );

  }

  renderLang(item) {
    console.log(item);
    return (
      <div>{item}</div>
    );

  }

  componentDidMount() {
   
  }

  createTable() {
    var empTable = document.createElement('table');
    empTable.setAttribute('id', 'empTable');            // SET THE TABLE ID.

    var tr = empTable.insertRow(-1);


    for (var h = 0; h < arrHead.length; h++) {
      var th = document.createElement('th');          // TABLE HEADER.
      th.innerHTML = arrHead[h];
      tr.appendChild(th);
    }

    var div = document.getElementById('cont');
    div.appendChild(empTable);    // ADD THE TABLE TO YOUR WEB PAGE.
  }


  addRow() {
    var empTab = document.getElementById('empTable');

    var rowCnt = empTab.rows.length;
    console.log(rowCnt);      // GET TABLE ROW COUNT.
    var tr = empTab.insertRow(rowCnt);      // TABLE ROW.

    for (var c = 0; c < arrHead.length; c++) {
      var td = document.createElement('td');          // TABLE DEFINITION.

     //for (var h = 0; h < details.length; h++) {
        td = tr.insertCell(c);

        if (c === 0) {           // FIRST COLUMN.
          // ADD A BUTTON.
          var button = document.createElement('input');

          // SET INPUT ATTRIBUTE.
          button.setAttribute('type', 'button');
          button.setAttribute('value', 'Remove');
          button.setAttribute('id',`tr${trId}`)
          var name=details[tabCounter][arrHead[1]]
          button.addEventListener('click', () => {
             this.removeRow(button,name);
          });

          td.appendChild(button);
        }
        else {
          console.log('printing ' + details[tabCounter][arrHead[c]])
          td.innerHTML = (details[tabCounter][arrHead[c]]);
        }

      //}
    }
    tabCounter++;
  }

  removeRow(oButton,tableID) {
    console.log("inside remove");
    console.log('email is '+tableID);
    //console.log(oButton);
    var index=-1;
    for(var i=0;i<details.length;i++)
    {
      if(details[i]['email']==tableID)
        {
          index=i;
          break;
        }
    }
    if(index!=-1)
    {
      details.splice(index,1);
    }
    var empTab = document.getElementById('empTable');
    empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); 
          // BUTTON -> TD -> TR.
          console.log(details)
  }


  callFunction() {

    fetch("http://192.168.2.191:5000/addusers", {
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
        console.log(data.emails);
      })
  }
  render() {

    var xyz = [];
    for (var i = 0; i < testLanguages.length; i++)
      xyz.push(<div>{testLanguages[i]}</div>)
    return (
      <div className="div1">
        <div className='body'></div>
        <div className="header">Add User</div>
        <div className="email"><input type='email' pattern='.+@.+.com' name='email' placeholder='Email' onChange={
          (e) => { this.handleChange(e, 'email') }
        } /></div>
        <div className="easy"><input type='number' name='easy_ques' placeholder='Number of Easy Question' onChange={
          (e) => { this.handleChange(e, 'easy') }
        } /></div>
        <div className="medium"><input type='number' name='medium_ques' placeholder='Number of Medium Question' onChange={
          (e) => { this.handleChange(e, 'medium') }
        } /></div>
        <div className="hard"><input type='number' name='hard_ques' placeholder='Number of Hard Question' onChange={
          (e) => { this.handleChange(e, 'hard') }
        } /></div>
        <div className="message"><input type='text' name='message' placeholder='Enter message' onChange={
          (e) => { this.handleChange(e, 'message') }
        } /></div>
        <div className="duration"><input type='number' name='duration' placeholder='Enter duration of the test(in minutes)' onChange={
          (e) => { this.handleChange(e, 'duration') }
        } /></div>
        <div><p>Select Test type:</p><select className="test_type" name='test_type' onChange={(e) => { this.handleChange(e, 'test_type') }}>
          <option value="Select" selected disabled hidden >Select</option>
          <option value="Internship">Internship</option>
          <option value="Job">Job</option>
          <option value="8 years Experience">8 years Experience</option>
        </select>
        </div>
        <div className="language">
          <input type="text" name='languages' id='languages' placeholder='Enter the Languages' onChange={(e) => { this.handleChange(e, 'languages') }} />

          <div className="">
            {
              xyz
            }
          </div>
          {
            button
          }
        </div>
        <div className="addUser" ><input type='submit' value='Add User' onClick={this.handleAdd} />
        </div>



        <div id="cont">
        </div>

        <div className="submitUser" ><input type='submit' value='Submit User' onClick={this.handleSubmit} /></div>
      </div>

    );
  }
}


export default User;