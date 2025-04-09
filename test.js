function debounce(fn, delay, immediate = false) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }

    if (!timer && immediate) {
      fn.apply(this, args)
    }
    timer = setTimeout(() => {
      if (!immediate) {
        fn.apply(this, args)
      }
      timer = null
    }, delay)
  }
}