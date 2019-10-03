import React, { Component } from "react";

export default class ArraySize extends Component {
  render() {
    return (
      <div>
        <div>Change Array Size & Sorting Speed</div>
        <input id="changeSize" type="range" min="0" max="100"></input>
      </div>
    );
  }
}
