const basicKeyframe = `
@keyframes up-left {
	from {
		transform: translate(100px, 100px);
	}
	to {
		transform: translate(0, 0);
	}
}`;

createCSSTestingComponent({
	parent: document.querySelector('.example-keyframes'),
	buttons: [{
		label: 'Basic',
		html: `<div class="a"></div>`,
		description: `Click the button to trigger keyframe again.`,
		reset: true,
		css: `
${basicKeyframe}
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	animation: up-left 1500ms;
}`
	}, {
		label: 'Multiple properties',
		html: `<div class="a"></div>`,
		css: `
@keyframes multiple-props {
	from {
		transform: translate(100px, 100px);
		background: red;
		border-radius: 100%;
	}
	to {
		transform: translate(0, 0);
	}
}
.a {
	background: dodgerblue;
	animation: multiple-props 1500ms;
	width: 50px;
	height: 50px;
}`
	}, {
		label: 'Custom timing function',
		html: `<div class="a"></div>`,
		css: `
${basicKeyframe}
.a {
	background: dodgerblue;
	animation: up-left 1500ms;
	animation-timing-function: cubic-bezier(.29, 1.01, 1, -0.68);
	width: 50px;
	height: 50px;
}`
	}, {
		label: 'Multiple iterations',
		html: `<div class="a"></div>`,
		css: `
${basicKeyframe}
.a {
	background: dodgerblue;
	animation: up-left 1500ms;
	animation-iteration-count: 2;
	width: 50px;
	height: 50px;
}`
	}, {
		label: 'Multiple iterations - infinite',
		html: `<div class="a"></div>`,
		css: `
${basicKeyframe}
.a {
	background: dodgerblue;
	animation: up-left 1500ms;
	animation-iteration-count: infinite;
	width: 50px;
	height: 50px;
}`
	}]
})
