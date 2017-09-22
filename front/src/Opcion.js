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
		this.props.agregarTrabajadores(numero);
        this.setState({abierto: false});
    }    

	render(){
		return(
			<div className="subPanel" onClick={this.abrir}>
			    <div>
				    <img className="icono" src={this.props.imagen} alt={this.props.nombre + "icon"}/>
				    <p className="nombre">{this.props.nombre}</p>
			    </div>
                {this.state.abierto ? <PanelAgregar nombre={this.props.nombre} cerrar={this.cerrar}/> : null}
			</div>		
		);
	}


}