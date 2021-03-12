/* Block width */
createCSSTestingComponent({
	parent: document.querySelector('.example-block-width'),
	description: `If there is exactly 1 property with a value of <code>auto</code> its actual value follows from the 
equation. E.g. here <code>margin-left</code> is <code>auto</code> so it shrinks and <code>margin-right</code> stays at
<code>50px</code>. If you make width <code>auto</code> and <code>margin-right: 50px</code> then the width will shrink.`,
	html: '<div class="block"></div>',
	css: `
.block {
  background: dodgerblue;
  height: 50px;
  width: 75px;
  margin: 0 50px 0 auto;
  padding: 0 50px 0 50px;
  border-left: 10px solid red;
  border-right: 10px solid red;
}`,
	buttons: [{
		label: 'One auto',
		reset: true
	}, {
		label: 'Over-constrained',
		description: `If all of the values have a computed value other than <code>auto</code> they are 
"over-constrained". In this case <code>margin-right</code> (if <code>ltr</code>) is changed to <code>auto</code> to make 
the equation balance. See below how the actual value for <code>margin-right</code> is less than the <code>50px</code> it
is set to.`,
		html: '<div class="block"></div>',
		css: `
.block {
  background: dodgerblue;
  height: 50px;
  width: 75px;
  margin: 0 50px 0 50px;
  padding: 0 50px 0 50px;
  border-left: 10px solid red;
  border-right: 10px solid red;
}`
	}, {
		label: 'Total width > containing block width',
		description: `If <code>margin + border + padding + width > width of containing block</code> then 
<code>auto</code> values become zero until the equation is balanced. First <code>margin</code> is set to zero, if the 
equation still doesn't balance then <code>width</code> is set to zero. Here both <code>margin</code> and 
<code>width</code> end up being zero.`,
		html: '<div class="block"></div>',
		css: `
.block {
  background: dodgerblue;
  height: 50px;
  width: auto;
  padding: 0 120px 0 120px;
  border: 10px solid red;
  margin: auto;
}`
	}, {
		label: '[Default] Width override other autos',
		description: `If <code>width</code> is <code>auto</code> any other <code>auto</code> values become zero and 
<code>width</code> follows from the equation. Notice here how there are no margins.`,
		html: '<div class="block"></div>',
		css: `
.block {
  background: dodgerblue;
  height: 50px;
  width: auto;
  margin: 0 auto 0 auto;
}`
	}, {
		label: 'auto margins',
		description: `If <code>margin-left</code> and <code>margin-right</code> are <code>auto</code> the element 
centers itself in the containing block.`,
		html: '<div class="block"></div>',
		css: `
.block {
  background: dodgerblue;
  height: 50px;
  width: 50px;
  margin: auto;
}`
	}]
})

/* Block height */
createCSSTestingComponent({
	parent: document.querySelector('.example-block-height'),
	description: `Blocks can be given a fixed <code>height</code>.`,
	html: '<div class="block"></div>',
	css: `
.block {
  background: dodgerblue;
  height: 50px;
}`,
	buttons: [{
		label: 'Fixed height',
		reset: true
	}, {
		label: 'Fixed margins',
		html: `<div class="block"></div>
<div class="block-2"></div>`,
		css: `
.block {
  background: dodgerblue;
  height: 50px;
  margin: 20px 0 20px 0;
}
.block-2 {
  background: green;
  height: 20px;
}`
	}, {
		label: 'auto margins become zero',
		html: '<div class="block"></div>',
		css: `
.block {
  background: dodgerblue;
  height: 50px;
  margin: auto 0 auto 0;
}`
	}, {
		label: '[Default] auto height - 1) Inline formatting context',
		description: `If the block creates an inline formatting context then to the bottom edge of the last line box.`,
		html: `<div class="block">
  Text text text text text text text text text text text text text text text text
</div>`,
		css: `
.block {
  background: dodgerblue;
  height: auto;
  width: 10em;
}`
	}, {
		label: '[Default] auto height - 2) Block formatting context - last child around margin',
		description: `If that last child's bottom margin doesn't collapse with the element's margin then the height 
extends to the bottom of that last child's bottom margin. This can happen for example if the parent element has padding 
meaning no margin collapsing will happen between the parent and child's bottom margin, as below. Notice how the last 
child's margin is included in the parent's height.`,
		html: `<div class="block">
  <div></div>
  <div></div>
</div>`,
		css: `
.block {
  background: dodgerblue;
  height: auto;
  width: 10em;
  padding: 5px 0 5px 0;
  margin-bottom: 10px;
}
.block > div {
  background: green;
  height: 20px;
  padding: 5px;
  border: 5px solid red;
}
.block > div:last-child {
  margin-bottom: 20px;
}`
	}, {
		label: '[Default] auto height - 3) Block formatting context - last child around border',
		description: `If the margin of the last child does collapse, then the height extends to the end of the border of 
the last child which has non-zero for border, padding or height. It does not include margin as the above example. Notice 
here both children have margins and neither margin is enclosed by the height of the parent. Also notice the final child
actually appears outside the height of the containing block as per the rule.`,
		html: `<div class="block">
  <div></div>
  <div></div>
</div>`,
		css: `
.block {
  background: dodgerblue;
  height: auto;
  width: 10em;
  margin-bottom: 10px;
}
.block > div {
  background: green;
  height: 20px;
  padding: 5px;
  border: 5px solid red;
  margin-bottom: 20px;
}
.block > div:last-child {
  height: 0;
  border: 0;
  padding: 0;
  outline: 1px dashed red;
}`
	}, {
		label: '[Default] auto height - 4) Zero height',
		description: `If a block has no children, or its children have no border, padding or height, then the block will 
have zero height.`,
		html: `<div class="block">
  <div class="child"></div>
  <div class="child"></div>
</div>`,
		css: `
.block {
  background: dodgerblue;
  height: auto;
  width: 10em;
}`
	}]
})

