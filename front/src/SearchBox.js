import React, {Component} from "react";

export default class SearchBox extends Component{
	
	constructor(props){
		super(props);
	}
	render(){
		return(
			<input type="text" placeholder="Search"/>

			);
	}
}