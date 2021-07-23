const quickSort = (arr) => {
  quick(arr, 0, arr.length - 1)
}

const quick = (arr, left, right) => {
  if(left < right) {
    let index = partition(arr, left, right)
    quick(arr, left, index - 1)
    quick(arr, index, right)
  }
}

const partition = (arr, left, right) => {
  let datum = arr[Math.floor(Math.random() * (right - left + 1)) + left]
  let i = left
  let j = right
  while(i <= j) {
    while(arr[i] < datum) {
      i++
    }
    while(arr[j] > datum) {
      j--
    }
    if(i <= j) {
      swap(arr, i, j)
      i++
      j--
    }
  }
  return i
}

const swap = (arr, i, j) => {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

// 测试
let arr = [1, 3, 2, 5, 4, 8, 0, 23, 12]
quickSort(arr)
console.log(arr)