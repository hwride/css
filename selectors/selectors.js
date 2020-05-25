(function() {
	const descendantHTML = `<div>a
	<div>aa
		<div>aaa</div>
	</div>
	<span>ab
		<div>aba</div>
	</span>
</div>
<span class="b">b</span>`
	const siblingHTML = `<div>a
	<span>aa</span>
	<div>ab</div>
	<span>ac</span>
	<span>ad</span>
</div>
<span class="b">b</span>`

	createCSSTestingComponent({
		parent: document.querySelector('.example-selectors'),
		html: `<div class="a">a</div>
<span class="b">b</span>`,
		css: `
div {
	background: dodgerblue;
	border: 2px solid red;
}
span {
	background: green;
}`,
		buttons: [{
			label: 'Element',
			reset: true
		}, {
			label: 'Class',
			html: `<div class="a">a</div>
<span class="b">b</span>`,
			css: `
.a {
	background: dodgerblue;
	border: 2px solid red;
}
.b {
	background: green;
}`
		}, {
			label: 'ID',
			html: `<div id="a">a</div>
<span id="b">b</span>`,
			css: `
#a {
	background: dodgerblue;
	border: 2px solid red;
}
#b {
	background: green;
}`
		}, {
			label: 'Descendant',
			description: `This targets any element that is a descendant of another element. Note even though <code>aba</code>
has a <code>span</code> parent it is still targeted, because it has a <code>div</code> ancestor above.`,
			html: descendantHTML,
			css: `
div div {
	background: dodgerblue;
	border: 2px solid red;
}`
		}, {
			label: 'Child',
			description: `This targets elements that are direct child only. Notice here <code>aba</code> is not affected.`,
			html: descendantHTML,
			css: `
div > div {
	background: dodgerblue;
	border: 2px solid red;
}`
		}, {
			label: 'Next following sibling',
			description: `This targets element's that are the next following sibling after another element. Notice that 
<code>aa</code> is not targeted as it is before and not after a <code>div</code>.`,
			html: siblingHTML,
			css: `
div + span {
	background: dodgerblue;
	border: 2px solid red;
}`
		}, {
			label: 'Following sibling',
			description: `This targets element's that are any following sibling of another element.`,
			html: siblingHTML,
			css: `
div ~ span {
	background: dodgerblue;
	border: 2px solid red;
}`
		}, {
			label: 'Attribute',
			html: `<div title="Test">a</div>
<span class="a b c">b</span>`,
			css: `
/* Presence of attribute */
[title] {
	background: dodgerblue;
}
/* Attribute exact value */
[title=Test] {
	border: 2px solid red;
}
/* Matching one of the words in the attribute */
span[class~=b] {
	background: green;
}
/* Combined with element selector */
div[title] {
	border-style: dashed;
}`
		}, {
			label: 'Universal',
			description: `This universal selector matches any element. Notice how this applies to the <code>body</code> tag as 
well.`,
			html: `<div class="a">a
	<div class="aa">aa</div>
</div>
<span class="b">b</span>`,
			css: `
* {
	background: dodgerblue;
	padding: 2px;
	margin: 2px;
	border: 2px solid red;
}`
		}]
	})
})()