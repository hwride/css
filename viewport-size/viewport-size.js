import {updateElSizes} from './test-el-utils.js'
import { createKeyValueTable } from '../components/key-value-table/key-value-table.js'

const eventsFired = {
  scroll: 0,
  resize: 0,
  vvScroll: 0,
  vvResize: 0,
}

main()

function main() {
  // Render table content for the first time.
  const { table, updateBody } = createKeyValueTable({
    rows: [
      { section: 'Width' },
      { expression: 'document.documentElement.clientWidth' },
      { expression: 'window.visualViewport.width' },
      { expression: 'window.visualViewport.offsetLeft' },
      { expression: 'window.visualViewport.pageLeft' },
      { expression: 'window.innerWidth' },
      { expression: 'window.outerWidth' },

      { section: 'Height' },
      { expression: 'document.documentElement.clientHeight' },
      { expression: 'window.visualViewport.height' },
      { expression: 'window.visualViewport.offsetTop' },
      { expression: 'window.visualViewport.pageTop' },
      { expression: 'window.visualViewport.scale' },
      { expression: 'window.innerHeight' },
      { expression: 'window.outerHeight' },
      { key: '(height: 100%).clientHeight' , getValue: () => document.querySelector('.height100percent').clientHeight },
      { key: '(height: 100vh).clientHeight ', getValue: () => document.querySelector('.height100vh').clientHeight },
      { key: '(fixed height: 100%).clientHeight' , getValue: () => document.querySelector('.height100percent-fixed').clientHeight },
      { key: '(fixed height: 100vh).clientHeight' , getValue: () => document.querySelector('.height100vh-fixed').clientHeight },
    ]
  })
  table.classList.add('prop-table')
  document.querySelector('.prop-table').replaceWith(table)

  // Register button to re-calculate the table values.
  document.querySelector('.re-calculate-values').addEventListener('click', updateValues)

  function updateValues(evtName) {
    updateElSizes()
    const checkbox = document.querySelector('.dynamically-update-values')
    if(checkbox.checked) {
      updateBody()
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

  // Update values for the first time and on change.
  updateValues()
  document.addEventListener('scroll', updateValues.bind(null, 'scroll'))
  window.addEventListener('resize', updateValues.bind(null, 'resize'))
  window.visualViewport.addEventListener('scroll', updateValues.bind(null, 'vvScroll'))
  window.visualViewport.addEventListener('resize', updateValues.bind(null, 'vvResize'))
}
