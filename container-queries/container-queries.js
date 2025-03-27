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
	}, {
		label: 'Change background with container-type: inline-size',
		html: `<div class="container">
  <div class="child"></div>
</div>`,
		description: `
<p>
	When using <code>container-type: inline-size</code> the <b>height</b> of a container will still adjust based on its 
	contents (but not the width). You can test this by adding <code>width: fit-content;</code> to 
	<code>.container</code> and see that it shrinks below the width of its content, but the height still wraps content.
</p>
<p>
	The idea behind these different properties is to allow us to say what the container will ignore from its children
	to avoid potential infinite loops with container queries. This can happen for example if you have a container
	query based on width, which causes a child to increase in size and negate the container query rule, causing an 
	infinite loop.
</p>
`,
		css: `
.container {
	container-type: inline-size;
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
