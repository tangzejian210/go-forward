
// 已知如下数组：
// var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
// 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

/*
 *@functionName: getAllItems
 *@params1: arr
 *@params2: set
 *@description: getAllItems利用递归和set对象的唯一性获取数组数据
 *@author: tangzejian
 *@date: 2021-06-07 21:37:22
 *@version: V1.0.0
*/
function getAllItems(arr, set = new Set()) {
  arr.forEach(e => {
    if(Array.isArray(e)) {
      set = getAllItems(e, set)
    } else {
      set.add(e)
    }
  })
  return set
}

let arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

let newArr = [...getAllItems(arr)]

newArr.sort((a, b) => {
  if(a < b) return -1
  if(a > b) return 1
  return 0
})

console.log(newArr)