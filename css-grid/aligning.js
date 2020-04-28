/**
 * Creates a CSS testing component with dropdown to control the various alignment properties. This basically hijacks
 * the CSS testing component buttons area for the dropdowns. It assumes the button area will be created when an empty
 * buttons array is provided which is a bit of a hack.
 */
(async function() {
	const alignCssComponent = await createCSSTestingComponent({
		parent: document.querySelector('.aligning-example'),
		html: `<div class="grid-container">
  <div>a</div>
  <div>b</div>
  <div>c</div>
</div>`,
		css: '',
		buttons: []
	})

	// Create dropdowns for controlling the CSS props of the items in this example.
	const gridItems = [
		{ colour: 'dodgerblue', cssState: {} },
		{ colour: 'green', cssState: {
			'grid-column': '2',
			'grid-row': '1 / 3'
		} },
		{ colour: 'tomato', cssState: {} }
	]
	const gridContainerCSSState = {}

	/* Utility functions. */
	// Returns the final CSS based on the current cssState above.
	const getCSSFromState = () => {
		const addPropIfNotNull = (prop, val) => {
			if(val) {
				css += `  ${prop}: ${val};\n`
			}
		}

		// Grid container.
		let css = `.grid-container {
  display: grid;
  height: 200px;
  margin: 20px;
  border: 1px dashed black;
  grid-template-columns: repeat(2, 50px);
  grid-template-rows: repeat(2, 50px);
`
		// Have place properties first so they can be overridden by more specific properties if desired.
		Object.entries(gridContainerCSSState).forEach(([ prop, val ]) => {
			addPropIfNotNull(prop, val)
		})
		css += `}
.grid-container > div {
  border: 1px solid black;
}
`

		// Grid items.
		for(let i = 0; i < gridItems.length;  i++) {
			css += `.grid-container > div:nth-child(${i+1}) {
  background: ${gridItems[i].colour};
`
			Object.entries(gridItems[i].cssState).forEach(([ prop, val ]) => {
				addPropIfNotNull(prop, val)
			})
			css += '}\n'
		}
		return css
	}

	// Create a dropdown in the buttons section of the CSS testing component. On change will set the given prop value on
	// the given cssState object with the new value, then update the CSS test component CSS.
	const createDropdown = (prop, cssState, values) => {
		// Create HTML.
		const labelEl = document.createElement('label')
		labelEl.innerHTML = `
	<code>${prop}</code>
	<select class="${prop}">
		${values.map(value => `<option>${value}</option>`).join('\n')}
	</select>
`

		// Register change listener.
		const selectEl = labelEl.querySelector('select')
		const update = () => {
			cssState[prop] = selectEl.value
			alignCssComponent.cssEditor.setValue(getCSSFromState(), -1)
		}
		selectEl.addEventListener('change', update);
		update()

		// Add to DOM.
		alignCssComponent.el.querySelector('.css-testing-component__buttons').append(labelEl)
	}

	// Add a title to the buttons section of the CSS testing component.
	const addTitle = (text) => {
		const header = document.createElement('div')
		header.innerText = text
		header.style.fontWeight = 'bold'
		alignCssComponent.el.querySelector('.css-testing-component__buttons').append(header)
	}

	/* Create titles and dropdowns in input area. */
	// Grid item properties (all grid items).
	addTitle('All grid items')
	const itemProperties = [
		'',
		'auto',
		'normal',
		'start',
		'end',
		'center',
		'stretch',
		'baseline',
		'first baseline',
		'last baseline'
	]
	createDropdown('align-items', gridContainerCSSState, itemProperties)
	createDropdown('justify-items', gridContainerCSSState, itemProperties)
	createDropdown('place-items', gridContainerCSSState, itemProperties)
	alignCssComponent.el.querySelector('.css-testing-component__buttons').append(document.createElement('br'))

	// Grid item properties (individual grid items).
	for(let i = 0; i < gridItems.length; i++) {
		addTitle('Grid item ' + (i+1))
		const state = gridItems[i].cssState
		createDropdown('align-self', state, itemProperties)
		createDropdown('justify-self', state, itemProperties)
		createDropdown('place-self', state, itemProperties)
	}
	alignCssComponent.el.querySelector('.css-testing-component__buttons').append(document.createElement('br'))

	// Grid track properties.
	addTitle('Grid tracks')
	const trackProperties = [
		'',
		'normal',
		'start',
		'end',
		'center',
		'stretch',
		'space-around',
		'space-between',
		'space-evenly',
		'baseline',
		'first baseline',
		'last baseline'
	]
	createDropdown('align-content', gridContainerCSSState, trackProperties)
	createDropdown('justify-content', gridContainerCSSState, trackProperties)
	createDropdown('place-content', gridContainerCSSState, trackProperties)
})()