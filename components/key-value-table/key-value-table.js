export function createKeyValueTable({headers, rows}) {
  const table = createTable(headers)

  return {
    table,
    updateBody
  }

  function updateBody() {
    table.querySelector('tbody').innerHTML = rows
      .map(row => `<tr>${getRowContent(row)}</tr>`)
      .join('\n')
  }

  function getRowContent(rowConfig) {
    if(rowConfig.section) {
      return `<th colSpan='2'>${rowConfig.section}</th>`
    } else if(rowConfig.expression) {
      return getRowKeyValue(rowConfig.expression, eval(rowConfig.expression))
    } else if(rowConfig.key && rowConfig.getValue) {
      return getRowKeyValue(rowConfig.key, rowConfig.getValue())
    } else {
      console.error(`Unrecognised row config: %o`, rowConfig)
    }
  }

  function getRowKeyValue(key, value) {
    return `
  <td><code>${key}</code></td>
  <td><code>${value}</code></td>
`
  }
}

export function createTable(headers) {
  const table = document.createElement('table')
  table.innerHTML = `
${headers != null ? `<thead>
  <tr>
    ${headers.map(header => `<th>${header}</th>`)}
  </tr>
</thead>` : ''}
<tbody></tbody>
`
  return table
}
