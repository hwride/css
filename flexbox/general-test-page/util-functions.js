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

const generateStyleChangingSelect = (sectionSelector, selectorClassName, title, elToStyleSelector, propToStyle, values, description) => {
	const label = document.createElement('label')
	label.innerHTML = `
	<span class="select-label">${title}</span>
	<select class="${selectorClassName}">
		${values.map(value => `<option>${value}</option>`).join('\n')}
	</select>
`;
	if(description) {
		label.innerHTML += `
		<p class="description">${description}</p>
`
	}
	document.querySelector(sectionSelector).appendChild(label)

	setupUpdateStyleOnElementChange('.' + selectorClassName, elToStyleSelector, propToStyle)
};

const generateStyleChangingTextInput = (sectionSelector, inputClassName, title, elToStyleSelector, propToStyle) => {
	const label = document.createElement('label')
	label.innerHTML = `
	<span class="select-label">${title}</span>
	<input type="text" class="${inputClassName}" />
`;
	document.querySelector(sectionSelector).appendChild(label)

	setupUpdateStyleOnElementChange('.' + inputClassName, elToStyleSelector, propToStyle)
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