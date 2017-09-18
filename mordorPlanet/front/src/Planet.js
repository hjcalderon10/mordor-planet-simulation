import React, {Component} from "react";
import './Stylesheets/Planet.css';


export default class Planet extends Component{
	
	constructor(props){
		super(props);
	}
    
	render(){
		return(
			<div id="planet">
			    <div id="texture"></div>
			</div>
		);
	}


}