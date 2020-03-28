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
 * @param options.htmlHeight Height of HTML text area. Defaults to lines + 1.
 * @param options.cssHeight Height of HTML text area. Defaults to lines + 1.
 */
function createCSSTestingComponent(options) {
	return create()

	function create() {
		const cssTestingComponentEl = createCSSTestComponentWrapper(options.parent, options.height)

		// Create iframe.
		const iframeWrapperEl = document.createElement('div')
		iframeWrapperEl.className = 'css-testing-component__iframe-wrapper'
		cssTestingComponentEl.append(iframeWrapperEl)
		const iframeEl = createIframe(cssTestingComponentEl)
		iframeWrapperEl.append(iframeEl)

		// Create input text areas.
		const inputWrapperEl = document.createElement('div')
		inputWrapperEl.className = 'css-testing-component__input-wrapper'
		cssTestingComponentEl.prepend(inputWrapperEl)
		inputWrapperEl.append(createHTMLTextArea(iframeEl))
		inputWrapperEl.append(createCSSTextArea(iframeEl))

		return cssTestingComponentEl
	}

	/* Utility functions */
	function createIframe(cssTestingComponentEl) {
		const iframeEl = document.createElement('iframe')
		iframeEl.className = 'css-testing-component__iframe'
		cssTestingComponentEl.appendChild(iframeEl)
		const iframeResetStylesTag = iframeEl.contentWindow.document.createElement('style')
		iframeResetStylesTag.dataset.name = 'reset'
		iframeResetStylesTag.innerHTML = `
  body {
    margin: 0;
  }
`
		iframeEl.contentWindow.document.querySelector('head').append(iframeResetStylesTag)
		return iframeEl
	}

	function createCSSTestComponentWrapper(parent, height) {
		const cssTestingComponentEl = document.createElement('div')
		cssTestingComponentEl.className = 'css-testing-component'
		if(height) cssTestingComponentEl.style.height = height
		// We need to append our iframe to the actual DOM before iframe.contentWindow is defined, which we need to edit its
		// content. That's why we ask for a parent element as input.
		parent.append(cssTestingComponentEl)
		return cssTestingComponentEl
	}

	function createHTMLTextArea(iframeEl) {
		const htmlTextAreaEl = createTextArea('css-test-component__html')
		const html = options.html ? options.html.trim() : ''
		htmlTextAreaEl.innerHTML = html

		// Set height of text area.
		htmlTextAreaEl.style.flex = `1 0 ${getTextAreaHeight(options.htmlHeight, html)}`

		const updateIframeHTMLContent = () =>
			iframeEl.contentWindow.document.querySelector('body').innerHTML = htmlTextAreaEl.value
		htmlTextAreaEl.addEventListener('input', updateIframeHTMLContent)

		// Update for the first time.
		updateIframeHTMLContent()

		return htmlTextAreaEl
	}

	function createCSSTextArea(iframeEl) {
		const cssTextAreaEl = createTextArea('css-test-component__css')
		const css = options.css ? options.css.trim() : ''
		cssTextAreaEl.innerHTML = css

		// Set height of text area.
		cssTextAreaEl.style.flex = `1 0 ${getTextAreaHeight(options.cssHeight, css)}`

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
}