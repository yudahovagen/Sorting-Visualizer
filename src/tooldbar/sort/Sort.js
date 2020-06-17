import React, { Component } from "react";

export default class Sort extends Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
  }
  sort(e) {
    e.preventDefault();
  }
  render() {
    return (
      <button className="sortbtn" onClick={this.sort}>
        Sort!
      </button>
    );
  }
}
