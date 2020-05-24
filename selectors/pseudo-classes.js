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
		parent: document.querySelector('.example-pseudo-classes'),
		description: `Selects the first child of an element. Note this is not the first child of the given type/class, but
the actual first child. See how <code>bb</code> is not styled as even though it is the first 
<code>span</code>, because it is not the first child.`,
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
		}, {
			label: ':nth-child() and :nth-last-child()',
			description: `The first child has an index of 1.`,
			html: firstChildHTML,
			css: `
div :nth-child(2) {
	background: dodgerblue;
}
/* This is like :nth-child but 
   starts counting from the end. */
div :nth-last-child(1) {
	background: green;
}`
		}, {
			label: ':nth-child() with n',
			description: `If you specify <code>n</code> in your count, it will match every match every element after filling
in <code>n</code> with 1, 2, 3, etc. You can also add an subtract fixed values from this equation.`,
			html: `<div class="simple">
	<span>aa</span>
	<span>ab</span>
	<span>ac</span>
	<span>ad</span>
</div>
<div class="complex">
	<span>ba</span>
	<span>bb</span>
	<span>bc</span>
</div>`,
			css: `
.simple :nth-child(2n) {
	background: dodgerblue;
}

.complex :nth-child(2n-1) {
	background: dodgerblue;
}`
		}, {
			label: ':only-child',
			html: `<div>
	<span>aa</span>
	<span>ab</span>
</div>
<div>
	<span>ba</span>
</div>`,
			css: `
div :only-child {
	background: dodgerblue;
}`
		}, {
			label: ':first-of-type and :last-of-type',
			description: `This is the first element of the specified type among a group of siblings.`,
			html: firstChildHTML,
			css: `
div span:first-of-type {
	background: dodgerblue;
}
div div:last-of-type {
	background: green;
}`
		}, {
			label: ':nth-of-type() and :nth-last-of-type()',
			html: `<div>
	<span>aa</span>
	<span>ab</span>
	<span>ac</span>
</div>
<div>
	<span>ba</span>
	<span>bb</span>
	<span>bc</span>
</div>`,
			css: `
div span:nth-of-type(2) {
	background: dodgerblue;
}
div span:nth-last-of-type(1) {
	background: green;
}`
		}, {
			label: ':link, :visited',
			description: `Historically you could work out a user's browsing history by getting information from the 
<code>:visited</code> selector. This usage is now blocked by modern browsers, see
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Privacy_and_the_:visited_selector">here</a>.`,
			html: `
<a href="">One</a>
<a href="#not-visited">Two</a>`,
			css: `
/* Links that have not been visited */
:link {
	color: dodgerblue;
}
/* Link that have been visited */
:visited {
	color: red;
}`
		}, {
			label: ':hover',
			description: `Triggers when you hover over an element. Note <code>:hover</code> works differently on different
mobile browsers. It might not match, match for a moment, or match until the user clicks away after touching the element.`,
			html: ` <div></div>`,
			css: `
div {
	background: dodgerblue;
	width: 50px;
	height: 50px;
}
div:hover {
	background: green;
}`
		}, {
			label: ':active',
			description: `Triggers when an element is "activated". When using a mouse this is when the user clicks on an 
element and is holding down the mouse button.`,
			html: `<button>Click me</button>
<div></div>`,
			css: `
div {
	background: dodgerblue;
	width: 50px;
	height: 50px;
}
button:active,
div:active {
	background: green;
}`
		}, {
			label: ':focus',
			description: `Triggers when an element has focus. This is generally when the element is clicked or tabbed to.`,
			html: `
<input type="text">
<input type="text">
`,
			css: `
:focus {
	background: dodgerblue;
}`
		}, {
			label: ':not()',
			description: `Allows matching the opposite of a selector. There is a comma separated version of the selector but
it is not well supported yet.`,
			html: `<div>
	<span>a</span>
	<div>b</div>
	<span>c</span>
	<p>d</p>
</div>
`,
			css: `
div :not(span) {
	background: dodgerblue;
}

div :not(div):not(span) {
	background: green;
}`
		}, {
			label: ':is()',
			description: `Allows you to match multiple selectors in a single pseudo-class. This is useful if you combine it 
with a descendant selector to avoid duplicating the descendant selector multiple times. Note this is currently not well
supported with the default selector.`,
			html: `<div class="parent-1">
	<span>a</span>
</div>
<div class="parent-2">
	<span>b</span>
</div>
`,
			css: `
:is(.parent-1, .parent-2) span {
	background: dodgerblue;
}`
		}, {
			label: ':root',
			description: `Root element in the document. In HTML the same as <code>html</code>. Useful for adding global CSS
variables to.`,
			html: `<div></div> `,
			css: `
:root {
	background: dodgerblue;
	--div-height: 50px;
}
div {
	background: green;
	height: var(--div-height);
}`
		}, {
			label: 'Multiple pseudo classes',
			html: `<div class="a"></div>
<div class="a"></div>`,
			css: `
div {
	background: dodgerblue;
	width: 50px;
	height: 50px;
}
.a:first-child:hover {
	background: green;
}`
		}]
	})
})()