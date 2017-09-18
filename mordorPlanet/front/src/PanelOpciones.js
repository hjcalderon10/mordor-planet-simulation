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
					<img className="icono" src="https://github.com/hjcalderon10/hjcalderon10.github.io/blob/master/img/alimentos.png?raw=true" alt="alimentos pic boton"/>
					<p className="nombre">Alimentos</p>
				</div>		    	
				<div className="subPanel">
					<img className="icono" src="https://github.com/hjcalderon10/hjcalderon10.github.io/blob/master/img/industria.png?raw=true" alt="industria pic boton"/>
					<p className="nombre">Industria</p>
				</div>		    	
				<div className="subPanel">
					<img className="icono" src="https://github.com/hjcalderon10/hjcalderon10.github.io/blob/master/img/investigacion.png?raw=true" alt="investigacion pic boton"/>
					<p className="nombre">Investigacion</p>
				</div>		    	
				<div className="subPanel">
					<img className="icono" src="https://github.com/hjcalderon10/hjcalderon10.github.io/blob/master/img/construccion.png?raw=true" alt="construccion pic boton"/>
					<p className="nombre">Construccion</p>
				</div>		    	
			</div>
	    );
	}
}


export default PanelOpciones;