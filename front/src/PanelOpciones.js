import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Stylesheets/PanelOpciones.css";
import Opcion from "./Opcion.js";


class PanelOpciones extends Component{

	constructor(props){

        super(props);
        this.state={
            opciones:[
                {
                	"nombre":"Alimenos",
                	"images":'../images/alimentos.png'
                },
                 {
                	"nombre":"Industria",
                	"images":'../images/industria.png'
                },
                {
                	"nombre":"Investigacion",
                	"images":'../images/investigacion.png'
                },
                {
                	"nombre":"Construccion",
                	"images":'../images/construccion.png'
                }                                               
            ]
        };
    }

    agregarTrabajadores = (numero, nombre) =>{
        this.props.agregarTrabajadores(numero, nombre);
    }    

	renderOpciones(){
        return this.state.opciones.map((t,i)=>{
            return (
                <Opcion key={i} nombre={t.nombre} imagen={t.images} agregarTrabajadores={this.agregarTrabajadores}/>
            );
        });
    }


	render(){
		return(
		    <div className="panel" id="panelIndustria">
		       {this.renderOpciones()}	    	
			</div>
	    );
	}
}


export default PanelOpciones;