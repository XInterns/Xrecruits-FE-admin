import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import './Evaluate.css';

function Searchbox(props) {
    return (
        <div >
            Search By User Id:
                <input className="search-box" type='text' name='useridSearchParam' placeholder='Search by user id' onChange={props.handleChange} value={props.value}/>
        </div>
    );
}

function CustomDropbox(props){
    return(
        <div className="drop">
                        <div className="ultradrop">Search by Test:</div><Dropdown className="Dropdown-root" options={props.options} onChange={props._select} value={props.value}/>
            </div>
    )
}

class Evaluate extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._select = this._select.bind(this);
        this.state = {
            results:null,
            useridSearchParam:"",
            testSearchParam:null,
            divID:'data'
        }
    }

    handleSubmit(event) {
        
    }

    handleChange(event) {
        var value = event.target.value;
        this.setState({ 
            useridSearchParam: value,
            testSearchParam:null,
        })
        if(value===""){
            value=null;
        }
        this.renderRecords(value,null);
    }

    _select(option) {
        this.setState({
            useridSearchParam:"",
            testSearchParam: option.value,
        })
        this.renderRecords(null,option.label);
    }

    componentDidMount() {
        this.renderTable();
    }

    renderTable() {
        fetch(`http://192.168.2.188:7000/gettestdata/${null}/${null}`)
            .then((response) => response.json())
            .then(parsedJson => {
                this.setState({results:parsedJson})
                
                var Table = document.createElement('table');
                Table.setAttribute('id', 'Table');            // SET THE TABLE ID.

                var tr = Table.insertRow(-1);

                for(var h=0;h<Object.keys(this.state.results[0]).length;h++)
                {
                    var th=document.createElement('th');
                    th.innerHTML=Object.keys(this.state.results[0])[h];
                    tr.appendChild(th);
                }
                var thStatus=document.createElement('th');
                thStatus.innerHTML="Status";
                tr.appendChild(thStatus)

                var div = document.getElementById('data');
                div.appendChild(Table);
                
                this.renderRecords(null, null);
            })
            .catch(
                (error) => {
                    this.setState({
                        error,
                    });
                });    // ADD THE TABLE TO YOUR WEB PAGE.
    }

    renderRecords(useridSearchParam, testSearchParam) {
        var table = document.getElementById('Table');
        if(table.rows.length-1!==0)
        {
            var newTable=document.createElement('table') ;
            var div = document.getElementById('data');
            newTable.setAttribute('id','newTable');
            var tr = newTable.insertRow(-1);

            for(var h=0;h<Object.keys(this.state.results[0]).length;h++)
                {
                    var th=document.createElement('th');
                    th.innerHTML=Object.keys(this.state.results[0])[h];
                    tr.appendChild(th);
                }

                var thStatus=document.createElement('th');
                thStatus.innerHTML="Status";
                tr.appendChild(thStatus)
            
            div.replaceChild(newTable, table);
            newTable.setAttribute('id', 'Table');
        }

        fetch(`http://192.168.2.188:7000/gettestdata/${useridSearchParam}/${testSearchParam}`)
                .then((response) => response.json())
                .then(parsedJson => {
                    var result=parsedJson;
                    table=document.getElementById('Table');
                    for(var i=1;i<=result.length;i++)
                    {
                        var tr=document.createElement('tr');
                        tr=table.insertRow(i)
                        tr.setAttribute('id', `tr${i}`);
                        tr.addEventListener('click', (row)=>{
                            this.renderPopup(row.target.parentNode.getAttribute('id'))
                        })
                        for(var h=0;h<Object.keys(result[0]).length;h++)
                        {
                            var td=document.createElement('td');
                            td=tr.insertCell(h);
                            td.innerHTML=Object.values(result[i-1])[h];
                        }
                    }
                    
                    for(let j=0;j<result.length;j++)
                    {
                        fetchData(j);
                    }
            })
            .catch((error) => {
                this.setState({
                    error,
                });
            });
            
            function fetchData(j)
            {
                var tr=document.getElementById(`tr${j+1}`);
                fetch(`http://192.168.2.188:7000/getscore/${tr.cells[0].innerHTML}`)
                            .then((response)=>response.json())
                                .then(parsedJson=>{
                                        var td=document.createElement('td');
                                        td=tr.insertCell(tr.childElementCount);
                                        switch(Number(Object.values(parsedJson))){
                                            case -1:
                                            {
                                                td.innerHTML="Test in progress"
                                                break;
                                            }
                                            case 0:
                                            {
                                                td.innerHTML="Test not attempted yet";
                                                break;
                                            }
                                            case 1:
                                            {
                                                td.innerHTML="Test yet to be evaluated";
                                                break;
                                            }
                                            default:
                                            {
                                                td.innerHTML=`Score is ${Object.values(parsedJson)}`
                                            }
                                        }
                                })
            }

    }

    renderPopup(rowid){
        var div=document.getElementById('popup');
        while(div.hasChildNodes())
            div.removeChild(div.lastChild);
        var row=document.getElementById(rowid);
        var status=row.cells[2].innerHTML;
        if(status!=="Test in progress" && status!=="Test not attempted yet")
        {
            fetch(`http://192.168.2.188:7000/getinfo/${row.cells[0].innerHTML}`)
                .then((response) => response.json())
                    .then(parsedJson => {
                        var result = parsedJson;
                        var email = document.createElement('plaintext');
                        email.setAttribute('id', `email`)
                        email.innerText = Object.values(result[0])[0];
                        div.appendChild(email);
                        for (var i = 0; i < result.length; i++) {
                            var ques = document.createElement('plaintext');
                            ques.innerText = Object.values(result[i])[1];
                            div.appendChild(ques);

                            if (Object.values(result[i])[7] === "SC" || Object.values(result[i])[7] === "MC") {
                                var text = document.createElement('plaintext');
                                text.innerText = Object.values(result[i])[3];
                                div.appendChild(text);
                            }
                            else if (Object.values(result[i])[7] === "Text") {
                                var textarea = document.createElement('textarea');
                                textarea.innerText = Object.values(result[i])[3];
                                textarea.setAttribute('disabled', 'true');
                                div.appendChild(textarea);
                                if (Object.values(result[i])[9] === "pending") 
                                {
                                    var correct_button = document.createElement('input');
                                    correct_button.setAttribute('type', 'button');
                                    var wrong_button = document.createElement('input');
                                    wrong_button.setAttribute('type', 'button');
                                    correct_button.setAttribute('id', `correct_button${i}`);
                                    correct_button.setAttribute('value', `CORRECT`);
                                    wrong_button.setAttribute('id', `wrong_button${i}`);
                                    wrong_button.setAttribute('value', `WRONG`);
                                    correct_button.addEventListener('click', (e) => {
                                        var row_id = e.target.id;
                                        var row_lenght = row_id.length;
                                        var id = row_id.slice(14, row_lenght)

                                        var res = {
                                            'email': `${row.cells[0].innerText}`,
                                            'qid': `${Object.values(result[id])[8]}`,
                                            'check': "CORRECT"
                                        }
                                        fetch(`http://192.168.2.188:7000/evaluatetext`, {
                                            method: 'post',
                                            headers: {
                                                "Content-type": "application/json"
                                            },
                                            body: JSON.stringify(res)
                                        })
                                        .then((response)=>response.json())
                                            .then(parsedJson=>{
                                                if(Number(parsedJson.message)===1)
                                                    this.renderPopup(rowid);
                                        })
                                    })

                                    wrong_button.addEventListener('click', (e) => {
                                        var row_id = e.target.id;
                                        var row_lenght = row_id.length;
                                        var id = row_id.slice(12, row_lenght)

                                        var res = {
                                            'email': `${row.cells[0].innerText}`,
                                            'qid': `${Object.values(result[id])[8]}`,
                                            'check': "WRONG"
                                        }
                                        fetch(`http://192.168.2.188:7000/evaluatetext`, {
                                            method: 'post',
                                            headers: {
                                                "Content-type": "application/json"
                                            },
                                            body: JSON.stringify(res)
                                        })
                                            .then((response)=>response.json())
                                                .then(parsedJson=>{
                                                    if(Number(parsedJson.message)===1)
                                                        this.renderPopup(rowid);
                                                })
                                    })
                                    div.appendChild(correct_button);
                                    div.appendChild(wrong_button)
                                }
                            }
                        }
                    })
        }   
    }

    renderSearchBox(){
        return(
            <div className="searchbox">
            <Searchbox  value={this.state.useridSearchParam} handleChange={(e)=>{this.handleChange(e)}}/>
            </div>
        )
    }

    getOptions(){
        var options=[
            {"value":'',"label":''},
            {"value":'', "label":''}];
        fetch(`http://192.168.2.188:7000/gettype`)
            .then((response) => response.json())
                .then(parsedJson=>{
                    for(var i=0;i<parsedJson.length;i++)
                    {
                        options[i].value=parsedJson[i].ttype;
                        options[i].label=parsedJson[i].ttype;
                    }
                })
        return options;
    }

    renderDropBox(){
        return(
            <div className="dropbox">
            <CustomDropbox  value={this.state.testSearchParam} options={this.getOptions()} _select={this._select}/>
            </div>
        )
    }

    renderData(){
        return(
            <div id="data"/>
        )
    }

    render() {
        return (
            
            <div className='evalue'>
                    <div className="evaluate-box">
                    <div className = "evaluate-header">EVALUATE TEST</div>
                    <div className = "evaluate-body">
                    <div className="evaluate-search">
                            {this.renderSearchBox()}
                            <br />
                            {this.renderDropBox()}
                            <button className="see-all" onClick={()=>{
                                this.setState({
                                    useridSearchParam:"",
                                    testSearchParam:null,
                            })
                            this.renderRecords(null, null)}}>See All</button>
                    </div>

                    <div className="evaluate-display">{this.renderData()}</div>
                    <br/>
                    </div>

                    <div className="evaluate-test">
                        Test Results:<div className="pop" id="popup"/>
                    </div>
                    </div>
            </div>
        );
    }
}

export default Evaluate;