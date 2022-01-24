import {initTable, renderTableContent} from './table-utils.js'
import {updateElSizes} from './test-el-utils.js';

const eventsFired = {
  scroll: 0,
  resize: 0,
  vvScroll: 0,
  vvResize: 0,
}

main()

function main() {
  // Render table content for the first time.
  initTable()
  renderTableContent()

  // Register button to re-calculate the table values.
  document.querySelector('.re-calculate-values').addEventListener('click', renderTableContent)

  // Update values for the first time and on change.
  updateValues()
  document.addEventListener('scroll', updateValues.bind(null, 'scroll'))
  window.addEventListener('resize', updateValues.bind(null, 'resize'))
  window.visualViewport.addEventListener('scroll', updateValues.bind(null, 'vvScroll'))
  window.visualViewport.addEventListener('resize', updateValues.bind(null, 'vvResize'))
}

function updateValues(evtName) {
  updateElSizes()
  const checkbox = document.querySelector('.dynamically-update-values')
  if(checkbox.checked) {
    renderTableContent()
  }

  // If an event fired log it.
  if(evtName) {
    eventsFired[evtName] += 1;
    document.querySelector('.scroll-events-count').innerHTML = eventsFired.scroll;
    document.querySelector('.resize-events-count').innerHTML = eventsFired.resize;
    document.querySelector('.vv-scroll-events-count').innerHTML = eventsFired.vvScroll;
    document.querySelector('.vv-resize-events-count').innerHTML = eventsFired.vvResize;
  }
}
