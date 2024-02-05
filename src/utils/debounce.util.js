// ЗАМЫКАНИЕ
export function debounce(func, waitTime){
  let timeout;

  return function(...args){
    const later = () => {
      clearTimeout(timeout)
      func.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, waitTime)
  }
}