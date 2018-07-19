import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import './Evaluate.css';

const option=[
    {value:"SC",label:"Single Correct"},
    {value:"MC",label:"Multiple Correct"},
    {value:"Text", label:"Textual"}
]


function Searchbox(props) {
    return (
        <div>
            Search by User:
                <input type='text' name='questionSearchParam' placeholder='Search by user id' onChange={props.handleChange} value={props.value}/>
        </div>
    );
}

function Dropbox(props){
    return(
        <div className="drop">
                        Search by Test:<Dropdown className="Dropdown-root" options={option} onChange={props._select} value={props.value}/>
            </div>
    )
}

class Delete extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._select = this._select.bind(this);
        this.state = {
            results:null,
            questionSearchParam:"",
            qTypeParam:null,
            questionsDeleted:0,
            divID:'data'
        }
    }

    handleSubmit(event) {
        this.renderTable();       
    }

    handleChange(event) {
        var value = event.target.value;
        this.setState({
            questionSearchParam: value,
            qTypeParam:null 
        })
        if(value===""){
            value=null;
        }
        this.renderRecords(value,null);
    }

    _select(option) {
        this.setState({
            questionSearchParam:"",
            qTypeParam: option.value,
        })
        this.renderRecords(null,option.value);
    }

    componentDidMount() {
        this.renderTable();
    }

    renderTable() {
        fetch(`http://192.168.2.188:7000/getquestions/${null}/${null}`)
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

    renderRecords(questionSearchParam, qTypeParam) {
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
            
            div.replaceChild(newTable, table);
            newTable.setAttribute('id', 'Table');
        }

        fetch(`http://192.168.2.188:7000/getquestions/${questionSearchParam}/${qTypeParam}`)
                .then((response) => response.json())
                .then(parsedJson => {
                    var result=parsedJson;
                    table=document.getElementById('Table');
                    for(var i=1;i<=result.length;i++)
                    {
                        var tr=document.createElement('tr');
                        tr=table.insertRow(i)
                        tr.setAttribute('id', `tr${i-1}`);
                        tr.addEventListener('click', (row)=>{
                            
                        })
                        for(var h=0;h<Object.keys(result[0]).length;h++)
                        {
                            var td=document.createElement('td');
                            td=tr.insertCell(h);
                            td.innerHTML=Object.values(result[i-1])[h];
                        }
                        var tdButton=document.createElement('td');
                        tdButton=tr.insertCell(tr.cells.length);
                        var button=document.createElement('input');
                        button.setAttribute('type', 'button');
                        button.setAttribute('id', `button${i-1}`);
                        button.setAttribute('value', 'Delete Question');
                        button.addEventListener('click', (event) => {
                            var button_id = event.target.id;
                            var row_lenght = button_id.length;
                            var id = button_id.slice(6, row_lenght)
                            var res = {
                                'qid': `${Object.values(result[id])[0]}`
                            }
                            fetch(`http://192.168.2.188:7000/deletequestion`, {
                                method: 'post',
                                headers: {
                                    "Content-type": "application/json"
                                },
                                body: JSON.stringify(res)
                            })
                                .then((response)=>response.json())
                                    .then(parsedJson=>{
                                        if(Number(parsedJson.message)===1)
                                            this.renderRecords(null, null);
                                    })
                        })
                        tdButton.appendChild(button);
                    }
                    
                    
            })
            .catch((error) => {
                this.setState({
                    error,
                });
            });
    }

    renderSearchBox(){
        return(
            <Searchbox value={this.state.questionSearchParam} handleChange={(e)=>{this.handleChange(e)}}/>
        )
    }

    renderDropBox(){
        return(
            <Dropbox value={this.state.qTypeParam} _select={this._select}/>
            
        )
    }

    renderData(){
        return(
            <div id="data"/>
        )
    }

    render() {
        return (
            
            <div className='body'>

                <div className="search">
                    {this.renderSearchBox()}
                    <br />
                    {this.renderDropBox()}
                    <button onClick={()=>{
                        this.setState({
                            questionSearchParam:"",
                            qTypeParam:null,
                        })
                        this.renderRecords(null, null)}}>See All</button>
                </div>
                <div className="display">
                    {this.renderData()}
                </div>
                <br/>
                
            </div>
        );
    }
}

export default Delete;