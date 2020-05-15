/*
	Component which can be used for testing/demoing CSS on a page. Shoes two text areas with HTML and CSS which are
	rendered in an iframe. The iframe will update automatically when the text is changed.

	Note ensure you import the following:
	- lib/ace/src-noconflict/ace.js
	- css-testing-component.css
	- css-testing-component.js

	Then call: createCSSTestingComponent(options)
 */

/**
 * Create a CSS test component.
 *
 * @param options.parent Parent element to append the CSS test component to.
 * @param options.html Default HTML that should be used.
 * @param options.css Default CSS that should be used.
 * @param options.hiddenCSS CSS that you want included but not displayed in the editor panel.
 * @param options.description Default description to be displayed.
 * @param {[{label, description, html, css}]} options.buttons Buttons which can switch content in the component.
 *
 * If description is provided it will be displayed when the button is clicked.
 *
 * If a button has reset: true instead of html and css it will be a reset button. A default label is supplied with the
 * reset button.
 * @param options.htmlMaxLines Maximum number of lines the HTML area can take. Otherwise defaults to initial content.
 * @param options.cssMaxLines Maximum number of lines the CSS area can take. Otherwise defaults to initial content. The
 * iframe height will be equal to the height of both text areas.
 * @return Promise which resolves with some CSS testing component objects.
 */
function createCSSTestingComponent(options) {
	const CURSOR_START_POSITION = -1 // -1 = start of text

	validate();
	return create()

	function validate() {
		if(!options.parent) {
			throw new Error('CSS testing component must be provided with a parent')
		}
	}

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
			inputWrapperEl.className = 'css-testing-component__editors'
			inputAndIframeRow.prepend(inputWrapperEl)

			// Create description row.
			const descriptionEl = createDescription(options.description)
			cssTestingComponentEl.append(descriptionEl)

			// For some reason setting the iframe content doesn't work properly on Firefox 74 unless you tick the event queue
			// once. For this reason set all initial iframe content here.
			setTimeout(() => {
				addStyleTagToIframe(iframeEl, 'reset', `
  body {
    margin: 0;
  }
`)
				if(options.hiddenCSS) {
					addStyleTagToIframe(iframeEl, 'hidden', options.hiddenCSS)
				}

				// Creating the text areas adds inital HTML and CSS to the iframe.
				const htmlEditor = createHTMLEditor(inputWrapperEl, iframeEl, initialHTML, options.htmlMaxLines)
				const cssEditor = createCSSEditor(inputWrapperEl, iframeEl, initialCSS, options.cssMaxLines)
				resolve({
					htmlEditor,
					cssEditor,
					el: cssTestingComponentEl
				})

				// Create buttons.
				if(options.buttons) {
					const buttonsEl = createButtons({
						buttons: options.buttons,
						initialHTML,
						initialCSS,
						initialDescription,
						htmlEditor,
						cssEditor,
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

	function addStyleTagToIframe(iframeEl, name, content) {
		const iframeStylesTag = iframeEl.contentWindow.document.createElement('style')
		iframeStylesTag.dataset.name = name
		iframeStylesTag.innerHTML = content
		iframeEl.contentWindow.document.querySelector('head').append(iframeStylesTag)
		return iframeStylesTag
	}

	function createCSSTestComponentWrapper(parent) {
		const cssTestingComponentEl = document.createElement('div')
		cssTestingComponentEl.className = 'css-testing-component'
		// We need to append our iframe to the actual DOM before iframe.contentWindow is defined, which we need to edit its
		// content. That's why we ask for a parent element as input.
		parent.append(cssTestingComponentEl)
		return cssTestingComponentEl
	}

	function createEditor(parentEl, iframeEl, modeHighlighting, initialContent, maxLines, onChange) {
		// Create tag and add to DOM. ace.js requires the element to be in the DOM when you initialise it.
		const editorEl = document.createElement('div')
		editorEl.className = 'css-testing-component__editor'
		parentEl.append(editorEl)

		// Setup editor.
		var editor = ace.edit(editorEl);
		editor.setOptions({
			maxLines: maxLines != null ? maxLines : 50,
			highlightActiveLine: false
		})
		editor.setTheme("ace/theme/chrome")
		editor.session.setMode(modeHighlighting)
		editor.session.setUseWorker(false) // Disable syntax checking and warnings.

		// Set initial content.
		editor.setValue(initialContent, CURSOR_START_POSITION)

		// Trigger change callback on change.
		const triggerOnChange = () => onChange(editor.getValue())
		editor.session.on('change', triggerOnChange)

		// Update for the first time.
		triggerOnChange()

		return editor
	}

	function createHTMLEditor(parentEl, iframeEl, initialHTML, maxLines) {
		return createEditor(parentEl, iframeEl, 'ace/mode/html', initialHTML, maxLines, newValue => {
			iframeEl.contentWindow.document.querySelector('body').innerHTML = newValue
		})
	}

	function createCSSEditor(parentEl, iframeEl, initialCSS, maxLines) {
		// Create a style tag inside the iframe we will update with our styles.
		const iframeCustomStyleTag = addStyleTagToIframe(iframeEl, 'custom', initialCSS)
		return createEditor(parentEl, iframeEl, 'ace/mode/css', initialCSS, maxLines, newValue => {
			iframeCustomStyleTag.innerHTML = newValue
		})
	}

	function createButtons({ buttons, initialHTML, initialCSS, initialDescription, htmlEditor, cssEditor, descriptionEl }) {
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
				// Note HTML and CSS don't have to be provided to allow a button to change only one field but leave the last
				// value there. This is not the same for description where we want an empty description to be cleared.
				if(buttonHTML != null) htmlEditor.setValue(buttonHTML.trim(), CURSOR_START_POSITION)
				if(buttonCSS != null) cssEditor.setValue(buttonCSS.trim(), CURSOR_START_POSITION)
				descriptionEl.innerHTML = buttonDescription ? buttonDescription : ''
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
}