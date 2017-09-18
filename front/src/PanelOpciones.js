import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Stylesheets/PanelOpciones.css";

class PanelOpciones extends Component{
	
	constructor(props){
		super(props);
	}

	render(){
		return(
		    <div className="panel" id="panelIndustria">
				<div className="subPanel">
					<img className="icono" src="%PUBLIC_URL%/images/alimentos.png" alt="alimentos pic boton"/>
					<p className="nombre">Alimentos</p>
				</div>		    	
				<div className="subPanel">
					<img className="icono" src="%PUBLIC_URL%/images/industria.png" alt="industria pic boton"/>
					<p className="nombre">Industria</p>
				</div>		    	
				<div className="subPanel">
					<img className="icono" src="%PUBLIC_URL%/images/investigacion.png" alt="investigacion pic boton"/>
					<p className="nombre">Investigacion</p>
				</div>		    	
				<div className="subPanel">
					<img className="icono" src="%PUBLIC_URL%/images/construccion.png" alt="construccion pic boton"/>
					<p className="nombre">Construccion</p>
				</div>		    	
			</div>
	    );
	}
}


export default PanelOpciones;