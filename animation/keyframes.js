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
	width: 50px;
	height: 50px;
	animation: multiple-props 1500ms;
}`
	}, {
		label: 'Custom timing function',
		html: `<div class="a"></div>`,
		css: `
${basicKeyframe}
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	animation: up-left 1500ms;
	animation-timing-function: cubic-bezier(.29, 1.01, 1, -0.68);
}`
	}, {
		label: 'Multiple iterations',
		html: `<div class="a"></div>`,
		css: `
${basicKeyframe}
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	animation: up-left 1500ms;
	animation-iteration-count: 2;
}`
	}, {
		label: 'Multiple iterations - infinite',
		html: `<div class="a"></div>`,
		css: `
${basicKeyframe}
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	animation: up-left 1500ms;
	animation-iteration-count: infinite;
}`
	}, {
		label: 'Multi-step',
		description: `The % refers to how far through the animation the properties should be applied.
Note you must specify the original state as 100% if you want there to be a transition back to that state. Try deleting
the 100% part of the keyframe and see how it breaks the animation.`,
		html: `<div class="a"></div>`,
		css: `
@keyframes loading-pulse {
	0% {
		transform: 
				translate(25px, 25px) 
				scale(1);
	}
	25% {
		transform: 
				translate(0px, 25px) 
				scale(1.1);
	}
	50% {
		transform: 
				translate(0px, 0px) 
				scale(1.2);
	}
	75% {
		transform: 
				translate(25px, 0px) 
				scale(1.1);
	}
	100% {
		transform: 
				translate(25px, 25px) 
				scale(1);
	}
}
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	margin: 50px;
	animation: loading-pulse 750ms;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}`
	}, {
		label: 'Multi-step - timing function',
		description: `Note the timing function applies individually to each step of the keyframe, not across the entire
animation. See here each step has the unique jumpiness of the custom cubic-bezier, as opposed to the entire loop.`,
		html: `<div class="a"></div>`,
		css: `
@keyframes multi-step {
	0% {
		transform: translate(75px, 75px) 
	}
	25% {
		transform: translate(0px, 75px) 
	}
	50% {
		transform: translate(0px, 0px) 
	}
	75% {
		transform: translate(75px, 0px) 
	}
	100% {
		transform: translate(75px, 75px) 
	}
}
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	margin: 50px;
	animation: multi-step 2500ms;
	animation-iteration-count: infinite;
	animation-timing-function: cubic-bezier(.29, 1.01, 1, -0.68);
}`
	}, {
		label: 'Animation direction',
		description: `<p>
Normally animations will go from 0% to 100% then start again at 0% 
(the default of <code>animation-direction: normal</code>). You can customize this to go from 100% to 0% with 
<code>animation-direction: reverse</code>, or 0% to 100%, then back to 0% with
<code>animation-direction: alternate</code>.
</p>
<p>
	Note that when you use <code>animation-direction: alternate</code> the animation time is now split in half between
	going back and forth, so if you want to maintain the same time in each direction you need to double the time.
</p>`,
		html: `<div class="a"></div>`,
		css: `
${basicKeyframe}
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	animation: up-left 1500ms;
	animation-iteration-count: infinite;
	animation-direction: alternate;
}`
	}]
})
