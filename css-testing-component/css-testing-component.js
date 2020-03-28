/*
	Component which can be used for testing/demoing CSS on a page. Shoes two text areas with HTML and CSS which are
	rendered in an iframe. The iframe will update automatically when the text is changed.
 */

/**
 * Create a CSS test component.
 *
 * @param options.parent Parent element to append the CSS test component to.
 * @param options.defaultHTML Default HTML that should be used.
 * @param options.defaultCSS Default CSS that should be used.
 * @param options.htmlHeight Height of HTML text area.
 * @param options.cssHeight Height of HTML text area.
 */
function createCSSTestingComponent(options) {
	setDefaults(options)
	return create()

	function setDefaults(options) {
		if(!options.htmlHeight) options.htmlHeight = '50px';
		if(!options.cssHeight) options.cssHeight = '50px';
	}

	function create() {
		const cssTestingComponentEl = createCSSTestComponentWrapper(options.parent, options.height)
		const iframeEl = createIframe(cssTestingComponentEl)
		const inputWrapperEl = document.createElement('div')

		// Create inputs.
		inputWrapperEl.className = 'css-testing-component_input-wrapper'
		cssTestingComponentEl.prepend(inputWrapperEl)
		inputWrapperEl.append(createHTMLTextArea(iframeEl))
		inputWrapperEl.append(createCSSTextArea(iframeEl))

		return cssTestingComponentEl
	}

	/* Utility functions */
	function createIframe(cssTestingComponentEl) {
		const iframeEl = document.createElement('iframe')
		iframeEl.className = 'css-testing-component_iframe'
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
		if(options.htmlHeight) htmlTextAreaEl.style.flex = `1 0 ${options.htmlHeight}`

		if(options.defaultHTML) htmlTextAreaEl.innerHTML = options.defaultHTML.trim()

		const updateIframeHTMLContent = () =>
			iframeEl.contentWindow.document.querySelector('body').innerHTML = htmlTextAreaEl.value
		htmlTextAreaEl.addEventListener('input', updateIframeHTMLContent)

		// Update for the first time.
		updateIframeHTMLContent()

		return htmlTextAreaEl
	}

	function createCSSTextArea(iframeEl) {
		const cssTextAreaEl = createTextArea('css-test-component__css')
		if(options.cssHeight) cssTextAreaEl.style.flex = `1 0 ${options.cssHeight}`

		if(options.defaultCSS) cssTextAreaEl.innerHTML = options.defaultCSS.trim()

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

	function createTextArea(className) {
		const textArea = document.createElement('textarea')
		textArea.className = className
		textArea.cols = 60
		return textArea
	}
}