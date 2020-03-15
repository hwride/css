/* Utility functions */
let id = 0;
const getUniqueClass = () => 'class' + (++id)

const setupUpdateStyleOnElementChange = function(elChangeSelector, elToStyleSelector, styleName) {
	const update = function() {
		const value = document.querySelector(elChangeSelector).value;
		document.querySelector(elToStyleSelector).style[styleName] = value;
	};
	document.querySelector(elChangeSelector).addEventListener('change', update);
	update();
}

const generateStyleChangingSelect = (sectionSelector, title, elToStyleSelector, propToStyle, values, description) => {
	const label = document.createElement('label')
	const className = getUniqueClass()
	label.innerHTML = `
	<span class="select-label">${title}</span>
	<select class="${className}">
		${values.map(value => `<option>${value}</option>`).join('\n')}
	</select>
`;
	if(description) {
		label.innerHTML += `
		<p class="description">${description}</p>
`
	}
	document.querySelector(sectionSelector).appendChild(label)

	setupUpdateStyleOnElementChange('.' + className, elToStyleSelector, propToStyle)
};

const generateStyleChangingTextInput = (sectionSelector, title, elToStyleSelector, propToStyle, inputClassName) => {
	const label = document.createElement('label')
	const className = inputClassName ? inputClassName : getUniqueClass()
	label.innerHTML = `
	<span class="select-label">${title}</span>
	<input type="text" class="${className}" />
`;
	document.querySelector(sectionSelector).appendChild(label)

	setupUpdateStyleOnElementChange('.' + className, elToStyleSelector, propToStyle)
}

const addPresetButton = (title, onClick) => {
	const label = document.createElement('label')
	const button = document.createElement('button')
	button.innerText = 'Set'
	label.innerHTML = `
	<span class="select-label">${title}</span>
`;
	label.appendChild(button)
	document.querySelector('.preset-controls').appendChild(label)
	button.addEventListener('click', onClick)
}