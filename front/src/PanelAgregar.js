import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Stylesheets/PanelAgregar.css";

class PanelAgregar extends Component{

	constructor(props){

        super(props);
        this.state={
            "numero":""
        };
    }
	
	handleChange = (event) => {
		this.setState({numero: event.target.value});
	}

	cerrar = () => {
		this.props.cerrar(this.state.numero);
	}	

	render(){
		return(
		    <div className="modalAgregar">
		        <div className="modalconent2">
		            <h4>{this.props.nombre}</h4>
                    <span className="boton"><i className="fa fa-plus" aria-hidden="true"></i></span>
                    <input type="text" onkeypress='return event.charCode >= 48 && event.charCode <= 57' placeholder="1"  onChange={this.handleChange}/>
                    <span className="boton"><i className="fa fa-minus" aria-hidden="true"></i></span>
                    <button onClick={this.cerrar} id="botonAgregar">OK</button>
		        </div>   	
			</div>
	    );
	}
}


export default PanelAgregar;