runTests({
	tests: [
		testBasic,
		testTextAreHeights
	],
	teardown,
	afterAll
})

function teardown() {
	document.querySelector('.content').innerHTML = ''
}

function afterAll() {
	testTextAreHeights()
}

function getDefaultOptions(overrides) {
	return {
		parent: document.querySelector('.content'),
		defaultHTML: `
<div class="my-div"></div>
`,
		defaultCSS: `
.my-div {
  background: dodgerblue;
  height: 50px;
}
`,
		...overrides
	}
}

/* Tests */
function testBasic() {
	const options = getDefaultOptions()
	const cssTestingComponent = createCSSTestingComponent(options)

	// iframe HTML should be correct
	assert(getIframeHTML(cssTestingComponent) === options.defaultHTML.trim())

	// iframe style should be correct
	assert(getIframeCustomCSS(cssTestingComponent) === options.defaultCSS.trim())

	// should update on change of HTML text area
	const htmlTextArea = getHTMLTextArea(cssTestingComponent)
	const newHTMLValue = '<span>Test</span>'
	htmlTextArea.value = newHTMLValue
	htmlTextArea.dispatchEvent(new Event('input'))
	assert(getIframeHTML(cssTestingComponent) === newHTMLValue)

	// should update on change of CSS text area
	const cssTextArea = getCSSTextArea(cssTestingComponent)
	const newCSSValue = 'span { color: dodgerblue; }'
	cssTextArea.value = newCSSValue
	cssTextArea.dispatchEvent(new Event('input'))
	assert(getIframeCustomCSS(cssTestingComponent) === newCSSValue)
}

function testTextAreHeights() {
	const options = getDefaultOptions({
		htmlHeight: '1em',
		cssHeight: '9em',
		defaultCSS: `
.my-div {
  background: dodgerblue;
  height: 50px;
  width: 50px;
  border: 10px solid red;
  padding: 20px;
  margin: 20px;
}`
	})
	const cssTestingComponent = createCSSTestingComponent(options)
	assert(getHTMLTextArea(cssTestingComponent).style.flexBasis === options.htmlHeight)
	assert(getCSSTextArea(cssTestingComponent).style.flexBasis === options.cssHeight)
}

/* Utility functions */
function getIframeHTML(cssTestingComponent) {
	const iframe = cssTestingComponent.querySelector('.css-testing-component_iframe')
	return iframe.contentWindow.document.querySelector('body').innerHTML
}
function getIframeCustomCSS(cssTestingComponent) {
	const iframe = cssTestingComponent.querySelector('.css-testing-component_iframe')
	return iframe.contentWindow.document.querySelector('head style[data-name="custom"]').innerHTML
}
function getHTMLTextArea(cssTestingComponent) {
	return cssTestingComponent.querySelector('.css-test-component__html')
}
function getCSSTextArea(cssTestingComponent) {
	return cssTestingComponent.querySelector('.css-test-component__css')
}

/* Mini test framework functions */
function runTests(options) {
	options.tests.forEach(test => {
		test()
		if(options.teardown) options.teardown()
	})
	if(options.afterAll) options.afterAll()
}

function assert(boolean) {
	if(!boolean) throw new Error('Assert failed')
}