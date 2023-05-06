let previousEntry
let observer = new IntersectionObserver((entries) => {
  // You could make this work for multiple entries, but for this POC we will assume 1.
  if(entries.length > 1) throw new Error('Only expected 1 entry but got: ' + entries.length)
  if(entries.length !== 1) return

  const entry = entries[0]

  let elVisibility
  if(entry.intersectionRatio === 1) elVisibility = 'full'
  else if(entry.intersectionRatio > 0) elVisibility = 'partial'
  else elVisibility = 'none'

  let applyVisibleClass
  if(elVisibility === 'none') {
    applyVisibleClass = false
  } else if(elVisibility === 'full') {
    applyVisibleClass = true
  } else if(elVisibility === 'partial') {
    if(previousEntry == null) {
      // If we've loaded the page already partially selected so have not yet scrolled then previous entry will be null.
      // In this case err on the side of caution and make the element visible.
      applyVisibleClass = true;
    } else {
      // Otherwise decide whether to make the element visible according to whether the element is scrolling into or out
      // of view.
      const scrollDirection = entry.boundingClientRect.top > previousEntry.boundingClientRect.top ?
        'up' :
        'down';
      const atEdge = entry.boundingClientRect.top === entry.intersectionRect.top ? 'bottom' : 'top';

      const enteringOrLeaving =
        (scrollDirection === 'down' && atEdge === 'bottom') ||
        (scrollDirection === 'up' && atEdge === 'top') ?
          'entering' :
          'leaving'

      const intersectionRatioToUse = enteringOrLeaving === 'entering' ? 0.25 : 0.75;
      applyVisibleClass = entry.intersectionRatio > intersectionRatioToUse
    }
  }

  if(applyVisibleClass) {
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
