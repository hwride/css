/* Width and vertical margins */
createCSSTestingComponent({
	parent: document.querySelector('.example-inline-width'),
	description: `The <code>width</code> property does not apply for inline elements.`,
	html: `<div>
  Text text text text text text 
  text text text text text
  <span>text</span>
  text text text text text text
  text text text text
</div>`,
	css: `
span {
  background: dodgerblue;
  width: 200px;
}`,
	buttons: [{
		label: 'Width',
		reset: true
	}, {
		label: 'Horizontal margin, padding and border',
		description: `Horizontal <code>margin</code>, <code>padding</code> and <code>border</code> does apply for inline 
elements. If horizontal <code>margin</code> is <code>auto</code> it becomes zero as on the second element here.`,
		html: `<div>
  Text text text text text text 
  text text text text text
  <span class="text-1">text</span>
  text text text 
  <span class="text-2">text</span> 
  text text text text text text
</div>`,
		css: `
.text-1 {
  background: dodgerblue;
  border-left: 5px solid red;
  border-right: 5px solid red;
  padding: 0 20px 0 20px;
  margin: 0 50px 0 50px;
}
.text-2 {
  background: red;
  margin: 0 auto 0 auto;
}`
	}]
})

/* Height and vertical margins */
createCSSTestingComponent({
	parent: document.querySelector('.example-inline-height'),
	description: `The <code>height</code> property does not apply for inline elements. Height is based on the font, this 
can be seen on the second element here.`,
	html: `<div>
  Text text text text text text 
  text text text text text
  <span class="height">text</span>
  text text text 
  <span class="font-2">text</span> 
  text text text text text text
</div>`,
	css: `
.height {
  background: dodgerblue;
  height: 100px;
}
.font-2 {
  background: red;
  font-size: 2em;
}
`,
	buttons: [{
		label: 'Height',
		description: `The height property does not apply for inline elements. Height is based on the font, this can be 
seen on the second element here.`,
		reset: true
	}, {
		label: 'Vertical margin, padding and border',
		description: `Vertical <code>padding</code> and <code>border</code> apply to inline elements but have no effect 
on the size of lines, so may overlap other lines. Vertical <code>margin</code> is ignored.`,
		html: `<div>
  Text text text text text text text
  text text text text text text text
  <span class="vertical-props">text</span>
  text text text text text text text
  text text text text text text text
</div>`,
		css: `
.vertical-props {
  background: dodgerblue;
  margin: 250px 0 250px 0;
  padding: 40px 0 40px 0;
  border-top: 5px solid red;
  border-bottom: 5px solid red;
}`
	}]
})