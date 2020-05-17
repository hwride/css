/* Width and vertical margins */
createCSSTestingComponent({
	parent: document.querySelector('.example-inline'),
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
		description: `Note horizontal <code>margin</code> is <code>auto</code> so becomes zero on <code>b</code>.`,
		html: `<div>
  Text text text text text text 
  text text text text text
  <span class="a">text</span>
  text text text 
  <span class="b">text</span> 
  text text text text text text
</div>`,
		css: `
.a {
  background: dodgerblue;
  border-left: 5px solid red;
  border-right: 5px solid red;
  padding: 0 20px 0 20px;
  margin: 0 50px 0 50px;
}
.b {
  background: red;
  margin: 0 auto 0 auto;
}`
	}, {
		label: 'Height',
		description: `Notice: 
<ul>
	<li>Setting of the <code>height</code> property on <code>a</code> is ignored.</li>
	<li><code>b</code> is larger here due to its increased font size.</li>
</ul>`,
		html: `<div>
  Text text text text text text 
  text text text text text
  <span class="a">text</span>
  text text text 
  <span class="b">text</span> 
  text text text text text text
</div>`,
		css: `
.a {
  background: dodgerblue;
  height: 100px;
}
.b {
  background: red;
  font-size: 2em;
}`
	}, {
		label: 'Vertical margin, padding and border',
		description: `Notice vertical <code>margin</code> is ignored and the vertical <code>padding</code> and 
<code>border</code> overlap the other lines but don't affect the line size.`,
		html: `<div>
  Text text text text text text text
  text text text text text text text
  <span class="a">text</span>
  text text text text text text text
  text text text text text text text
</div>`,
		css: `
.a {
  background: dodgerblue;
  margin: 250px 0 250px 0;
  padding: 40px 0 40px 0;
  border-top: 5px solid red;
  border-bottom: 5px solid red;
}`
	}]
})