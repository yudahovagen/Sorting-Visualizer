import React, { Component } from "react";

export default class Array extends Component {
  render() {
    console.log(this.props.array[0]);
    return (
      <div className="arrayElement">
        <div
          style={{
            height: "188px",
            width: "158px",
            marginLeft: "10px",
            backgroundColor: "rgba(66, 134, 244, 0.8)",
            color: "white",
            fontSize: "20px",
            order: "0"
          }}>
          {this.props.array[0]}
        </div>
        <div
          style={{
            height: "458px",
            width: "158px",
            marginLeft: "10px",
            backgroundColor: "rgba(66, 134, 244, 0.8)",
            color: "white",
            fontSize: "20px",
            order: "1"
          }}>
          {this.props.array[1]}
        </div>
        <div
          style={{
            height: "294px",
            width: "158px",
            marginLeft: "10px",
            backgroundColor: "rgba(66, 134, 244, 0.8)",
            color: "white",
            fontSize: "20px",
            order: "2"
          }}>
          {this.props.array[2]}
        </div>
        <div
          style={{
            height: "246px",
            width: "158px",
            marginLeft: "10px",
            backgroundColor: "rgba(66, 134, 244, 0.8)",
            color: "white",
            fontSize: "20px",
            order: "3"
          }}>
          {this.props.array[3]}
        </div>
      </div>
    );
  }
}
