let observer = new IntersectionObserver((entries) => {
  for(const entry of entries) {
    if(entry.intersectionRatio > 0.25) {
      entry.target.classList.add('visible')
    } else {
      entry.target.classList.remove('visible')
    }
  }
}, {
  root: document.querySelector(".example-scroll-effect"),
  threshold: [0, 0.25, 0.5, 0.75, 1]
});
const animatedBlock = document.querySelector('.animated-block')
observer.observe(animatedBlock)
