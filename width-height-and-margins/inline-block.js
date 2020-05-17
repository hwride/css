(function() {
	const html = `<div>
  Text text text text text text 
  text text text text text
  <div class="a"></div>
  text text text text text text
  text text text text
</div>`

	/* Width and vertical margins */
	createCSSTestingComponent({
		parent: document.querySelector('.example-inline-block'),
		html: `<div>
  Text text text text text text 
  text text text text text
  <div class="a">text</div>
  text text text text text text
  text text text text
</div>`,
		css: `
.a {
  background: dodgerblue;
  display: inline-block;
}`,
		buttons: [{
			label: '[Default] Width is shrink-to-fit',
			reset: true
		}, {
			label: 'Fixed width, height, padding, border, margin',
			description: `These properties apply in all directions.`,
			html: html,
			css: `
.a {
  background: dodgerblue;
  display: inline-block;
  width: 50px;
  height: 50px;
  padding: 10px;
  border: 10px solid red;
  margin: 10px;
}`
		}, {
			label: 'auto margins go to zero',
			html: html,
			css: `
.a {
  background: dodgerblue;
  display: inline-block;
  width: 50px;
  height: 50px;
  padding: 10px;
  border: 10px solid red;
  margin: 0;
}`
		}, {
			label: 'auto height - inline formatting context, single line',
			html: `<div>
  Text text text text text text 
  text text text text text
  <div class="a">
  text text text
</div>
  text text text text text text
  text text text text
</div>`,
			css: `
.a {
  background: dodgerblue;
  display: inline-block;
}`
		}, {
			label: 'auto height - inline formatting context, multi-line',
			description: `Notice how in this case the <code>inline-block</code> box doesn't split across line boxes.`,
			html: `<div>
  Text text text text text text 
  text text text text text
  <div class="a">
  text text text text text text
  text text text text text text
</div>
  text text text text text text
  text text text text
</div>`,
			css: `
.a {
  background: dodgerblue;
  display: inline-block;
}`
		}, {
			label: 'auto height - block formatting context, no width',
			description: `When a block has <code>width</code> set to <code>auto</code>, it calculates its 
<code>width</code> according to the <code>width</code> of its containing block. But when <code>inline-block</code> has 
<code>width</code> set to <code>auto</code>, it calculates its <code>width</code> by shrinking-to-fit on its content. In
this case shrink-to-fit takes precedence so the block children are as small possible, which is why you don't see the 
block here. Note the <code>height</code> and vertical margins still apply though.`,
			html: `<div>
  Text text text text text text 
  text text text text text
  <div class="a">
    <div class="b"></div>
    <div class="b"></div>
  </div>
  text text text text text text
  text text text text
</div>`,
			css: `
.a {
  background: dodgerblue;
  display: inline-block;
}
.b {
  background: green;
  height: 30px;
  margin: 10px 0 10px 0;
}`
		}, {
			label: 'auto height - block formatting context',
			description: `The children appears when a fixed <code>width</code> is applied.`,
			html: `<div>
  Text text text text text text 
  text text text text text
  <div class="a">
    <div class="b"></div>
    <div class="b"></div>
  </div>
  text text text text text text
  text text text text
</div>`,
			css: `
.a {
  background: dodgerblue;
  display: inline-block;
}
.b {
  background: green;
  width: 30px;
  height: 30px;
  margin: 10px;
}`
		}]
	})
})()