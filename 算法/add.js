// 请实现一个 add 函数，满足以下功能。
// add(1); 			// 1
// add(1)(2);  	// 3
// add(1)(2)(3)；// 6
// add(1)(2, 3); // 6
// add(1, 2)(3); // 6
// add(1, 2, 3); // 6
function add() {
  let sum = 0
  compute =  function() {
    debugger
    let arg = Array.from(arguments)
    arg.forEach(e => {
      sum+= e
    })
    console.log(sum)
  }
  let arg = Array.from(arguments)
  compute(...arg)
  return compute
}

// add(1)
// add(1)(2)
add(1)(2)(3)