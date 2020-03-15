/* Utility functions */
let id = 0;
const getUniqueClass = () => 'class' + (++id)

const addToControls = (content) => {
	document.querySelector('.controls').appendChild(content)
}

const addControlTitle = (titleName) => {
	const title = document.createElement('h3')
	title.innerText = titleName
	addToControls(title)
}

const setupUpdateStyleOnElementChange = function(elChangeSelector, elToStyleSelector, styleName) {
	const update = function() {
		const value = document.querySelector(elChangeSelector).value;
		document.querySelector(elToStyleSelector).style[styleName] = value;
	};
	document.querySelector(elChangeSelector).addEventListener('change', update);
	update();
}

const generateStyleChangingSelect = (title, elToStyleSelector, propToStyle, values, description) => {
	const label = document.createElement('label')
	const className = getUniqueClass()
	label.innerHTML = `
	${title}:
	<select class="${className}">
		${values.map(value => `<option>${value}</option>`).join('\n')}
	</select>
`;
	if(description) {
		label.innerHTML += `
		<p class="description">${description}</p>
`
	}
	addToControls(label)

	setupUpdateStyleOnElementChange('.' + className, elToStyleSelector, propToStyle)
};

const generateStyleChangingTextInput = (title, elToStyleSelector, propToStyle) => {
	const label = document.createElement('label')
	const className = getUniqueClass()
	label.innerHTML = `
	${title}:
	<input type="text" class="${className}" />
`;
	addToControls(label)

	setupUpdateStyleOnElementChange('.' + className, elToStyleSelector, propToStyle)
}

/* Setup */
// Flex container.
addControlTitle('Flex container')
generateStyleChangingSelect('<code>flex-direction</code>', '.flex-container', 'flex-direction', [
	'',
	'row',
	'column',
	'row-reverse',
	'column-reverse'
])

generateStyleChangingSelect('<code>flex-wrap</code>', '.flex-container', 'flex-wrap', [ '', 'wrap', 'nowrap' ])

generateStyleChangingSelect('<code>justify-content</code>', '.flex-container', 'justify-content', [
	'',
	'center',
	'flex-start',
	'flex-end',
	'space-between',
	'space-around',
	'space-evenly'
], 'Align items on the main axis')

generateStyleChangingSelect('<code>align-items</code>', '.flex-container', 'align-items', [
	'',
	'center',
	'flex-start',
	'flex-end',
	'stretch',
	'baseline'
], 'Align items on the cross axis')

generateStyleChangingSelect('<code>align-content</code>', '.flex-container', 'align-content', [
	'',
	'center',
	'flex-start',
	'flex-end',
	'space-between',
	'space-around',
	'stretch'
], 'Control space between flex lines on the cross axis, only applicable when there are multiple lines')

// Flex inputs.
addControlTitle('Flex items')
const flexHeader = document.createElement('code')
flexHeader.innerText = 'flex: <flex-grow> <flex-shrink> <flex-basis>'
addToControls(flexHeader)
generateStyleChangingTextInput('a', '.a', 'flex')
generateStyleChangingTextInput('b', '.b', 'flex')
generateStyleChangingTextInput('c', '.c', 'flex')

addToControls(document.createElement('br'))
const alignSelfHeader = document.createElement('code')
alignSelfHeader.innerText = 'align-self'
addToControls(alignSelfHeader)
const alignSelfDescription = document.createElement('p')
alignSelfDescription.className = 'description'
alignSelfDescription.innerText = 'Align a single item on the cross axis'
addToControls(alignSelfDescription)
const alignSelfValues = [
	'',
	'center',
	'flex-start',
	'flex-end',
	'space-between',
	'space-around',
	'stretch'
]
generateStyleChangingSelect('a', '.a', 'align-self', alignSelfValues)
generateStyleChangingSelect('b', '.b', 'align-self', alignSelfValues)
generateStyleChangingSelect('c', '.c', 'align-self', alignSelfValues)

addToControls(document.createElement('br'))
const heightHeader = document.createElement('code')
heightHeader.innerText = 'height'
addToControls(heightHeader)
generateStyleChangingTextInput('a', '.a', 'height')
generateStyleChangingTextInput('b', '.b', 'height')
generateStyleChangingTextInput('c', '.c', 'height')