import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Stylesheets/Panel.css";

class Panel extends Component{
	
	constructor(props){
		super(props);
	}


	renderAccion(){

		if(this.props.recursos.length !== 0){
			return (<div className="recursos">
					<div className="recurso">
						<span>{this.props.recursos[4].nombre_recurso}:</span>      
						<span>{Math.floor(this.props.recursos[4].cantidad_recurso)}</span>
						<span className="fa fa-arrow-up"></span>
					</div>
					<div className="recurso">
						<span>{this.props.recursos[5].nombre_recurso}:</span>      
						<span>{Math.floor(this.props.recursos[5].cantidad_recurso)}</span>
						<span className="fa fa-arrow-up"></span>
					</div>
					<div className="recurso">
						<span>{this.props.recursos[1].nombre_recurso}:</span>      
						<span>{Math.floor(this.props.recursos[1].cantidad_recurso)}</span>
						<span className="fa fa-arrow-up"></span>
					</div>
					<div className="recurso">
						<span>{this.props.recursos[2].nombre_recurso}:</span>      
						<span>{Math.floor(this.props.recursos[2].cantidad_recurso)}</span>
						<span className="fa fa-arrow-up"></span>
					</div>

				</div>);
		}
		else{
			return <div></div>;
		}
	}

	render(){
		return(
		    <div className="panel" id="panelRecursos">
		    	<div className="header">
		    		<div className="headerItem nombre"><span>Panel de Recursos</span></div>
		    		<div className="headerItem" id="cierrePanel"> <span className="fa fa-window-maximize"></span></div>
		    	</div>
		    	<div className="content" id="contenidoRecursos">
		    		{this.renderAccion()}
		    	</div>
			</div>
	    );
	}
}


Panel.PropTypes={
	recursos:PropTypes.object.isRequired
};


export default Panel;