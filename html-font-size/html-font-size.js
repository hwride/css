async function createTestingComponentWithFontSizeStuff({ cssTestingComponentComponentOpts, infoQuerySelector }) {
	const cssTestingComponent = await createCSSTestingComponent(cssTestingComponentComponentOpts)
	const iframe = cssTestingComponent.el.querySelector('iframe')
	const getElFontSize = elName => iframe.contentWindow.getComputedStyle(iframe.contentDocument.querySelector(elName))['font-size']
	document.querySelector(infoQuerySelector).innerHTML = `
<table>
	<thead>
		<tr>
			<th>Element</th>
			<th>Computed font size</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>&lt;html&gt;</code></td>
			<td><code>${getElFontSize('html')}</code></td>
		</tr>
		<tr>
			<td><code>&lt;p&gt;</code></td>
			<td><code>${getElFontSize('p')}</code></td>
		</tr>
	</tbody>
</table>
`
}

(async function() {
	await createTestingComponentWithFontSizeStuff({
		cssTestingComponentComponentOpts: {
			parent: document.querySelector('.example-font-size-default'),
			html: `<p>This is some text.</p>`,
			css: `
p {
  font-size: 1rem;
}`
		},
		infoQuerySelector: '.example-font-size-info-default'
	})

	await createTestingComponentWithFontSizeStuff({
		cssTestingComponentComponentOpts: {
			parent: document.querySelector('.example-font-size-fixed'),
			html: `<p>This is some text.</p>`,
			css: `
html {
  font-size: 10px;
}
p {
  font-size: 1rem;
}`
		},
		infoQuerySelector: '.example-font-size-info-fixed'
	})
})()
