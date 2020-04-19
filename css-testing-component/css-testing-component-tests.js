runTests({
	tests: [
		testBasic,
		testUpdate,
		testTextAreHeights,
		testButtons
	]
})

function getDefaultOptions(overrides) {
	return {
		parent: document.querySelector('.content'),
		html: `
<div class="my-div"></div>
`,
		css: `
.my-div {
  background: dodgerblue;
  height: 50px;
}
`,
		...overrides
	}
}

/* Tests */
async function testBasic() {
	addTestTitle('Basic')
	const options = getDefaultOptions()
	const cssTestingComponent = await createCSSTestingComponent(options)

	// iframe HTML should be correct
	assert(getIframeHTML(cssTestingComponent) === options.html.trim())

	// iframe style should be correct
	assert(getIframeResetCSS(cssTestingComponent).includes('margin: 0'))
	assert(getIframeCustomCSS(cssTestingComponent) === options.css.trim())
}

async function testUpdate() {
	addTestTitle('Update of text areas')
	const cssTestingComponent = await createCSSTestingComponent(getDefaultOptions())

	// should update on change of HTML text area
	const newHTMLValue = '<span>Test</span>'
	setHTMLTextAreaValue(cssTestingComponent, newHTMLValue)
	assert(getIframeHTML(cssTestingComponent) === newHTMLValue)

	// should update on change of CSS text area
	const newCSSValue = 'span { color: dodgerblue; }'
	setCSSTextAreaValue(cssTestingComponent, newCSSValue)
	assert(getIframeCustomCSS(cssTestingComponent) === newCSSValue)
}

async function testTextAreHeights() {
	addTestTitle('Text area heights')
	const options = getDefaultOptions({
		htmlMaxLines: 3,
		cssMaxLines: 3,
		css: `
.my-div {
  background: dodgerblue;
  height: 50px;
  width: 50px;
  border: 10px solid red;
  padding: 20px;
  margin: 20px;
}`
	})
	const cssTestingComponent = await createCSSTestingComponent(options)
	assert(cssTestingComponent.htmlEditor.getOption('maxLines') === options.htmlMaxLines)
	assert(cssTestingComponent.cssEditor.getOption('maxLines') === options.cssMaxLines)
}

async function testButtons() {
	addTestTitle('Text buttons')
	const options = getDefaultOptions({
		description: 'This is the default description',
		buttons: [{
			reset: true
		}, {
			label: 'Change to green',
			description: 'You can supply description text which will be displayed when the button is clicked',
			html: '<div>I am button one contents</div>',
			css: 'div { background: green; }'
		}, {
			label: 'No description',
			html: '<div>Should show no description</div>'
		}]
	})
	const cssTestingComponent = await createCSSTestingComponent(options)

	// Initial description should be there.
	assert(getDescription(cssTestingComponent) === options.description)

	// Test button 1.
	clickButton(cssTestingComponent, 1)
	assert(getHTMLTextAreaValue(cssTestingComponent) === options.buttons[1].html)
	assert(getCSSTextAreaValue(cssTestingComponent) === options.buttons[1].css)
	assert(getDescription(cssTestingComponent) === options.buttons[1].description)

	// Test reset.
	clickButton(cssTestingComponent, 0)
	assert(getHTMLTextAreaValue(cssTestingComponent) === options.html.trim())
	assert(getCSSTextAreaValue(cssTestingComponent) === options.css.trim())
	assert(getDescription(cssTestingComponent) === options.description)

	// Test a button showing no description.
	clickButton(cssTestingComponent, 2)
	assert(getDescription(cssTestingComponent) === '')
}

/* Utility functions */
function addTestTitle(title) {
	const titleEl = document.createElement('h3')
	titleEl.innerText = title
	document.querySelector('.content').appendChild(titleEl)
}

function getIframeDocument(cssTestingComponent) {
	return cssTestingComponent.el.querySelector('.css-testing-component__iframe').contentWindow.document
}
function getIframeHTML(cssTestingComponent) {
	return getIframeDocument(cssTestingComponent).querySelector('body').innerHTML
}
function getIframeResetCSS(cssTestingComponent) {
	return getIframeDocument(cssTestingComponent).querySelector('head style[data-name="reset"]').innerHTML
}
function getIframeCustomCSS(cssTestingComponent) {
	return getIframeDocument(cssTestingComponent).querySelector('head style[data-name="custom"]').innerHTML
}
function getHTMLTextAreaValue(cssTestingComponent) {
	return cssTestingComponent.htmlEditor.getValue()
}
function setHTMLTextAreaValue(cssTestingComponent, value) {
	return cssTestingComponent.htmlEditor.setValue(value, -1)
}
function getCSSTextAreaValue(cssTestingComponent) {
	return cssTestingComponent.cssEditor.getValue()
}
function setCSSTextAreaValue(cssTestingComponent, value) {
	return cssTestingComponent.cssEditor.setValue(value, -1)
}
function clickButton(cssTestingComponent, index) {
	const button = cssTestingComponent.el.querySelectorAll('.css-testing-component__buttons button')[index]
	button.dispatchEvent(new Event('click'))
}
function getDescription(cssTestingComponent) {
	return cssTestingComponent.el.querySelector('.css-testing-component__description').innerHTML
}

/* Mini test framework functions */
function runTests(options) {
	// Support async tests if the test function returns a Promise.
	options.tests.reduce(async (lastTestPromise, nextTest) => {
		await lastTestPromise
		const testReturnVal = nextTest()
		const testPromise = testReturnVal instanceof Promise ? testReturnVal : Promise.resolve()
		await testPromise
		if(options.teardown) options.teardown()
	}, Promise.resolve())

	if(options.afterAll) options.afterAll()
}

function assert(boolean) {
	if(!boolean) throw new Error('Assert failed')
}