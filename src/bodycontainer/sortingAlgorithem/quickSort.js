export function getQuickSortAnimations(array) {
  let auxiliaryArray = [];
  let resultArray = [];
  const animations = quickSort(
    array,
    0,
    array.length - 1,
    auxiliaryArray,
    resultArray
  );

  return animations.flat(); //flatting all the subarries to a single one
}

function quickSort(items, left, right, auxiliaryArray, resultArray) {
  let index;
  let animations = [];
  //we only compare if we have more than 1 element in the subArray
  if (right - left >= 1) {    
    //pivot index and animation
    [index, auxiliaryArray] = partition(items, left, right, animations); 
    //modifing the animation and pushing it to the returned array
    resultArray.push(quickSortHelper(auxiliaryArray));
    if (left < index - 1) {
      //elements on the left side of the pivot
      quickSort(items, left, index - 1, auxiliaryArray, resultArray);
    }
    if (index + 1 < right) {
      //elements on the right side of the pivot
      quickSort(items, index + 1, right, auxiliaryArray, resultArray);
    }
  }
  return resultArray;
}

function partition(items, left, right, animations) {
  let pivotIdx = Math.floor((right + left) / 2);
  let pivot = items[Math.floor((right + left) / 2)],
    i = left,
    j = right;
  animations.push({ idx: pivotIdx, value: pivot });
  while (i <= j) {
    //adding evaluation index next to the index
    while (items[i] < pivot) {
      animations.push([i, -1]);
      //-1 : left index
      i++;
    }
    if (items[i] >= pivot) {
      animations.push([i, -10]);
      //-10 : stopping point of left index
    }
    while (items[j] > pivot) {
      animations.push([j, -2]);
      //-2 : left index
      j--;
    }
    if (items[j] <= pivot) {
      animations.push([j, -20]);
      //-20 : stopping point of right index
    }
    if (i <= j) {
      //check if the swaped index are pivot indexs
      if (i === j) {        
        animations.push(-5);
        //-5: end of current partition
        return [i, animations];
      } else if (i === pivotIdx) {
        animations.push({
          leftIdx: i,
          leftValue: items[i],
          rightIdx: j,
          rightValue: items[j]
        });
        swap(items, i, j);
        //update pivot index
        pivotIdx = j;
        //update index
        i++;
      } else if (j === pivotIdx) {
        animations.push({
          leftIdx: i,
          leftValue: items[i],
          rightIdx: j,
          rightValue: items[j]
        });
        swap(items, i, j);
        //update pivot index
        pivotIdx = i;
        //update index
        j--;
      } else {
        animations.push({
          leftIdx: i,
          leftValue: items[i],
          rightIdx: j,
          rightValue: items[j]
        });
        swap(items, i, j);
        //update index
        i++;
        j--;
      }
    }
  }
}

function quickSortHelper(animations) {
  //get an array with a pivot, i, j, swap continuesly and -5 as the end
  let tmp = magician(animations);
  return tmp;
}

function swap(array, left, right) {
  //swaping 2 array elements
  let tmp = array[left];
  array[left] = array[right];
  array[right] = tmp;
}

function magician(array) {
  let tmp = [];
  let result = [];
  array.forEach(e => {
    if (e[1] === -1 || e[1] === -10 || e[1] === -2 || e[1] === -20) {
      //push left or right index to tmp
      tmp.push(e);
    } else {
      //call magic function with the current result
      magic(tmp).forEach(e => {
        //pushing modified tmp to result
        result.push(e);
      });
      //-5 case
      result.push(e);
      //reseting tmp
      tmp = [];
    }
  });
  return result;
}

function magic(array) {
  //takes all the index and modify them that left will be next to right
  //pushing twice, once for coloring and second for resetting color
  let left = array.filter(e => e[1] === -1 || e[1] === -10);
  let right = array.filter(e => e[1] === -2 || e[1] === -20);
  let toggle = 1 ? left.length > right.length : 0;
  let result = [];
  if (toggle) {//left array bigger
    for (let i = 0; i < left.length; i++) {
      if (!right[i]) {//i exceded the end of the right array
        result.push([left[i][0], right[right.length - 1][0]]);
        result.push([left[i][0], right[right.length - 1][0]]);
      } else {//there is a value in the right array
        result.push([left[i][0], right[i][0]]);
        result.push([left[i][0], right[i][0]]);
      }
    }
  } else {//right array bigger
    for (let i = 0; i < right.length; i++) {
      if (!left[i]) {//i exceded the end of the left array
        result.push([left[left.length - 1][0], right[i][0]]);
        result.push([left[left.length - 1][0], right[i][0]]);
      } else {//there is a value in the left array
        result.push([left[i][0], right[i][0]]);
        result.push([left[i][0], right[i][0]]);
      }
    }
  }
  return result;
}
