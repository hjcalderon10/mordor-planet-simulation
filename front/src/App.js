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

/*
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
    });
    this.setTimeover(this.actualizar(),20000);
  }
*/
  componentDidMount(){
    window.addEventListener('load', this.handleLoad);
  }

  handleLoad() {
    Promise.all([fetch("/estadoRecursos", {method:"GET", headers:{accept:"application/json"}}),fetch("/estadoAcciones", {method:"GET", headers:{accept:"application/json"}})]).then(values=>{
        var estadoRec = values[0];
        var estadoAcc = values[1];
        if(estadoRec.ok){
          estadoRec = estadoRec.json();
        }
        if(estadoAcc.ok){
          estadoAcc = estadoAcc.json();
        }
        this.setState({
          recursos:estadoRec,
          acciones:estadoAcc
        });
        this.setTimeover(this.handleLoad,20000);
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

      <Log acciones={this.state.acciones}/>
      <Recursos recursos={this.state.recursos}/>
      <Panel recursos = {this.state.recursos}/>
      <PanelOpciones/>
      </div>
      );
    }
  }


  export default App;