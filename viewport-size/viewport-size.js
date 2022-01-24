import {initTable, renderTableContent} from './table-utils.js'
import {updateElSizes} from './test-el-utils.js';

main()

function main() {
  // Render table content for the first time.
  initTable()
  renderTableContent()

  // Register button to re-calculate the table values.
  document.querySelector('.re-calculate-values').addEventListener('click', renderTableContent);

  // Update values for the first time and on change.
  updateValues()
  document.addEventListener('scroll', updateValues)
  window.addEventListener('resize', updateValues)
}

function updateValues() {
  updateElSizes()
  const checkbox = document.querySelector('.dynamically-update-values')
  if(checkbox.checked) {
    renderTableContent()
  }
}
