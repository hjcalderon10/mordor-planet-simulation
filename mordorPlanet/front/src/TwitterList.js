import React, {Component} from "react";

import Tweet from "./Tweet.js";


export default class TwitterList extends Component{
	
	constructor(props){
		super(props);
	}


renderTweets(){
	return this.props.tweets.map((t,i)=>{
		return <Tweet tweet= {t} key = {i}/>;
	});
}

	render(){
		return(
			<div>
			{this.renderTweets()}
			</div>
		);
	}
}