const syncTextsMap = new Map()
const redVal = {visible: false}
const greenVal = {visible: false}
const blueVal = {visible: false}
syncTextsMap.set(document.querySelector('.red-sync-text'), redVal)
syncTextsMap.set(document.querySelector('.green-sync-text'), greenVal)
syncTextsMap.set(document.querySelector('.blue-sync-text'), blueVal)
let observer = new IntersectionObserver((entries) => {
  for(const entry of entries) {
    syncTextsMap.get(entry.target).visible = entry.isIntersecting;
  }

  // You could make this a bit more generic if you wanted to, but this is a simple test.
  let syncElClass
  if(blueVal.visible) {
    syncElClass = 'blue'
  } else if(greenVal.visible) {
    syncElClass = 'green'
  } else if(redVal.visible) {
    syncElClass = 'red'
  }
  console.log(`red: ${redVal.visible}, blue: ${blueVal.visible}, green: ${greenVal.visible}`)
  const syncEl = document.querySelector(".sync-el")
  syncEl.classList.remove('red', 'green', 'blue')
  if(syncElClass) {
    syncEl.classList.add(syncElClass)
  }
}, {
  root: document.querySelector(".example-scroll-effect"),
  rootMargin: '0px 0px -200px 0px',
  threshold: [0, 0.25, 0.5, 0.75, 1]
});
[...syncTextsMap.keys()].forEach(syncText => observer.observe(syncText))
