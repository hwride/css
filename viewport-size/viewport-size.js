import {initTable, renderTableContent} from './table-utils.js'
import {updateElSizes} from './test-el-utils.js';

const eventsFired = {
  resize: 0,
  scroll: 0,
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
  document.addEventListener('scroll', updateValues)
  window.addEventListener('resize', updateValues)
}

function updateValues(evt) {
  updateElSizes()
  const checkbox = document.querySelector('.dynamically-update-values')
  if(checkbox.checked) {
    renderTableContent()
  }

  // If an event fired log it.
  if(evt) {
    eventsFired[evt.type] = eventsFired[evt.type] != null ? eventsFired[evt.type] + 1 : 1;
    document.querySelector('.resize-events-count').innerHTML = eventsFired.resize;
    document.querySelector('.scroll-events-count').innerHTML = eventsFired.scroll;
  }
  console.log(eventsFired);
}
