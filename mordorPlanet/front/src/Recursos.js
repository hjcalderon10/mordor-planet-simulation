import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Stylesheets/Recursos.css";

class Recursos extends Component{
	
	constructor(props){
		super(props);
	}


	renderAccion(){

		if(this.props.recursos.length !== 0){
			return (<div>
					<div className="recursoImportante" id="bienes"> <span>{this.props.recursos[3].nombre_recurso}</span> : <span>{Math.floor(this.props.recursos[3].cantidad_recurso)}</span> </div>
					<div className="recursoImportante" id="poblacion"> <span>{this.props.recursos[0].nombre_recurso}</span> : <span>{Math.floor(this.props.recursos[0].cantidad_recurso)}</span> </div>
				</div>);
		}
		else{
			return <div></div>;
		}
	}

	render(){
		return(
		    <div className="recursosImportantes">
			    {this.renderAccion()}
			</div>
	    );
	}
}


Recursos.PropTypes={
	recursos:PropTypes.object.isRequired
};


export default Recursos;