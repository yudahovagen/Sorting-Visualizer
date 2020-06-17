import React from "react";
import "./BodyContainer.css";
import { getMergeSortAnimations } from "./sortingAlgorithem/mergeSort";
import { getQuickSortAnimations } from "./sortingAlgorithem/quickSort";
import { getHeapSortAnimations } from "./sortingAlgorithem/heapSort";
import { getBubbleSortAnimations } from "./sortingAlgorithem/bubbleSort";

const ARRAY_BARS_HEIGHT = 350;
const PRIMARY_COLOR = "ForestGreen";
const SECONDARY_COLOR = "Red";
const PIVOT_COLOR = "DarkBlue";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      arraySize: 50,
      sortingSpeed: 5
    };
    //in oreder to disable the buttons while the visualization process is on going we use reference
    this.resetRef = React.createRef();
    this.mergeRef = React.createRef();
    this.quickRef = React.createRef();
    this.heapRef = React.createRef();
    this.bubbleRef = React.createRef();
    this.sizeRef = React.createRef();
    this.speedRef = React.createRef();
  }
  componentDidMount() {
    this.resetArray();
  }
  //get a new array
  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.arraySize; i++) {
      array.push(randomIntFromInterval(5, ARRAY_BARS_HEIGHT)); //bars height
    }
    this.setState({ array });
  }
  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2; //0,1,!,0,1,!...
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.sortingSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.sortingSpeed);
      }
    }
    this.resetRef.current.disabled = true;
    this.mergeRef.current.disabled = true;
    this.quickRef.current.disabled = true;
    this.heapRef.current.disabled = true;
    this.bubbleRef.current.disabled = true;
    this.sizeRef.current.disabled = true;
    this.speedRef.current.disabled = true;
    setTimeout(() => {
      this.resetRef.current.disabled = false;
      this.mergeRef.current.disabled = false;
      this.quickRef.current.disabled = false;
      this.heapRef.current.disabled = false;
      this.bubbleRef.current.disabled = false;
      this.sizeRef.current.disabled = false;
      this.speedRef.current.disabled = false;
    }, (this.state.sortingSpeed + 1) * animations.length);
  }
  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    let toggle = 0; //influence bar color primary or secondery
    let pivotBarIdx; //has the current pivot bar index, needed for reseting the color to primary
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      if (animations[i].value) {
        //pivot world
        pivotBarIdx = animations[i].idx;
        const pivotBarStyle = arrayBars[pivotBarIdx].style;
        setTimeout(() => {
          pivotBarStyle.backgroundColor = PIVOT_COLOR;
        }, i * this.state.sortingSpeed);
      } else if (animations[i].leftValue) {
        //swap world
        const leftBarIdx = animations[i].leftIdx,
          rightBarIdx = animations[i].rightIdx;
        const leftBarStyle = arrayBars[leftBarIdx].style;
        const rightBarStyle = arrayBars[rightBarIdx].style;
        setTimeout(() => {
          leftBarStyle.height = `${animations[i].rightValue}px`;
          rightBarStyle.height = `${animations[i].leftValue}px`;
        }, i * this.state.sortingSpeed);
      } else if (animations[i] === -5) {
        //reset pivot
        const PivotBarStyle = arrayBars[pivotBarIdx].style;
        setTimeout(() => {
          PivotBarStyle.backgroundColor = PRIMARY_COLOR;
        }, i * this.state.sortingSpeed);
      } else {
        //index world
        const color = toggle === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [leftBarIdx, rightBarIdx] = animations[i];
        const leftBarStyle = arrayBars[leftBarIdx].style;
        const rightBarStyle = arrayBars[rightBarIdx].style;
        setTimeout(() => {
          leftBarStyle.backgroundColor = color;
          rightBarStyle.backgroundColor = color;
        }, i * this.state.sortingSpeed);
        if (toggle === 0) {
          toggle = 1;
        } else {
          toggle = 0;
        }
      }
    }
    this.resetRef.current.disabled = true;
    this.mergeRef.current.disabled = true;
    this.quickRef.current.disabled = true;
    this.heapRef.current.disabled = true;
    this.bubbleRef.current.disabled = true;
    this.sizeRef.current.disabled = true;
    this.speedRef.current.disabled = true;
    setTimeout(() => {
      this.resetRef.current.disabled = false;
      this.mergeRef.current.disabled = false;
      this.quickRef.current.disabled = false;
      this.heapRef.current.disabled = false;
      this.bubbleRef.current.disabled = false;
      this.sizeRef.current.disabled = false;
      this.speedRef.current.disabled = false;
    }, (this.state.sortingSpeed + 1) * animations.length);
  }
  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    let toggle = 0;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      if (animations[i].valueA) {
        //swap
        if (animations[i].indexA !== animations[i].indexB) {
          const BarA = animations[i].indexA,
            BarB = animations[i].indexB;
          const BarAStyle = arrayBars[BarA].style;
          const BarBStyle = arrayBars[BarB].style;
          setTimeout(() => {
            BarAStyle.height = `${animations[i].valueB}px`;
            BarBStyle.height = `${animations[i].valueA}px`;
          }, i * this.state.sortingSpeed);
        }
      } else {
        //index
        const color = toggle === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        //we need to see if there are 2 bars to color or 3 bars to color
        //we wont include the color and the toggle variables inside it
        //animations[i] = [largest,left,right]
        //if largest == left or right
        if (
          animations[i][0] === animations[i][1] ||
          animations[i][0] === animations[i][2]
        ) {
          //2 bars
          const [bar2Idx, bar3Idx] = [animations[i][1], animations[i][2]];
          const bar2Style = arrayBars[bar2Idx].style;
          const bar3Style = arrayBars[bar3Idx].style;
          setTimeout(() => {
            bar2Style.backgroundColor = color;
            bar3Style.backgroundColor = color;
          }, i * this.state.sortingSpeed);
        } else {
          //3 bars
          const [bar1Idx, bar2Idx, bar3Idx] = animations[i];
          const bar1Style = arrayBars[bar1Idx].style;
          const bar2Style = arrayBars[bar2Idx].style;
          const bar3Style = arrayBars[bar3Idx].style;
          setTimeout(() => {
            bar1Style.backgroundColor = color;
            bar2Style.backgroundColor = color;
            bar3Style.backgroundColor = color;
          }, i * this.state.sortingSpeed);
        }
        if (toggle === 0) {
          toggle = 1;
        } else {
          toggle = 0;
        }
      }
    }
    this.resetRef.current.disabled = true;
    this.mergeRef.current.disabled = true;
    this.quickRef.current.disabled = true;
    this.heapRef.current.disabled = true;
    this.bubbleRef.current.disabled = true;
    this.sizeRef.current.disabled = true;
    this.speedRef.current.disabled = true;
    setTimeout(() => {
      this.resetRef.current.disabled = false;
      this.mergeRef.current.disabled = false;
      this.quickRef.current.disabled = false;
      this.heapRef.current.disabled = false;
      this.bubbleRef.current.disabled = false;
      this.sizeRef.current.disabled = false;
      this.speedRef.current.disabled = false;
    }, (this.state.sortingSpeed + 1) * animations.length);
  }
  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    let toggle = 0;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      if (animations[i].leftValue) {
        //swap
        const leftBarIdx = animations[i].leftIdx,
          rightBarIdx = animations[i].rightIdx;
        const leftBarStyle = arrayBars[leftBarIdx].style;
        const rightBarStyle = arrayBars[rightBarIdx].style;
        setTimeout(() => {
          leftBarStyle.height = `${animations[i].rightValue}px`;
          rightBarStyle.height = `${animations[i].leftValue}px`;
        }, i * this.state.sortingSpeed);
      } else {
        //index
        const color = toggle === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [leftBarIdx, rightBarIdx] = animations[i];
        const leftBarStyle = arrayBars[leftBarIdx].style;
        const rightBarStyle = arrayBars[rightBarIdx].style;
        setTimeout(() => {
          leftBarStyle.backgroundColor = color;
          rightBarStyle.backgroundColor = color;
        }, i * this.state.sortingSpeed);
        if (toggle === 0) {
          toggle = 1;
        } else {
          toggle = 0;
        }
      }
    }
    this.resetRef.current.disabled = true;
    this.mergeRef.current.disabled = true;
    this.quickRef.current.disabled = true;
    this.heapRef.current.disabled = true;
    this.bubbleRef.current.disabled = true;
    this.sizeRef.current.disabled = true;
    this.speedRef.current.disabled = true;
    setTimeout(() => {
      this.resetRef.current.disabled = false;
      this.mergeRef.current.disabled = false;
      this.quickRef.current.disabled = false;
      this.heapRef.current.disabled = false;
      this.bubbleRef.current.disabled = false;
      this.sizeRef.current.disabled = false;
      this.speedRef.current.disabled = false;
    }, (this.state.sortingSpeed + 1) * animations.length);
  }
  handleSizeChange = e =>
    this.setState({ arraySize: e.target.value }, this.resetArray);
  handleSpeedChange = e => this.setState({ sortingSpeed: e.target.value });
  render() {
    const { array } = this.state;
    return (
      <div>
        <div className="navbar">
          <button
            ref={this.resetRef}
            disabled={false}
            onClick={() => this.resetArray()}>
            Generate New Array
          </button>
          <button
            ref={this.mergeRef}
            disabled={false}
            onClick={() => this.mergeSort()}>
            Merge Sort
          </button>
          <button
            ref={this.quickRef}
            disabled={false}
            onClick={() => this.quickSort()}>
            Quick Sort
          </button>
          <button
            ref={this.heapRef}
            disabled={false}
            onClick={() => this.heapSort()}>
            Heap Sort
          </button>
          <button
            ref={this.bubbleRef}
            disabled={false}
            onClick={() => this.bubbleSort()}>
            Bubble Sort
          </button>
          <br></br>
          <label htmlFor="changeArraySize" className="input">
            Change Array Size:
          </label>
          <input
            ref={this.sizeRef}
            disabled={false}
            type="range"
            min="3"
            max="150"
            value={this.state.arraySize}
            step="1"
            onChange={this.handleSizeChange}
          />
          <label htmlFor="changeSortingSpeed" className="input">
            Change Sorting Speed:
          </label>
          <input
            ref={this.speedRef}
            disabled={false}
            type="range"
            min="5"
            max="500"
            value={this.state.sortingSpeed}
            step="5"
            onChange={this.handleSpeedChange}
          />
        </div>
        <div className="array-container" style={{ height: 310 }}>
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`
              }}></div>
          ))}
        </div>
      </div>
    );
  }
}
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
