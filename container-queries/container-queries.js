createCSSTestingComponent({
	parent: document.querySelector('.container-queries'),
	buttons: [{
		label: 'Change background',
		html: `<div class="container">
  <div class="child"></div>
</div>`,
		description:
			`Try changing the width of the container to be <code>100px</code> or less to see the container query apply.`,
		reset: true,
		css: `
.container {
	container-type: size;
	width: 200px;
	height: 200px;
	border: 1px dotted black;
}
.child {
	width: 50px;
	height: 50px;
	background: dodgerblue;
}

@container (max-width: 100px) {
	.child {
		background: salmon;
	}
}
`
	}]
})
