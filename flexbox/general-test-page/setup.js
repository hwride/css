/* Setup */

main()

function main() {
	addPropertyControls()
	addPresetControls()
}

function addPropertyControls() {
	addFlexContainerPropertyControls()
	addFlexItemPropertyControls()
}

function addFlexContainerPropertyControls() {
	generateStyleChangingSelect('.flex-container-controls', 'flex-dir-select', '<code>flex-direction</code>', '.flex-container', 'flex-direction', [
		'',
		'row',
		'column',
		'row-reverse',
		'column-reverse'
	])

	generateStyleChangingSelect('.flex-container-controls', 'flex-wrap-select', '<code>flex-wrap</code>', '.flex-container', 'flex-wrap', ['', 'wrap', 'nowrap'])

	const flexFlowInfo = document.createElement('code')
	flexFlowInfo.innerText = 'flex-flow: <flex-direction> <flex-wrap>'
	document.querySelector('.flex-container-controls').appendChild(flexFlowInfo)

	generateStyleChangingSelect('.flex-container-controls', 'justify-content-select', '<code>justify-content</code>', '.flex-container', 'justify-content', [
		'',
		'center',
		'flex-start',
		'flex-end',
		'space-between',
		'space-around',
		'space-evenly'
	], 'Align items on the main axis')

	generateStyleChangingSelect('.flex-container-controls', 'align-items-select', '<code>align-items</code>', '.flex-container', 'align-items', [
		'',
		'center',
		'flex-start',
		'flex-end',
		'stretch',
		'baseline'
	], 'Align items on the cross axis')

	generateStyleChangingSelect('.flex-container-controls', 'align-content-select', '<code>align-content</code>', '.flex-container', 'align-content', [
		'',
		'center',
		'flex-start',
		'flex-end',
		'space-between',
		'space-around',
		'stretch'
	], 'Control space between flex lines on the cross axis, only applicable when there are multiple lines')
}

function addFlexItemPropertyControls() {
	const addCodeHeader = (text) => {
		const header = document.createElement('code')
		header.innerText = text
		flexInputControlsEl.appendChild(header)
	}

	// flex
	const flexInputControlsEl = document.querySelector('.flex-item-controls')
	addCodeHeader('flex: <flex-grow> <flex-shrink> <flex-basis>')
	generateStyleChangingTextInput('.flex-item-controls', 'flex-a-input', 'a', '.a', 'flex')
	generateStyleChangingTextInput('.flex-item-controls', 'flex-b-input', 'b', '.b', 'flex')
	generateStyleChangingTextInput('.flex-item-controls', 'flex-c-input', 'c', '.c', 'flex')

	// align-self
	flexInputControlsEl.appendChild(document.createElement('br'))
	addCodeHeader('align-self')
	const alignSelfDescription = document.createElement('p')
	alignSelfDescription.className = 'description'
	alignSelfDescription.innerText = 'Align a single item on the cross axis'
	flexInputControlsEl.appendChild(alignSelfDescription)
	const alignSelfValues = [
		'',
		'center',
		'flex-start',
		'flex-end',
		'space-between',
		'space-around',
		'stretch'
	]
	generateStyleChangingSelect('.flex-item-controls', 'align-self-a-select', 'a', '.a', 'align-self', alignSelfValues)
	generateStyleChangingSelect('.flex-item-controls', 'align-self-b-select', 'b', '.b', 'align-self', alignSelfValues)
	generateStyleChangingSelect('.flex-item-controls', 'align-self-c-select', 'c', '.c', 'align-self', alignSelfValues)

	// height
	flexInputControlsEl.appendChild(document.createElement('br'))
	addCodeHeader('height')
	generateStyleChangingTextInput('.flex-item-controls', 'height-a-input', 'a', '.a', 'height')
	generateStyleChangingTextInput('.flex-item-controls', 'height-b-input', 'b', '.b', 'height')
	generateStyleChangingTextInput('.flex-item-controls', 'height-c-input', 'c', '.c', 'height')

	// order
	flexInputControlsEl.appendChild(document.createElement('br'))
	addCodeHeader('order')
	generateStyleChangingTextInput('.flex-item-controls', 'order-a-input', 'a', '.a', 'order')
	generateStyleChangingTextInput('.flex-item-controls', 'order-b-input', 'b', '.b', 'order')
	generateStyleChangingTextInput('.flex-item-controls', 'order-c-input', 'c', '.c', 'order')
}

function addPresetControls() {
	// Utils.
	const setComponentValue = (selector, value) => {
		const input = document.querySelector(selector)
		input.value = value
		input.dispatchEvent(new Event('change'))
	}

	const setFlex = (shape, value) => {
		const inputClassName = {
			'a': '.flex-a-input',
			'b': '.flex-b-input',
			'c': '.flex-c-input'
		}[shape]
		setComponentValue(inputClassName, value)
	}

	// Actual preset button controls.
	addPresetButton('Reset', () => {
		const controlInputClasses = [
			'.flex-dir-select',
			'.flex-wrap-select',
			'.justify-content-select',
			'.align-items-select',
			'.align-content-select',
			'.align-self-a-select',
			'.align-self-b-select',
			'.align-self-c-select',
			'.flex-a-input',
			'.flex-b-input',
			'.flex-c-input',
			'.height-a-input',
			'.height-b-input',
			'.height-c-input',
			'.order-a-input',
			'.order-b-input',
			'.order-c-input'
		]
		controlInputClasses.forEach(className => {
			const input = document.querySelector(className)
			input.value = ''
			input.dispatchEvent(new Event('change'))
		})
	})

	addPresetButton('Vertical and horizontal center', () => {
		setComponentValue('.justify-content-select', 'center')
		setComponentValue('.align-items-select', 'center')
	})

	addPresetButton('<code>flex-grow</code>', () => {
		setFlex('a', '1 0 0')
		setFlex('b', '3 0 0')
		setFlex('c', '2 0 0')
	})

	addPresetButton('<code>flex-shrink</code>', () => {
		setFlex('a', '0 1 200px')
		setFlex('b', '0 2 200px')
		setFlex('c', '0 1 200px')
	})

	addPresetButton('<code>flex-wrap</code>', () => {
		setFlex('a', '0 0 140px')
		setFlex('b', '0 0 150px')
		setFlex('c', '0 0 160px')
		setComponentValue('.flex-wrap-select', 'wrap')
	})

	addPresetButton('<code>align-items</code> and <code>align-content</code>', () => {
		setComponentValue('.height-a-input', '100px')
		setComponentValue('.height-b-input', '50px')
		setComponentValue('.height-c-input', '125px')
		setFlex('a', '0 0 140px')
		setFlex('b', '0 0 150px')
		setFlex('c', '0 0 160px')
		setComponentValue('.flex-wrap-select', 'wrap')
		setComponentValue('.align-items-select', 'center')
		setComponentValue('.align-content-select', 'space-around')
	})

	addPresetButton('<code>order</code>', () => {
		setComponentValue('.order-c-input', '1')
		setComponentValue('.order-a-input', '2')
		setComponentValue('.order-b-input', '3')
	})
}