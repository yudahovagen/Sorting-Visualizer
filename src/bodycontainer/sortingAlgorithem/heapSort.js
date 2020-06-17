export function getHeapSortAnimations(array) {
  const auxiliaryArray = array;
  let animationHelper = [];  
  const animations = heapSortHelper(auxiliaryArray, animationHelper);
  return animations;
}
function heapSortHelper(array, animation) {  
  return heapSort(array, animation)[1];
  //we have 2 steps:
  //create a max heap
  //swap first and last node (first is the greatest element in the array)
}
function heapSort(arr, animation) {
  let length = arr.length;
  let i = Math.floor(length / 2 - 1);
  let k = length - 1;

  while (i >= 0) {
    heapify(arr, length, i, animation);
    i--;
  }
  while (k >= 0) {
    animation.push({
      indexA: 0,
      valueA: arr[0],
      indexB: k,
      valueB: arr[k],
      heapSort: 1
    });
    [arr[0], arr[k]] = [arr[k], arr[0]];
    heapify(arr, k, 0, animation);
    k--;
  }
  return [arr, animation];
}
function heapify(arr, length, i, animation) {
  let largest = i;
  let left = i * 2 + 1;
  let right = left + 1;

  if (left < length-1 && arr[left] > arr[largest]) {
    animation.push([largest, left, right]);
    animation.push([largest, left, right]);
    largest = left;
    animation.push([largest, left, right]);
    animation.push([largest, left, right]);
  }
  if (right < length && arr[right] > arr[largest]) {
    animation.push([largest, left, right]);
    animation.push([largest, left, right]);
    largest = right;
    animation.push([largest, left, right]);
    animation.push([largest, left, right]);
  }
  if (largest !== i) {
    animation.push({
      indexA: i,
      valueA: arr[i],
      indexB: largest,
      valueB: arr[largest]
    });
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, length, largest, animation);
  }
  return arr;
}
