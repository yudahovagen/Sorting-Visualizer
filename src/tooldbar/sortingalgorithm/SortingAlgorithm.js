import React, { Component } from "react";

export default class SortingAlgorithm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.mergeclicked = this.mergeclicked.bind(this);
    this.quickclicked = this.quickclicked.bind(this);
    this.heapclicked = this.heapclicked.bind(this);
    this.bubbleclicked = this.bubbleclicked.bind(this);
  }
  mergeclicked(){
    console.log("merge was clicked")
  }
  quickclicked(){
    console.log("quick was clicked")
  }
  heapclicked(){
    console.log("heap was clicked")
  }
  bubbleclicked(){
    console.log("mebubblerge was clicked")
  }

  showMenu(e) {
    e.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu(e) {
    if (!this.dropdownMenu.contains(e.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  }

  render() {
    return (
      <div className="dropdown">
        <button className="dropbtn" onClick={this.showMenu}>
          Sorting Algorithm
        </button>
        {this.state.showMenu ? (
          <div
            className="dropdown-content"
            ref={element => {
              this.dropdownMenu = element;
            }}>
            <a href="#MergeSort" onClick={this.mergeclicked}>MergeSort</a>
            <a href="#QuickSort" onClick={this.quickclicked}>QuickSort</a>
            <a href="#HeapSort" onClick={this.heapclicked}>HeapSort</a>
            <a href="#BubbleSort" onClick={this.bubbleclicked}>BubbleSort</a>
          </div>
        ) : null}
      </div>
    );
  }
}
