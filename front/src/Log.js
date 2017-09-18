import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Stylesheets/Log.css"

class Log extends Component{
	
	constructor(props){
		super(props);
	}


	renderAccion(){

		if(this.props.acciones.length !== 0){
		return this.props.acciones.map((t,i)=>{
			return (<div><span className="alias">{t.alias}:</span>
					<span className="mensaje">{t.evento}</span></div>);
		});
		}
		else{
			return <div></div>;
		}
	}

	render(){
		return(
		    <div className="log">
			    {this.renderAccion()}
			</div>
	    );
	}
}


Log.PropTypes={
	acciones:PropTypes.object.isRequired
};


export default Log;