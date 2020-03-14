/* Utility functions */
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
	const className = title + '-select'
	label.innerHTML = `
	<code>${title}</code>:
	<select class="${className}">
		${values.map(value => `<option>${value}</option>`).join('\n')}
	</select>
`;
	addToControls(label)

	setupUpdateStyleOnElementChange('.' + className, elToStyleSelector, propToStyle)
};

const generateStyleChangingTextInput = (title, className, elToStyleSelector, propToStyle) => {
	const label = document.createElement('label')
	label.innerHTML = `
	${title}:
	<input type="text" class="${className}" />
`;
	addToControls(label)

	setupUpdateStyleOnElementChange('.' + className, elToStyleSelector, propToStyle)
}

/* Setup */
addControlTitle('Flex container')
generateStyleChangingSelect('flex-direction', '.flex-container', 'flex-direction', [
	'',
	'row',
	'column',
	'row-reverse',
	'column-reverse'
])

generateStyleChangingSelect('flex-wrap', '.flex-container', 'flex-wrap', [ '', 'wrap', 'nowrap' ])

generateStyleChangingSelect('justify-content', '.flex-container', 'justify-content', [
	'',
	'center',
	'flex-start',
	'flex-end',
	'space-between',
	'space-around',
	'space-evenly'
])

generateStyleChangingSelect('align-items', '.flex-container', 'align-items', [
	'',
	'center',
	'flex-start',
	'flex-end',
	'stretch',
	'baseline'
])

// Flex inputs.
addControlTitle('Flex items')
generateStyleChangingTextInput('a <code>flex</code>', 'a-flex-input', '.a', 'flex')
generateStyleChangingTextInput('b <code>flex</code>', 'b-flex-input', '.b', 'flex')
generateStyleChangingTextInput('c <code>flex</code>', 'c-flex-input', '.c', 'flex')