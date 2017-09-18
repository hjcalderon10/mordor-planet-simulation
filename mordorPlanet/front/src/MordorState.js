import React, {Component} from "react";
import PropTypes from "prop-types";
import Estado from "./Estado.js";

class MordorState extends Component{
	
	constructor(props){
		super(props);
	}


	renderEstado(){
		console.log(this.props);
		console.log(this.props.recursos);
		if(this.props.recursos.length !== 0){
			return this.props.recursos.map(t=>{
				return t.recursos.map((n,i)=>{
					return <Estado recursos= {n} key = {i}/>;	
				});
			});
		}
		else{
			return <div></div>;
		}
	}

	render(){
		return(
			<div>
			{this.renderEstado()}
			</div>
			);
	}
}


MordorState.PropTypes={
	recursos:PropTypes.object.isRequired
};


export default MordorState;