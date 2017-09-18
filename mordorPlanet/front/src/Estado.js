mport React, {Component} from "react";
import PropTypes from "prop-types";


class Estado extends Component{
	constructor(props){
		super(props);
	}

	render(){
		console.log(this.props);
		console.log(this.props.recursos);
		return(<div>
				<div className="nombre">{this.props.recursos.nombre_recurso} </div>
				<div class="cantidad">{this.props.recursos.cantidad_recurso}</div>
				</div>
			);
	}
}

Estado.PropTypes={
	recursos:PropTypes.object.isRequired
};


export default Estado;