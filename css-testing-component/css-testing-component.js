/*
	Component which can be used for testing/demoing CSS on a page. Shoes two text areas with HTML and CSS which are
	rendered in an iframe. The iframe will update automatically when the text is changed.
 */

// Could re-write this to define all HTML upfront as a string, may be easier to read.

/**
 * Create a CSS test component.
 *
 * @param options.parent Parent element to append the CSS test component to.
 * @param options.html Default HTML that should be used.
 * @param options.css Default CSS that should be used.
 * @param options.description Default description to be displayed.
 * @param {[{label, description, html, css}]} options.buttons Buttons which can switch content in the component.
 *
 * If description is provided it will be displayed when the button is clicked.
 *
 * If a button has reset: true instead of html and css it will be a reset button. A default label is supplied with the
 * reset button.
 * @param options.htmlHeight Height of HTML text area. Defaults to lines + 1. The iframe height will be equal to the
 * height of both text areas.
 * @param options.cssHeight Height of HTML text area. Defaults to lines + 1.
 * @return Promise which resolves with the CSS testing component element when it is ready for use.
 */
function createCSSTestingComponent(options) {
	return create()

	function create() {
		return new Promise(function(resolve) {
			const initialHTML = options.html ? options.html.trim() : ''
			const initialCSS = options.css ? options.css.trim() : ''
			const initialDescription = options.description ? options.description : ''

			const cssTestingComponentEl = createCSSTestComponentWrapper(options.parent)

			// Create top row containing input text areas, iframe and buttons.
			const inputAndIframeRow = document.createElement('div')
			inputAndIframeRow.className = 'css-testing-component__input-and-iframe-row'
			cssTestingComponentEl.append(inputAndIframeRow)

			// Create iframe.
			const iframeWrapperEl = document.createElement('div')
			iframeWrapperEl.className = 'css-testing-component__iframe-wrapper'
			inputAndIframeRow.append(iframeWrapperEl)
			const iframeEl = createIframe(iframeWrapperEl)

			// Create input text areas.
			const inputWrapperEl = document.createElement('div')
			inputWrapperEl.className = 'css-testing-component__text-areas'
			inputAndIframeRow.prepend(inputWrapperEl)

			// Create description row.
			const descriptionEl = createDescription(options.description)
			cssTestingComponentEl.append(descriptionEl)

			// For some reason setting the iframe content doesn't work properly on Firefox 74 unless you tick the event queue
			// once. For this reason set all initial iframe content here.
			setTimeout(() => {
				addResetStylesToIframe(iframeEl)

				// Creating the text areas adds inital HTML and CSS to the iframe.
				const htmlTextAreaEl = createHTMLTextArea(iframeEl, initialHTML)
				inputWrapperEl.append(htmlTextAreaEl)
				const cssTextAreaEl = createCSSTextArea(iframeEl, initialCSS)
				inputWrapperEl.append(cssTextAreaEl)
				resolve(cssTestingComponentEl)

				// Create buttons.
				if(options.buttons) {
					const buttonsEl = createButtons({
						buttons: options.buttons,
						initialHTML,
						initialCSS,
						initialDescription,
						htmlTextAreaEl,
						cssTextAreaEl,
						descriptionEl
					})
					inputAndIframeRow.append(buttonsEl)
				}
			}, 0)
		})
	}

	/* Utility functions */
	function createIframe(cssTestingComponentEl) {
		const iframeEl = document.createElement('iframe')
		iframeEl.className = 'css-testing-component__iframe'
		cssTestingComponentEl.appendChild(iframeEl)
		return iframeEl
	}

	function addResetStylesToIframe(iframeEl) {
		const iframeResetStylesTag = iframeEl.contentWindow.document.createElement('style')
		iframeResetStylesTag.dataset.name = 'reset'
		iframeResetStylesTag.innerHTML = `
  body {
    margin: 0;
  }
`
		iframeEl.contentWindow.document.querySelector('head').append(iframeResetStylesTag)
	}

	function createCSSTestComponentWrapper(parent) {
		const cssTestingComponentEl = document.createElement('div')
		cssTestingComponentEl.className = 'css-testing-component'
		// We need to append our iframe to the actual DOM before iframe.contentWindow is defined, which we need to edit its
		// content. That's why we ask for a parent element as input.
		parent.append(cssTestingComponentEl)
		return cssTestingComponentEl
	}

	function createHTMLTextArea(iframeEl, initialHTML) {
		const htmlTextAreaEl = createTextArea('css-test-component__html')
		htmlTextAreaEl.innerHTML = initialHTML

		// Set height of text area.
		htmlTextAreaEl.style.flex = `1 0 ${getTextAreaHeight(options.htmlHeight, initialHTML)}`

		const updateIframeHTMLContent = () =>
			iframeEl.contentWindow.document.querySelector('body').innerHTML = htmlTextAreaEl.value
		htmlTextAreaEl.addEventListener('input', updateIframeHTMLContent)

		// Update for the first time.
		updateIframeHTMLContent()

		return htmlTextAreaEl
	}

	function createCSSTextArea(iframeEl, initialCSS) {
		const cssTextAreaEl = createTextArea('css-test-component__css')
		cssTextAreaEl.innerHTML = initialCSS

		// Set height of text area.
		cssTextAreaEl.style.flex = `1 0 ${getTextAreaHeight(options.cssHeight, initialCSS)}`

		// Create a style tag inside the iframe we will update with our styles.
		const iframeCustomStyleTag = iframeEl.contentWindow.document.createElement('style')
		iframeCustomStyleTag.dataset.name = 'custom'
		iframeEl.contentWindow.document.querySelector('head').append(iframeCustomStyleTag)

		const updateIframeCSSContent = () => iframeCustomStyleTag.innerHTML = cssTextAreaEl.value
		cssTextAreaEl.addEventListener('input', updateIframeCSSContent)

		// Add initial content to iframe.
		updateIframeCSSContent()

		return cssTextAreaEl
	}

	function getTextAreaHeight(optionHeight, initialText) {
		const initialTextLines = initialText.split('\n').length
		let defaultHeight
		if(optionHeight != null) {
			defaultHeight = optionHeight
		} else if(initialTextLines) {
			defaultHeight = `${initialTextLines + 1}em`
		} else {
			defaultHeight = '0'
		}
		return defaultHeight
	}

	function createTextArea(className) {
		const textArea = document.createElement('textarea')
		textArea.className = className
		textArea.cols = 60
		return textArea
	}

	function createButtons({ buttons, initialHTML, initialCSS, initialDescription, htmlTextAreaEl, cssTextAreaEl, descriptionEl }) {
		const buttonsEl = document.createElement('div')
		buttonsEl.className = 'css-testing-component__buttons'

		buttons.forEach(buttonOptions => {
			// Default reset button label.
			if(buttonOptions.reset && !buttonOptions.label) buttonOptions.label = 'Reset';

			// Create button element.
			const buttonEl = document.createElement('button')
			buttonEl.innerText = buttonOptions.label
			buttonsEl.appendChild(buttonEl)

			// Create event listener to update HTML and CSS text areas on button click.
			const buttonHTML = buttonOptions.reset ? initialHTML : buttonOptions.html
			const buttonCSS = buttonOptions.reset ? initialCSS : buttonOptions.css
			const buttonDescription = buttonOptions.reset ? initialDescription : buttonOptions.description
			buttonEl.addEventListener('click', () => {
				if(buttonHTML) updateTextAreaContent(htmlTextAreaEl, buttonHTML.trim())
				if(buttonCSS) updateTextAreaContent(cssTextAreaEl, buttonCSS.trim())
				if(buttonDescription) descriptionEl.innerHTML = buttonDescription
			})
		})
		return buttonsEl
	}

	function createDescription(initialDescription) {
		const descriptionEl = document.createElement('div')
		descriptionEl.className = 'css-testing-component__description'
		if(initialDescription) descriptionEl.innerHTML = initialDescription
		return descriptionEl
	}

	function updateTextAreaContent(textArea, newContent) {
		textArea.value = newContent
		textArea.dispatchEvent(new Event('input'))
	}
}