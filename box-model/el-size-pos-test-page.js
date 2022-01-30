import {createKeyValueTable} from '../components/key-value-table/key-value-table.js'

main()

function main() {
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
        key: 'clientHeight + (border * 2)',
        getValue: () => getTestEl().clientHeight + (getElStyleNoPx('borderWidth') * 2)
      },
      {
        key: 'clientWidth + (border * 2)',
        getValue: () => getTestEl().clientWidth + (getElStyleNoPx('borderWidth') * 2)
      },
    ]
  })

  document.querySelector('.info').appendChild(table)

  updateBody()
}

function getTestEl() {
  return document.querySelector('.test-el')
}

function getElStyleNoPx(style) {
  return getElStyle(style).slice(0, -2)
}

function getElStyle(style) {
  return window.getComputedStyle(getTestEl())[style]
}