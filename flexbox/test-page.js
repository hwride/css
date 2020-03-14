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

const generateStyleChangingSelect = (title, elToStyleSelector, propToStyle, values) => {
	const label = document.createElement('label')
	const className = getUniqueClass()
	label.innerHTML = `
	${title}:
	<select class="${className}">
		${values.map(value => `<option>${value}</option>`).join('\n')}
	</select>
`;
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
])

generateStyleChangingSelect('<code>align-items</code>', '.flex-container', 'align-items', [
	'',
	'center',
	'flex-start',
	'flex-end',
	'stretch',
	'baseline'
])

generateStyleChangingSelect('<code>align-content</code>', '.flex-container', 'align-content', [
	'',
	'center',
	'flex-start',
	'flex-end',
	'space-between',
	'space-around',
	'stretch'
])

// Flex inputs.
addControlTitle('Flex items')
generateStyleChangingTextInput('a <code>flex</code>', '.a', 'flex')
generateStyleChangingTextInput('b <code>flex</code>', '.b', 'flex')
generateStyleChangingTextInput('c <code>flex</code>', '.c', 'flex')

const alignSelfValues = [
	'',
	'center',
	'flex-start',
	'flex-end',
	'space-between',
	'space-around',
	'stretch'
]
generateStyleChangingSelect('a <code>align-self</code>', '.a', 'align-self', alignSelfValues)
generateStyleChangingSelect('b <code>align-self</code>', '.b', 'align-self', alignSelfValues)
generateStyleChangingSelect('c <code>align-self</code>', '.c', 'align-self', alignSelfValues)