import {addRowSection, addRowKeyValue, addRowExpression} from './util.js'

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

function initTable() {
  const propTable = document.querySelector('.prop-table')
  propTable.innerHTML = `
<thead>
  <tr>
    <th>Property</th>
    <th>Value</th>
  </tr>
</thead>
<tbody></tbody>
`
}

function renderTableContent() {
  const tbody = document.querySelector('tbody')
  tbody.innerHTML = ''
  addRowSection('Width')
  addRowExpression('document.documentElement.clientWidth')
  addRowExpression('window.visualViewport.width')
  addRowExpression('window.innerWidth')
  addRowExpression('window.outerWidth')

  addRowSection('Height')
  addRowExpression('document.documentElement.clientHeight')
  addRowExpression('window.visualViewport.height')
  addRowExpression('window.innerHeight')
  addRowExpression('window.outerHeight')
  addRowKeyValue('(height: 100%).clientHeight', document.querySelector('.height100percent').clientHeight)
  addRowKeyValue('(height: 100vh).clientHeight', document.querySelector('.height100vh').clientHeight)
  addRowKeyValue('(fixed height: 100%).clientHeight', document.querySelector('.height100percent-fixed').clientHeight)
  addRowKeyValue('(fixed height: 100vh).clientHeight', document.querySelector('.height100vh-fixed').clientHeight)
}

function updateValues() {
  updateElSizes()
  const checkbox = document.querySelector('.dynamically-update-values')
  if(checkbox.checked) {
    renderTableContent()
  }
}

function updateElSizes() {
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
