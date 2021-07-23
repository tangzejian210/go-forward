// promise
function sleep(wait) {
  return new Promise(()=>{
    setTimeout(resolve, wait)
  })
}
sleep(1000).then(() => {})


// while
function sleep(wait) {
  let now = new Date()
  while(new Date() - now < wait) {}
  console.log('结束sleep')
  return
}