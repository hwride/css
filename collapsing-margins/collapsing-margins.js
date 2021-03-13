createCSSTestingComponent({
	parent: document.querySelector('.example-collapsing-margins'),
	description: `The top and bottom margins of the following two sibling elements collapse and use the same space.`,
	html: `<div class="a"></div>
<div class="b"></div>`,
	css: `
.a {
  background: dodgerblue;
  height: 50px;
  margin-bottom: 50px;
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
	}]
})
