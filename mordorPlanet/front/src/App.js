import React, {Component} from "react";

import MordorState from "./MordorState.js";
import SearchBox from "./SearchBox.js";


class App extends Component{
  constructor(props){
    super(props);
    this.state={
      recursos:[]
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

  render(){
    return(
      <div>
      <div>
      <h1>Estado de Mordor</h1>
      <SearchBox/>
      </div>
      <MordorState recursos={this.state.recursos}/>

      </div>

      );
    }
  }


  export default App;