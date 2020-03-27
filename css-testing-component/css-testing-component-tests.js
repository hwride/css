runTests({
	tests: [
		testBasic,
		testHeight
	],
	teardown,
	afterAll
})

function teardown() {
	document.querySelector('.content').innerHTML = ''
}

function afterAll() {
	window.cssTestingComponent = createCSSTestingComponent(getDefaultOptions())
}

function getDefaultOptions(overrides) {
	return {
		...overrides,
		parent: document.querySelector('.content'),
		defaultHTML: `
<div class="my-div">
</div>
`.trim(),
		defaultCSS: `
.my-div {
  background: dodgerblue;
  height: 50px;
}
`.trim()
	}
}

/* Tests */
function testBasic() {
	const options = getDefaultOptions()
	const cssTestingComponent = createCSSTestingComponent(options)

	// iframe HTML should be correct
	assert(getIframeHTML(cssTestingComponent) === options.defaultHTML)

	// iframe style should be correct
	assert(getIframeCustomCSS(cssTestingComponent) === options.defaultCSS)

	// should update on change of HTML text area
	const htmlTextArea = document.querySelector('.css-test-component__html')
	const newHTMLValue = '<span>Test</span>'
	htmlTextArea.value = newHTMLValue
	htmlTextArea.dispatchEvent(new Event('input'))
	assert(getIframeHTML(cssTestingComponent) === newHTMLValue)

	// should update on change of CSS text area
	const cssTextArea = document.querySelector('.css-test-component__css')
	const newCSSValue = 'span { color: dodgerblue; }'
	cssTextArea.value = newCSSValue
	cssTextArea.dispatchEvent(new Event('input'))
	assert(getIframeCustomCSS(cssTestingComponent) === newCSSValue)
}

function testHeight() {
	const options = getDefaultOptions({ height: '150px' })
	const cssTestingComponent = createCSSTestingComponent(options)
	assert(cssTestingComponent.style.height === options.height)
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