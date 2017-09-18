import React, {Component} from "react";
import PropTypes from "prop-types";
import Accion from "./Accion.js";

class Log extends Component{
	
	constructor(props){
		super(props);
		console.log(this.props);
	}


	renderAccion(){

	}

	render(){
		return(
		    <div>
			    {this.renderAccion()}
			</div>
	    );
	}
}


Log.PropTypes={
	acciones:PropTypes.object.isRequired
};


export default Log;