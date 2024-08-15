createCSSTestingComponent({
	parent: document.querySelector('.example-animate-height'),
	description: ``,
	html: `<div class="a"></div>`,
	css: `
.a {
	background: dodgerblue;
	height: 50px;
	width: 50px;
	transition: height 1s;
}
.a:hover {
	height: 100px;
}`,
	buttons: [{
		label: 'Fixed height change',
		reset: true
	}]
})
