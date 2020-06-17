import React, { Component } from "react";

import GenerateArray from ".//generatearray/GenerateArray";
import ArraySize from ".//arraysize/ArraySize";

import Sort from ".//sort/Sort";

export default class Toolbar extends Component {
  render() {
    return (
      <div className="toolbar bg-primary">
        <GenerateArray className="generateArray"></GenerateArray>
        <ArraySize className="arraySize"></ArraySize>
        
        <Sort className="sort"></Sort>
      </div>
    );
  }
}
