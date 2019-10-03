import React, { Component } from "react";

export default class Sort extends Component {
  constructor(props){
    super(props);
    this.sort=this.sort.bind(this);
  }
  sort(e){
    e.preventDefault();
    console.log("sort! was clicked")
    console.log(this.props);
  }
  render() {
    return <button className="sortbtn" onClick={this.sort}>Sort!</button>;
  }
}
