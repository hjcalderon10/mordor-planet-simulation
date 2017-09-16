import React, {Component} from "react";

import TwitterList from "./TwitterList.js";
import SearchBox from "./SearchBox.js";


class App extends Component{
  constructor(props){
    super(props);
    this.state={
      tweets:[
      {},
      {},
      {},
      {},
      {}]
    };
  }

  render(){
    return(
      <div>
        <div>
        <h1>Tweets</h1>
          <SearchBox/>
        </div>
      <TwitterList tweets={this.state.tweets}/>

      </div>

      );
  }
}


export default App;