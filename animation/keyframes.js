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
	}, {
		label: 'Fill mode - forwards',
		description: `<p>
	Normally the properties we specify in keyframes only apply while the animation is running. This means if we animated
	a property to be another value, it would reset to whatever the normal value is after the animation is over.
</p>
<p>
	You can specify <code>animation-fill-mode: forwards</code> to change this behaviour, and have the final values of
	properties set in keyframe animations persist after the animation is over.
</p>
<p>
	Notice here how only the second div remains with opacity 0 after the animation as finished. 
</p>`,
		html: `<div class="animate"></div>
<div class="animate fill-mode-forwards"></div>`,
		css: `
@keyframes fade-out {
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
}
.animate {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	animation: fade-out 1500ms;
}
.fill-mode-forwards {
	animation-fill-mode: forwards;
	margin-top: 8px;
}`
	}, {
		label: 'Fill mode - backwards',
		description: `<p>
	This is opposite of <code>forwards</code>, and will start the element with any properties an animation would begin
	with.
</p>
<p>
	Notice here how the top element begins visible, and only turns invisible when the animation beings, causing a flashing
	effect, rather than just fading in. When <code>animation-fill-mode: backwards</code> is enabled it begins faded out.
</p>`,
		html: `<div class="animate"></div>
<div class="animate fill-mode-backwards"></div>`,
		css: `
@keyframes fade-out {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
.animate {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	animation: fade-out 1500ms;
	animation-delay: 500ms;
}
.fill-mode-backwards {
	animation-fill-mode: backwards;
	margin-top: 8px;
}`
	}, {
		label: 'Fill mode - both',
		description: `<p>
	This causes the animation to begin and end with properties that the animation would set. This is a good value to use
	as a default for your keyframe animations as you generally want this behaviour.
</p>
<p>
	The intention here is the blue squares start at the start line, animate to the middle line for the middle of the 
	animation then end up back at the end line. Notice here how: 
</p>
<ol>
	<li>The top item both begins and ends at the middle line which is incorrect.</li>
	<li>The second item start correctly, but ends at the middle line which is incorrect.</li>
	<li>The third item ends correctly, but starts at the middle line which is incorrect.</li>
	<li>The fourth item appears correctly for the whole animation.</li>
</ol>`,
		html: `<div class="wrapper">
	<div class="animate"></div>
	<div class="animate fill-mode-backwards"></div>
	<div class="animate fill-mode-forwards"></div>
	<div class="animate fill-mode-both"></div>
</div>`,
		css: `@keyframes fade-out {
	0% {
		transform: translateX(50px);
	}
	50% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(50px);
	}
}
.animate {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	animation: fade-out 1500ms;
	animation-delay: 500ms;
	margin-bottom: 8px;
}
.fill-mode-backwards {
	animation-fill-mode: backwards;
}
.fill-mode-forwards {
	animation-fill-mode: forwards;
}
.fill-mode-both {
	animation-fill-mode: both;
}


.wrapper {
    display: inline-block;
    position: relative;
    width: 100px;
    margin-left: 50px;
    border-left: 1px solid black;
    border-right: 1px solid black;
}
.wrapper:before {
    content: 'Middle';
    position: absolute;
    left: -3rem;
}
.wrapper:after {
    content: 'Start and end';
    position: absolute;
    right: -11ch;
    top: 0;
}`
	}]
})
