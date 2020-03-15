/* Setup */
// Flex container.
generateStyleChangingSelect('.flex-container-controls', '<code>flex-direction</code>', '.flex-container', 'flex-direction', [
	'',
	'row',
	'column',
	'row-reverse',
	'column-reverse'
])

generateStyleChangingSelect('.flex-container-controls', '<code>flex-wrap</code>', '.flex-container', 'flex-wrap', [ '', 'wrap', 'nowrap' ])

generateStyleChangingSelect('.flex-container-controls', '<code>justify-content</code>', '.flex-container', 'justify-content', [
	'',
	'center',
	'flex-start',
	'flex-end',
	'space-between',
	'space-around',
	'space-evenly'
], 'Align items on the main axis')

generateStyleChangingSelect('.flex-container-controls', '<code>align-items</code>', '.flex-container', 'align-items', [
	'',
	'center',
	'flex-start',
	'flex-end',
	'stretch',
	'baseline'
], 'Align items on the cross axis')

generateStyleChangingSelect('.flex-container-controls', '<code>align-content</code>', '.flex-container', 'align-content', [
	'',
	'center',
	'flex-start',
	'flex-end',
	'space-between',
	'space-around',
	'stretch'
], 'Control space between flex lines on the cross axis, only applicable when there are multiple lines')

// Flex inputs.
const flexInputControlsEl = document.querySelector('.flex-item-controls')
const flexHeader = document.createElement('code')
flexHeader.innerText = 'flex: <flex-grow> <flex-shrink> <flex-basis>'
flexInputControlsEl.appendChild(flexHeader)
generateStyleChangingTextInput('.flex-item-controls', 'a', '.a', 'flex')
generateStyleChangingTextInput('.flex-item-controls', 'b', '.b', 'flex')
generateStyleChangingTextInput('.flex-item-controls', 'c', '.c', 'flex')

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
generateStyleChangingSelect('.flex-item-controls', 'a', '.a', 'align-self', alignSelfValues)
generateStyleChangingSelect('.flex-item-controls', 'b', '.b', 'align-self', alignSelfValues)
generateStyleChangingSelect('.flex-item-controls', 'c', '.c', 'align-self', alignSelfValues)

flexInputControlsEl.appendChild(document.createElement('br'))
const heightHeader = document.createElement('code')
heightHeader.innerText = 'height'
flexInputControlsEl.appendChild(heightHeader)
generateStyleChangingTextInput('.flex-item-controls', 'a', '.a', 'height')
generateStyleChangingTextInput('.flex-item-controls', 'b', '.b', 'height')
generateStyleChangingTextInput('.flex-item-controls', 'c', '.c', 'height')