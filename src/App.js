import React, { Component } from "react";
import BodyContainer from ".//bodycontainer/BodyContainer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div id="app">        
        <BodyContainer id="bodyContainer"></BodyContainer>
      </div>
    );
  }
}
export default App;
