function jsonp (url, params, callback) {
  const generate = () => {
    let urlParams = ''
    for(let key in params) {
      urlParams += `${key}=${params[key]}&`
    }
    urlParams += `callback=${callback}`
    return `${url}?${urlParams}`
  }
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.src = generate()
    document.body.appendChild(script)
    window[callback] = (data) => {
      resolve(data)
      document.body.removeChild(script)
    }
  })
}