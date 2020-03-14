/* Utility functions */
const addToControls = (content) => {
	document.querySelector('.controls').appendChild(content)
}

const addControlTitle = (titleName) => {
	const title = document.createElement('h3')
	title.innerText = titleName
	addToControls(title)
}

const generateSelect = (title, values) => {
	const label = document.createElement('label')
	const className = title + '-select'
	label.innerHTML = `
	<code>${title}</code>:
	<select class="${className}">
		${values.map(value => `<option>${value}</option>`).join('\n')}
	</select>
`;
	addToControls(label)
};

const generateTextInput = (title, className) => {
	const label = document.createElement('label')
	label.innerHTML = `
	${title}:
	<input type="text" class="${className}" />
`;
	addToControls(label)
}
const setupUpdateStyleOnElementChange = function(elChangeSelector, elToStyleSelector, styleName) {
	const update = function() {
		const value = document.querySelector(elChangeSelector).value;
		document.querySelector(elToStyleSelector).style[styleName] = value;
	};
	document.querySelector(elChangeSelector).addEventListener('change', update);
	update();
}

/* Setup */
addControlTitle('Flex container')
generateSelect('flex-direction', [ '', 'row', 'column', 'row-reverse', 'column-reverse' ])
setupUpdateStyleOnElementChange('.flex-direction-select', '.flex-container', 'flex-direction')

generateSelect('justify-content', [
	'',
	'center',
	'flex-start',
	'flex-end',
	'space-between',
	'space-around',
	'space-evenly'
])
setupUpdateStyleOnElementChange('.justify-content-select', '.flex-container', 'justify-content')

generateSelect('align-items', [
	'',
	'center',
	'flex-start',
	'flex-end',
	'stretch',
	'baseline'
])
setupUpdateStyleOnElementChange('.align-items-select', '.flex-container', 'align-items')

// Flex inputs.
addControlTitle('Flex items')
generateTextInput('a <code>flex</code>', 'a-flex-input')
setupUpdateStyleOnElementChange('.a-flex-input', '.aa', 'flex')
generateTextInput('b <code>flex</code>', 'b-flex-input')
setupUpdateStyleOnElementChange('.b-flex-input', '.ab', 'flex')
generateTextInput('c <code>flex</code>', 'c-flex-input')
setupUpdateStyleOnElementChange('.c-flex-input', '.ac', 'flex')