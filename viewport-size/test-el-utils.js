export function updateElSizes() {
  updateElSize('.height100percent')
  updateElSize('.height100vh')
  updateElSize('.height100percent-fixed')
  updateElSize('.height100vh-fixed')
}

function updateElSize(selector) {
  const el = document.querySelector(selector)
  const newSize = el.clientHeight
  el.querySelector('.size').innerHTML = ` - ${newSize}px`
}
