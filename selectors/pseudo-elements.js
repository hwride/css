(function() {
	const firstChildHTML = `<div>
	<span>aa</span>
	<span>ab</span>
	<div>ac</div>
</div>
<div>
	<div>ba</div>
	<span>bb</span>
	<span>bc</span>
</div>`
	createCSSTestingComponent({
		parent: document.querySelector('.example-pseudo-elements'),
		html: firstChildHTML,
		css: `
div :first-child {
	background: dodgerblue;
}
div span:first-child {
	border: 2px solid red;
}`,
		buttons: [{
			label: ':first-child',
			reset: true
		}, {
			label: ':last-child',
			html: firstChildHTML,
			css: `
div :last-child {
	background: dodgerblue;
}
div span:last-child {
	border: 2px solid red;
}`
		}]
	})
})()