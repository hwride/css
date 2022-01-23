main()

function main() {
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
  // Render table content for the first time.
  renderTableContent()

  // Register button to re-calculate the table values.
  document.querySelector('.re-calculate-values').addEventListener('click', renderTableContent);
}

function renderTableContent() {
  const tbody = document.querySelector('tbody')
  tbody.innerHTML = ''
  addRowExpression('document.documentElement.clientWidth')
  addRowExpression('document.documentElement.getBoundingClientRect().width')
  addRowExpression('window.innerWidth')
  addRowExpression('window.outerWidth')
  addRowExpression('document.documentElement.clientHeight')
  addRowExpression('document.documentElement.getBoundingClientRect().height')
  addRowExpression('window.innerHeight')
  addRowExpression('window.outerHeight')
  addRowKeyValue('(height: 100%).clientHeight', document.querySelector('.height100percent').clientHeight)
  addRowKeyValue('(height: 100vh).clientHeight', document.querySelector('.height100vh').clientHeight)
  addRowKeyValue('(fixed height: 100%).clientHeight', document.querySelector('.height100percent-fixed').clientHeight)
  addRowKeyValue('(fixed height: 100vh).clientHeight', document.querySelector('.height100vh-fixed').clientHeight)
}

function addRowExpression(expression) {
  addRowKeyValue(expression, eval(expression));
}

function addRowKeyValue(key, value) {
  const tbody = document.querySelector('tbody')
  const tr = document.createElement('tr')
  tr.innerHTML = `<tr>
    <td><code>${key}</code></td>
    <td><code>${value}</code></td>
  </tr>`
  tbody.appendChild(tr)
}
