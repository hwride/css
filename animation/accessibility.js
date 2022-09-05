createCSSTestingComponent({
	parent: document.querySelector('.example-accessibility'),
	buttons: [{
		label: 'Transition, progression enhancement',
		html: `<div class="a"></div>`,
		description: `Try disabling animations in your operating system, you should see the transition is disabled.`,
		reset: true,
		css: `
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	opacity: 1;
}
.a:hover {
	opacity: 0;
}

@media (prefers-reduced-motion: no-preference) {
  .a {
    transition: opacity 500ms;
  }
}
`
	}, {
		label: 'Animation, progressive enhancement',
		html: `<div class="a"></div>`,
		description: `Note again the default is having animation disabled. We do this with an animation time of 0.001ms 
instead of 0ms, because some older browsers treat 0 as a null value which would disable the animation entirely`,
		css: `
@keyframes fade-out {
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
}
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	animation-fill-mode: both;
	animation-duration: 0.001ms;
}
.a:hover {
	animation-name: fade-out;
}

@media (prefers-reduced-motion: no-preference) {
	.a:hover {
		animation-duration: 1000ms;
	}
}
`
	}, {
		label: 'Transition, graceful degradation',
		html: `<div class="a"></div>`,
		description: `Here the transition is enabled by default, but disabled if the user has opted out of animations.`,
		css: `
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	transition: opacity 500ms;
	opacity: 1;
}
.a:hover {
	opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .a {
    transition: none;
  }
}
`
	}]
})
