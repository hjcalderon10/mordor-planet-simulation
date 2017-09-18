import React, {Component} from "react";

import Alias from "./Alias.js";
import Planet from "./Planet.js";
import Log from "./Log.js";

class App extends Component{
  constructor(props){

    super(props);

    this.state={
      recursos:[],
      acciones:[],
      alias:"",
      entrando:true
    };
  }


  componentDidMount(){
    fetch("/estadoRecursos", {method:"GET", headers:{accept:"application/json"}})
    .then((res) =>{
      if (res.ok)
        return res.json();
    })
    .then((resp)=>{
      this.setState({
        /* Esta parte devuelve el estado actual. debería llamarse a cada instante... para mostrar los recursos actuales*/
        recursos:resp
      });
    });
  }


  bye = (al) => {
    this.setState({entrando: false});
  }


  render(){
    return(
      <div>
        {this.state.entrando ? <Alias bye={this.bye} /> : null}

        <Planet/>

        <Log acciones={this.state.acciones} alias={this.state.alias}/>

      </div>
      );
    }
  }


export default App;