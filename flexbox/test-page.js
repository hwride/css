const setupUpdateFlexContainerStyleAccordingToSelect = function(selectSelector, styleName) {
	const update = function() {
		const value = document.querySelector(selectSelector).value;
		document.querySelector('.flex-container').style[styleName] = value;
	};
	document.querySelector(selectSelector).addEventListener('change', update);
	update();
};
setupUpdateFlexContainerStyleAccordingToSelect('.flex-direction-select', 'flex-direction');
setupUpdateFlexContainerStyleAccordingToSelect('.justify-content-select', 'justify-content');
setupUpdateFlexContainerStyleAccordingToSelect('.align-items-select', 'align-items');