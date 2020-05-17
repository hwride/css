createCSSTestingComponent({
	parent: document.querySelector('.example-transitions'),
	description: `Try moving the mouse off the block halfway through the transition then back on to it. Notice that the
target state changes and the block starts moving to the new target from where it is, it doesn't reset to the original
and then start transitioning from there.`,
	html: `<div class="a"></div>`,
	css: `
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	transition: width 2s;
}
.a:hover {
	width: 200px;
}`,
	buttons: [{
		label: 'Simple width transition',
		reset: true
	}, {
		label: 'Delay',
		html: `<div class="a"></div>`,
		css: `
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	transition-property: width;
	transition-duration: 2s;
	transition-delay: 0.5s;
}
.a:hover {
	width: 200px;
}`
	}, {
		label: 'Multiple properties',
		description: `Note how you can set different durations for different properties. The same applies for the other
transition properties.`,
		html: `<div class="a"></div>`,
		css: `
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	transition-property: width, height, background;
	transition-duration: 2s, 1s, 3s;
}
.a:hover {
	background: green;
	width: 200px;
	height: 100px;
}`
	}, {
		label: 'Multiple properties - shorthand',
		html: `<div class="a"></div>`,
		css: `
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	transition: width 2s, height 1s, background 3s;
}
.a:hover {
	background: green;
	width: 200px;
	height: 100px;
}`
	}, {
		label: 'Transition function - steps',
		html: `<div class="a"></div>`,
		css: `
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	transition: width 2s steps(5, end);
}
.a:hover {
	width: 200px;
}`
	}, {
		label: 'Transition function - cubic',
		html: `<div class="a"></div>`,
		css: `
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	transition: width 2s cubic-bezier(.29, 1.01, 1, -0.68);
}
.a:hover {
	width: 200px;
}`
	}]
})