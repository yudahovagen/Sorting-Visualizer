import React, { Component } from "react";
import BodyContainer from ".//bodycontainer/BodyContainer";
import Toolbar from ".//tooldbar/Toolbar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div id="app">
        <Toolbar></Toolbar>
        <BodyContainer id="bodyContainer"></BodyContainer>
      </div>
    );
  }
}
export default App;
