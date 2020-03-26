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
 */
function createCSSTestingComponent(options) {
	create()

	function create() {
		const cssTestingComponentEl = createCSSTestComponentWrapper(options.parent)
		const iframeEl = createIframe(cssTestingComponentEl)
		const inputWrapperEl = document.createElement('div')

		// Create inputs.
		inputWrapperEl.className = 'css-testing-component_input-wrapper'
		cssTestingComponentEl.prepend(inputWrapperEl)
		inputWrapperEl.append(createHTMLTextArea(iframeEl))
		inputWrapperEl.append(createCSSTextArea(iframeEl))
	}

	/* Utility functions */
	function createIframe(cssTestingComponentEl) {
		const iframeEl = document.createElement('iframe')
		iframeEl.className = 'css-testing-component_iframe'
		cssTestingComponentEl.appendChild(iframeEl)
		return iframeEl
	}

	function createCSSTestComponentWrapper(parent) {
		const wrapperEl = document.createElement('div')
		wrapperEl.className = 'css-testing-component'
		// We need to append our iframe to the actual DOM before iframe.contentWindow is defined, which we need to edit its
		// content. That's why we ask for a parent element as input.
		parent.append(wrapperEl)
		return wrapperEl
	}

	function createHTMLTextArea(iframe) {
		const htmlTextAreaEl = createTextArea('css-test-component__html')
		if(options.defaultHTML) htmlTextAreaEl.innerHTML = options.defaultHTML

		const updateIframeHTMLContent = () =>
			iframe.contentWindow.document.querySelector('body').innerHTML = htmlTextAreaEl.value
		htmlTextAreaEl.addEventListener('input', updateIframeHTMLContent)

		// Update for the first time.
		updateIframeHTMLContent()

		return htmlTextAreaEl
	}

	function createCSSTextArea(iframe) {
		const cssTextAreaEl = createTextArea('css-test-component__css')
		if(options.defaultCSS) cssTextAreaEl.innerHTML = options.defaultCSS

		// Create a style tag inside the iframe we will update with our styles.
		const iframeStyleTag = iframe.contentWindow.document.createElement('style')
		iframe.contentWindow.document.querySelector('head').append(iframeStyleTag)

		const updateIframeCSSContent = () => iframeStyleTag.innerHTML = cssTextAreaEl.value
		cssTextAreaEl.addEventListener('input', updateIframeCSSContent)

		// Add initial content to iframe.
		updateIframeCSSContent()

		return cssTextAreaEl
	}

	function createTextArea(className) {
		const textArea = document.createElement('textarea')
		textArea.className = className
		textArea.cols = 60
		textArea.rows = 5
		return textArea
	}
}