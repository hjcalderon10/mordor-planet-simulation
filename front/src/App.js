import React, {Component} from "react";

import Alias from "./Alias.js";
import Planet from "./Planet.js";
import Log from "./Log.js";
import Recursos from "./Recursos.js";
import Panel from "./Panel.js";
import PanelOpciones from "./PanelOpciones.js";


class App extends Component{
  constructor(props){
    console.log("entra");
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
    Promise.all([
      fetch("/estadoRecursos", {method:"GET", headers:{accept:"application/json"}}).then((resp=>{
        if(resp.ok)
          return resp.json();
      }))
      ,
      fetch("/estadoAcciones", {method:"GET", headers:{accept:"application/json"}}).then((resp=>{
        if(resp.ok)
          return resp.json();
      }))
      ]).then(values=>{
        var estadoRec = values[0];
        var estadoAcc = values[1];
        this.setState({
          recursos:estadoRec,
          acciones:estadoAcc
        });
        window.setTimeout(this.handleLoad,20000);
      });
    }

    bye = (al) => {
      this.setState({entrando: false});
    }

    agregarTrabajadores = (numero) =>{
      console.log(numero);
    }    

    render(){
      return(
        <div>
        {this.state.entrando ? <Alias bye={this.bye} /> : null}

        <Planet/>

        <Log acciones={this.state.acciones}/>
        <Recursos recursos={this.state.recursos}/>
        <Panel recursos = {this.state.recursos}/>
        <PanelOpciones agregarTrabajadores={this.agregarTrabajadores}/>
        </div>
        );
      }
    }


    export default App;