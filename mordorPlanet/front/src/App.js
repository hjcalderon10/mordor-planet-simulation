import React, {Component} from "react";

import MordorState from "./MordorState.js";
import SearchBox from "./SearchBox.js";


class App extends Component{
  constructor(props){
    super(props);
    this.state={
      estado:[]
    };
  }


  componentDidMount(){
    fetch("/estado", {method:"GET", headers:{accept:"application/json"}})
    .then((res) =>{
      if (res.ok)
        return res.json();
    })
    .then((estado)=>{
      this.setState({
        /* Esta parte devuelve el estado actual. debería llamarse a cada instante... para mostrar los recursos actuales*/
        estado:estado
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
      <MordorState estado={this.state.estado}/>

      </div>

      );
  }
}


export default App;