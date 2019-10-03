import React from "react";
import Array from "./Array";

function mergeSort(array) {
  let half = array.length / 2;
  if (array.length < 2) {
    return array;
  }
  const left = array.splice(0, half);
  return merger(mergeSort(left), mergeSort(array));
}
function merger(left, right) {
  const arr = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }
  return [...arr, ...left, ...right];
}
console.log(mergeSort([44,179,97,73,88,151,200]))

export default function BodyContainer() {
  const arr = [44, 179, 97, 73];
  return <Array array={arr} />;
}
