(function() {
	createCSSTestingComponent({
		parent: document.querySelector('.example-pseudo-elements'),
		description: `Be default content for <code>::before</code> and <code>::after</code> is 
<code>display: inline</code>.<br/>
<br/>
Notice that the content is a child of its parent, it's not added before the parent but before the parent's content.<br/>
<br/>
Notice as well that inherited styles apply to <code>::before</code> and <code>::after</code>.`,
		html: `<div class="a">some text</div>`,
		css: `
.a {
	color: dodgerblue;
	border: 2px solid red;
}
div::before {
	content: 'Before';
}
div::after {
	content: 'After';
}`,
		buttons: [{
			label: '::before and ::after default',
			reset: true
		}, {
			label: '::before and ::after block',
			description: `You can change the <code>display</code> property for <code>::before</code> and
<code>::after</code>.`,
			html: `<div>some text</div>`,
			css: `
div::before {
	content: 'Before';
	display: block;
}
div::after {
	content: 'After';
}`
		}, {
			label: '::before and ::after quotes',
			description: `You can add open and close quotes.`,
			html: `<div>some text</div>`,
			css: `
div::before {
	content: open-quote;
}
div::after {
	content: close-quote;
}`
		}, {
			label: '::before and ::after attribute value',
			description: `You can have content use the value of an attribute.`,
			html: `<div data-text="This is some text"></div>`,
			css: `
div::before {
	content: attr(data-text);
}`
		}, {
			label: '::before and ::after newlines',
			description: `Newlines can be added with the <code>\\A</code> escape sequence.`,
			html: `<div></div>`,
			css: `
div::before {
	display: block;
    white-space: pre;
    content: "Line 1\\A Line 2\\A Line 3"
}`
		}, {
			label: '::first-line',
			html: `<div>Text text text text text text text text text text text text text text text text text text</div>`,
			css: `
div::first-line {
	background: dodgerblue;
}`
		}, {
			label: '::first-letter',
			html: `<div>Text text text text text text</div>`,
			css: `
div::first-letter {
	font-size: 3em;
}`
		}, {
			label: '::selection',
			description: `Targets what has been selected by the user. Try selecting some text. Note only certain 
properties can be set using this pseudo element, e.g. you can't set font-size. See
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::selection">here</a>.`,
			html: `<div>Text text text text text text</div>`,
			css: `
div::selection {
	background: dodgerblue;
	color: red;
}`
		}]
	})
})()