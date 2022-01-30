import {createKeyValueTable} from '../components/key-value-table/key-value-table.js'

main()

function main() {
  const updateTable = createTable()
  initBoxSizingDropdown(updateTable)

  // For debugging
  window.updateTable = updateTable
  window.getTestEl = getTestEl
}

/** Table **/
function createTable() {
  const { table, updateBody } = createKeyValueTable({
    rows: [
      { section: 'General' },
      { key: 'getComputedStyle(el).box-sizing', getValue: () => getElStyle('box-sizing') },
      { key: 'getComputedStyle(el).margin', getValue: () => getElStyle('margin') },
      { key: 'getComputedStyle(el).borderWidth', getValue: () => getElStyle('borderWidth') },
      { key: 'getComputedStyle(el).padding', getValue: () => getElStyle('padding') },
      { key: 'getComputedStyle(el).width', getValue: () => getElStyle('width') },

      { section: 'Height' },
      { key: 'el.clientHeight', getValue: () => getTestEl().clientHeight },
      { key: 'el.getBoundingClientRect().height', getValue: () => getTestEl().getBoundingClientRect().height },

      { section: 'Width' },
      { key: 'el.clientWidth', getValue: () => getTestEl().clientWidth },
      { key: 'el.getBoundingClientRect().width', getValue: () => getTestEl().getBoundingClientRect().width },

      { section: 'Expressions' },
      {
        key: 'clientHeight + (border * 2) ~= rect.height',
        getValue: () => getTestEl().clientHeight + (getElStyleNoPx('borderWidth') * 2)
      },
      {
        key: 'clientWidth &nbsp;+ (border * 2) ~= rect.width',
        getValue: () => getTestEl().clientWidth + (getElStyleNoPx('borderWidth') * 2)
      },
    ]
  })
  document.querySelector('.info').appendChild(table)
  updateBody()
  return updateBody
}

function getElStyleNoPx(style) {
  return getElStyle(style).slice(0, -2)
}

function getElStyle(style) {
  return window.getComputedStyle(getTestEl())[style]
}

/** Box sizing dropdown **/
function initBoxSizingDropdown(onChange) {
  const dropdown = document.querySelector('.box-sizing-dropdown')
  dropdown.addEventListener('change', function(evt) {
    getTestEl().style.boxSizing = evt.target.value
    onChange()
  })
}

/** Utils **/
function getTestEl() {
  return document.querySelector('.test-el')
}
