createCSSTestingComponent({
	parent: document.querySelector('.container-queries'),
	buttons: [{
		label: 'Change background with container-type: size',
		html: `<div class="container">
  <div class="child"></div>
</div>`,
		description: `
<p>Try changing the width of the container to be <code>100px</code> or less to see the container query apply.</p>
<p>
	Also note how if you use <code>container-type: size</code> a container will no longer use its children in its size
	calculations. Remove the width and height from the <code>.container</code> CSS and note how the height does not wrap
	its child as it would do normally.
</p>
`,
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
