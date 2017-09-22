import React, {Component} from "react";
import './Stylesheets/Alias.css';
import PanelAgregar from "./PanelAgregar.js";



export default class Opcion extends Component{
	
	constructor(props){
		super(props);
		this.state={
			abierto:false
		};
	}

	abrir = () =>{
		console.log("Abrir");
        this.setState({abierto: true});
    }  

	cerrar = (numero) =>{
		console.log("cerrar");
		this.props.agregarTrabajadores(numero,this.props.nombre);
        this.setState({abierto: false});
    }    

	render(){
		return(
			<div className="subPanel">
			    <div>
				    <img className="icono" src={this.props.imagen} alt={this.props.nombre + "icon"} onClick={this.abrir}/>
				    <p className="nombre">{this.props.nombre}</p>
			    </div>
                {this.state.abierto ? <PanelAgregar nombre={this.props.nombre} cerrar={this.cerrar}/> : null}
			</div>		
		);
	}


}