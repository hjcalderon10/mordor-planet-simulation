import React, {Component} from "react";
import './Stylesheets/Alias.css';


export default class Alias extends Component{
	
	constructor(props){
		super(props);
		this.state={
			alias:""
		};
	}

	handleChange = (event) => {
		this.setState({alias: event.target.value});
	}

	close = () => {
		this.props.bye(this.state.alias);
		fetch("/alias", {method:"POST", headers:{accept:"application/json",'Content-Type': 'application/json'},
						body: JSON.stringify({alias:this.state.alias})})
		.then(function(response){
			console.log(response.json());
		});
	}

	render(){
		return(
			<div id="alias">
			<div id="modalconent">
			<input id="modalAlias" type="text" placeholder="Alias"  onChange={this.handleChange}/>
			<button id="modalButton" onClick={this.close}> OK </button>
			</div>
			</div>
			);
	}


}