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
// Flex container.
	generateStyleChangingSelect('.flex-container-controls', 'flex-dir-select', '<code>flex-direction</code>', '.flex-container', 'flex-direction', [
		'',
		'row',
		'column',
		'row-reverse',
		'column-reverse'
	])

	generateStyleChangingSelect('.flex-container-controls', 'flex-wrap-select', '<code>flex-wrap</code>', '.flex-container', 'flex-wrap', ['', 'wrap', 'nowrap'])

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
	// Flex inputs.
	const flexInputControlsEl = document.querySelector('.flex-item-controls')
	const flexHeader = document.createElement('code')
	flexHeader.innerText = 'flex: <flex-grow> <flex-shrink> <flex-basis>'
	flexInputControlsEl.appendChild(flexHeader)
	generateStyleChangingTextInput('.flex-item-controls', 'flex-a-input', 'a', '.a', 'flex')
	generateStyleChangingTextInput('.flex-item-controls', 'flex-b-input', 'b', '.b', 'flex')
	generateStyleChangingTextInput('.flex-item-controls', 'flex-c-input', 'c', '.c', 'flex')

	flexInputControlsEl.appendChild(document.createElement('br'))
	const alignSelfHeader = document.createElement('code')
	alignSelfHeader.innerText = 'align-self'
	flexInputControlsEl.appendChild(alignSelfHeader)
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

	flexInputControlsEl.appendChild(document.createElement('br'))
	const heightHeader = document.createElement('code')
	heightHeader.innerText = 'height'
	flexInputControlsEl.appendChild(heightHeader)
	generateStyleChangingTextInput('.flex-item-controls', 'height-a-input', 'a', '.a', 'height')
	generateStyleChangingTextInput('.flex-item-controls', 'height-b-input', 'b', '.b', 'height')
	generateStyleChangingTextInput('.flex-item-controls', 'height-c-input', 'c', '.c', 'height')
}

function addPresetControls() {
	const setFlexGrow = (shape, value) => {
		const inputClassName = {
			'a': '.flex-a-input',
			'b': '.flex-b-input',
			'c': '.flex-c-input'
		}[shape]
		const input = document.querySelector(inputClassName)
		input.value = value
		input.dispatchEvent(new Event('change'))
	};

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
			'.height-c-input'
		]
		controlInputClasses.forEach(className => {
			const input = document.querySelector(className)
			input.value = ''
			input.dispatchEvent(new Event('change'))
		})
	})
	addPresetButton('Flex grow', () => {
		setFlexGrow('a', '1 0 0')
		setFlexGrow('b', '3 0 0')
		setFlexGrow('c', '2 0 0')
	})
}