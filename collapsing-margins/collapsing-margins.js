createCSSTestingComponent({
	parent: document.querySelector('.example-collapsing-margins'),
	description: `The top and bottom margins of the following two sibling elements collapse and use the same space. Note
the larger of the two margins is the size used.`,
	html: `<div class="a"></div>
<div class="b"></div>`,
	css: `
.a {
  background: dodgerblue;
  height: 50px;
  margin-bottom: 25px;
}
.b {
  background: red;
  height: 50px;
  margin-top: 50px;
}`,
	buttons: [{
		label: 'Siblings',
		reset: true
	}, {
		label: 'Siblings - no collapse',
		description: `An element between two elements will prevent their margins from collapsing. See here how a 
<code>&lt;br/&gt;</code> tag with no margins prevents collapsing.`,
		html: `<div class="a"></div>
<br/>
<div class="b"></div>
`,
		css: `
.a {
  background: dodgerblue;
  height: 50px;
  margin-bottom: 25px;
}
.b {
  background: red;
  height: 50px;
  margin-top: 50px;
}`
	}, {
		label: 'Parent and child',
		description: `Notice here how the child is not pushed away from the parent with its top margin. Instead the margins
collapse and parent itself is pushed down.`,
		html: `<div class="a">
  <div class="b"></div>
</div>`,
		css: `
.a {
  background: dodgerblue;
  height: 50px;
}
.b {
  background: red;
  height: 20px;
  margin-top: 100px;
}`
	}, {
		label: 'Parent and child - no collapse',
		description: `Padding or border on the parent will prevent margin collapsing.`,
		html: `<div class="a">
  <div class="b"></div>
</div>`,
		css: `
.a {
  background: dodgerblue;
  height: 50px;
  padding-top: 1px;
}
.b {
  background: red;
  height: 20px;
  margin-top: 20px;
}`
	}, {
		label: 'Negative margins',
		description: `These collapse in the same way as positive margins. The largest of the negative margins is chosen for
the final margin size.`,
		html: `<div class="a"></div>
<div class="b"></div>
`,
		css: `
.a {
  background: dodgerblue;
  height: 50px;
  margin-bottom: -5px;
}
.b {
  background: red;
  height: 50px;
  margin-top: -25px;
}`
	}, {
		label: 'Positive and negative margins',
		description: `In this situation the final value is calculated by adding the margins together. Here the margins
cancel each other out. This can be useful when you have to control over an existing margin and want to get rid of it.`,
		html: `<div class="a"></div>
<div class="b"></div>
`,
		css: `
.a {
  background: dodgerblue;
  height: 50px;
  margin-bottom: 25px;
}
.b {
  background: red;
  height: 50px;
  margin-top: -25px;
}`
	}]
})
