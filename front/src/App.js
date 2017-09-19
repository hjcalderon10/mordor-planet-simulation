import React, {Component} from "react";

import Alias from "./Alias.js";
import Planet from "./Planet.js";
import Log from "./Log.js";
import Recursos from "./Recursos.js";
import Panel from "./Panel.js";
import PanelOpciones from "./PanelOpciones.js";


class App extends Component{
  constructor(props){

    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.state={
      recursos:[],
      acciones:[],
      alias:"",
      entrando:true
    };
  }

  actualizar(){
    fetch("/estadoRecursos", {method:"GET", headers:{accept:"application/json"}})
    .then((res) =>{
      if (res.ok)
        return res.json();
    })
    .then((resp)=>{
      this.setState({
        recursos:resp
      });
      fetch("/estadoAcciones", {method:"GET", headers:{accept:"application/json"}})
      .then((res) =>{
        if (res.ok)
          return res.json();
      })
      .then((resp)=>{
        this.setState({
          acciones:resp
        });
        this.setTimeover(this.actualizar(),20000);
      });
    });
  }

  componentDidMount(){
    window.addEventListener('load', this.handleLoad);
  }

  handleLoad() {
    this.actualizar();
  }

  bye = (al) => {
    this.setState({entrando: false});
  }


  render(){
    return(
      <div>
      {this.state.entrando ? <Alias bye={this.bye} /> : null}

      <Planet/>

      <Log acciones={this.state.acciones}/>
      <Recursos recursos={this.state.recursos}/>
      <Panel recursos = {this.state.recursos}/>
      <PanelOpciones/>
      </div>
      );
    }
  }


  export default App;