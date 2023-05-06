let previousEntry
let observer = new IntersectionObserver((entries) => {
  if(entries.length > 1) throw new Error('Only expected 1 entry but got: ' + entries.length)
  if(entries.length !== 1) return
  const entry = entries[0]

  const scrollDirection =
    (previousEntry &&
      (entry.boundingClientRect.top > previousEntry.boundingClientRect.top)) ?
    'up' :
    'down'
  let visibility
  if(entry.intersectionRatio === 1) visibility = 'full'
  else if(entry.intersectionRatio > 0.25) visibility = 'partial'
  else visibility = 'none'
  console.log('scrollDirection: ' + scrollDirection + ', visible: ' + visibility)

  let display
  if(visibility === 'none') {
    display = false
  } else if(visibility === 'full') {
    display = true
  } else if(visibility === 'partial') {
    const partialPosition = entry.boundingClientRect.top === entry.intersectionRect.top ? 'bottom' : 'top';
    if(scrollDirection === 'down') {
      display = partialPosition === 'bottom'
    } else {
      display = partialPosition === 'top'
    }
  }
  if(display) {
    entry.target.classList.add('visible')
  } else {
    entry.target.classList.remove('visible')
  }

  previousEntry = entry
}, {
  root: document.querySelector(".example-scroll-effect"),
  threshold: [0, 0.25, 0.5, 0.75, 1]
});
const animatedBlock = document.querySelector('.animated-block')
observer.observe(animatedBlock)
