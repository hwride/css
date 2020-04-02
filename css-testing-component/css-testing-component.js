/*
	Component which can be used for testing/demoing CSS on a page. Shoes two text areas with HTML and CSS which are
	rendered in an iframe. The iframe will update automatically when the text is changed.
 */

/**
 * Create a CSS test component.
 *
 * @param options.parent Parent element to append the CSS test component to.
 * @param options.html Default HTML that should be used.
 * @param options.css Default CSS that should be used.
 * @param {[{label, html, css}]} options.buttons Buttons which can switch content in the component. If a button has
 * reset: true instead of html and css it will be a reset button. A default label is supplied with the reset button.
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

			const cssTestingComponentEl = createCSSTestComponentWrapper(options.parent)

			// Create iframe.
			const iframeWrapperEl = document.createElement('div')
			iframeWrapperEl.className = 'css-testing-component__iframe-wrapper'
			cssTestingComponentEl.append(iframeWrapperEl)
			const iframeEl = createIframe(iframeWrapperEl)

			// Create input text areas.
			const inputWrapperEl = document.createElement('div')
			inputWrapperEl.className = 'css-testing-component__text-areas'
			cssTestingComponentEl.prepend(inputWrapperEl)

			// For some reason setting the iframe content doesn't work properly on Firefox 74 unless you tick the event queue
			// once. For this reason set all initial iframe content here.
			setTimeout(() => {
				addResetStylesToIframe(iframeEl)

				// Creating the text areas adds inital HTML and CSS to the iframe.
				const htmlTextArea = createHTMLTextArea(iframeEl, initialHTML)
				inputWrapperEl.append(htmlTextArea)
				const cssTextArea = createCSSTextArea(iframeEl, initialCSS)
				inputWrapperEl.append(cssTextArea)
				resolve(cssTestingComponentEl)

				// Create buttons.
				if(options.buttons) {
					const buttonsEl = createButtons({
						buttons: options.buttons,
						initialHTML,
						initialCSS,
						htmlTextArea,
						cssTextArea
					})
					cssTestingComponentEl.append(buttonsEl)
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

	function createButtons(options) {
		const buttonsEl = document.createElement('div')
		buttonsEl.className = 'css-testing-component__buttons'

		options.buttons.forEach(buttonOptions => {
			// Default reset button label.
			if(buttonOptions.reset && !buttonOptions.label) buttonOptions.label = 'Reset';

			// Create button element.
			const buttonEl = document.createElement('button')
			buttonEl.innerText = buttonOptions.label
			buttonsEl.appendChild(buttonEl)

			// Create event listener to update CSS code on button click.
			let buttonHTML = buttonOptions.reset ? options.initialHTML : buttonOptions.html
			let buttonCSS = buttonOptions.reset ? options.initialCSS : buttonOptions.css
			buttonEl.addEventListener('click', () => {
				if(buttonHTML) updateTextAreaContent(options.htmlTextArea, buttonHTML)
				if(buttonCSS) updateTextAreaContent(options.cssTextArea, buttonCSS)
			})
		})
		return buttonsEl
	}

	function updateTextAreaContent(textArea, newContent) {
		textArea.value = newContent
		textArea.dispatchEvent(new Event('input'))
	}
}