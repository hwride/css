export function initTable() {
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

export function renderTableContent() {
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

function addRowExpression(expression) {
  addRowKeyValue(expression, eval(expression));
}

function addRowKeyValue(key, value) {
  addRow(`
  <td><code>${key}</code></td>
  <td><code>${value}</code></td>
`);
}

function addRowSection(title) {
  addRow(`<th colSpan='2'>${title}</th>`);
}

function addRow(content) {
  const tbody = document.querySelector('tbody')
  const tr = document.createElement('tr')
  tr.innerHTML = `<tr>
  ${content}
</tr>`;
  tbody.appendChild(tr)
}
