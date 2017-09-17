import React, {Component} from "react";

import Estado from "./Estado.js";


export default class MordorState extends Component{
	
	constructor(props){
		super(props);
	}


renderEstado(){
	return this.props.estado.map((t,i)=>{
		return <Estado estado= {t} key = {i}/>;
	});
}

	render(){
		return(
			<div>
			{this.renderEstado()}
			</div>
		);
	}
}