export function getBubbleSortAnimations(array) {
  const auxiliaryArray = array;
  const animations = bubbleSort(array, auxiliaryArray);  
  return animations;
}

function bubbleSort(array, auxiliaryArray) {  
  let animation = [];
  let len = auxiliaryArray.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i-1; j++) {
      animation.push([j, j + 1]);
      animation.push([j, j + 1]);
      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        animation.push({
          leftIdx: j,
          leftValue: auxiliaryArray[j],
          rightIdx: j + 1,
          rightValue: auxiliaryArray[j + 1]
        });
        let tmp = auxiliaryArray[j];
        auxiliaryArray[j] = auxiliaryArray[j + 1];
        auxiliaryArray[j + 1] = tmp;
      }
    }
  }
  return animation;
}