/* Block percentage width and height */
createCSSTestingComponent({
	parent: document.querySelector('.example-block-percent'),
	description: `Here <code>parent</code> is the containing block.`,
	html: `<div class="parent">
  <div></div>
</div>`,
	css: `
.parent {
  background: dodgerblue;
  width: 230px;
  height: 100px;
}
.parent > div {
  background: red;
  width: 50%;
  height: 75%;
}
`,
	buttons: [{
		label: 'Percent width and height',
		reset: true
	}, {
		label: 'Nested percent heights',
		description: `See you don't need a fixed height (for e.g. 200px) for the containing block's height, percentage
heights also work. The child will be a further percentage of its parent.`,
		html: `<div class="parent">
  <div>
    <div></div>
  </div>
</div>`,
		css: `
.parent {
  background: dodgerblue;
  width: 230px;
  height: 100px;
}
.parent > div {
  background: red;
  width: 50%;
  height: 75%;
}
.parent > div > div {
  background: green;
  width: 50%;
  height: 75%;
}`
	}, {
		label: 'Containing block has no set height or width',
		description: `Note here:
<ul>
	<li><code>b</code> has <code>height: 100%</code> set which reverts to <code>auto</code> (which is a used value of 
	zero as it has no content, so we don't see it).</li>
	<li><code>c</code> has <code>width: 50%</code> which still applies.</li>
</ul>`,
		html: `<div class="parent">
  <div class="a"></div>
  <div class="b"></div>
  <div class="c"></div>
</div>`,
		css: `
.parent {
  background: dodgerblue;
  padding: 10px;
}
.a {
  background: red;
  height: 50px;
}
.b {
  background: green;
  height: 100%;
}
.c {
  background: gold;
  height: 20px;
  width: 50%;
}`
	}, {
		label: 'Containing block has no set height, grandparent does',
		description: `Here is an example where the containing block has no fixed height but the grandparent does. Note 
the grandchild is still using a height of <code>auto</code>.`,
		html: `<div class="grandparent">
  <div class="parent">
    <div class="child"></div>
  </div>
</div>`,
		css: `
.grandparent {
  background: dodgerblue;
  padding: 10px;
  height: 100px;
}
.parent {
  background: green;
  height: auto;
}
.child {
  background: gold;
  height: 100%;
}`
	}]
})

/* Negative margins */
createCSSTestingComponent({
	parent: document.querySelector('.example-block-negative-margins'),
	description: `Notice how content can be moved over other content.`,
	html: `<div class="a"></div>
<div class="b"></div>`,
	css: `
body {
  padding: 50px;
}
.a {
  background: dodgerblue;
  height: 50px;
  width: 50px;
}
.b {
  background: red;
  height: 50px;
  width: 50px;
  margin-left: -20px;
  margin-top: -10px;
}`,
	buttons: [{
		label: 'Negative margin',
		reset: true
	}, {
		label: 'Negative margin - affecting other elements',
		description: `Notice how other content is affected - the sibling element still flows next to the element with 
negative margins. And notice how both these elements can be caused to actually overlap other elements with just negative
margin.`,
		html: `<div class="box a"></div>
<div class="box b"></div>
<div class="box c">test</div>`,
		css: `
body {
  padding: 50px;
}
.box {
  height: 50px;
  width: 50px;
}
.a {
  background: dodgerblue;
}
.b {
  background: red;
  margin-left: -20px;
  margin-top: -70px;
}
.c {
  background: green;
  margin-left: 10px;
}`
	}]
})
