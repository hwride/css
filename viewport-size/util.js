export function addRowExpression(expression) {
  addRowKeyValue(expression, eval(expression));
}

export function addRowKeyValue(key, value) {
  addRow(`
  <td><code>${key}</code></td>
  <td><code>${value}</code></td>
`);
}

export function addRowSection(title) {
  addRow(`<th colSpan='2'>${title}</th>`);
}

export function addRow(content) {
  const tbody = document.querySelector('tbody')
  const tr = document.createElement('tr')
  tr.innerHTML = `<tr>
  ${content}
</tr>`;
  tbody.appendChild(tr)
}
