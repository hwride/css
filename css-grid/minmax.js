createCSSTestingComponent({
	parent: document.querySelector('.example-minmax'),
	html: `<div class="grid-container grid-container-1">
  <div></div><div></div><div></div>
  <div></div><div></div><div></div>
</div>
<div class="grid-container grid-container-2">
  <div></div><div></div><div></div>
  <div></div><div></div><div></div>
</div>`,
	css: `
.grid-container-1 {
  display: grid;
  outline: 1px solid red;
  width: 200px;
  grid-template-columns: 
    minmax(50px, 100px) 40px 40px;
  margin-bottom: 10px
}
.grid-container-2 {
  display: grid;
  outline: 1px solid red;
  width: 200px;
  grid-template-columns: 
    minmax(50px, 100px) 75px 75px;
}
.grid-container > div {
  background: dodgerblue;
  border: 1px solid black;
  height: 50px;
}`,
	description: `Notice how the first column flexes between its min and max size according to the other content.`,
	buttons: [{
		label: 'All fixed sizes example',
		reset: true
	}, {
		label: 'Fixed sizes minmax, fr other tracks',
		description: `Here we've set a grid item to have a fixed <code>minmax</code> and the other columns to be flexible.
<br/><br/>
Notice how in the first example when there is extra available space that first the <code>minmax</code> will try and
expand to its max width, and only after that will remaining space be divided between <code>fr</code> columns.
<br/><br/>
But also notice in the second example that when the <code>fr</code> columns reach their 
<a href="../width-height-and-margins/index.html#block-special-width-height-keywords"><code>min-content</code></a> 
size, 
that is the point that the <code>minmax</code> column starts shrinking. We know its the <code>min-content</code> size
because we can see the 3rd column wrap its words.`,
		html: `<div class="grid-container grid-container-1">
  <div></div><div>content</div><div>some content</div>
  <div></div><div></div><div></div>
</div>
<div class="grid-container grid-container-2">
  <div></div><div>content</div><div>some content</div>
  <div></div><div></div><div></div>
</div>`,
		css: `
.grid-container-1 {
  display: grid;
  outline: 1px solid red;
  width: 250px;
  grid-template-columns: 
    minmax(50px, 100px) 1fr 1fr;
  margin-bottom: 10px
}
.grid-container-2 {
  display: grid;
  outline: 1px solid red;
  width: 120px;
  grid-template-columns: 
    minmax(50px, 100px) 1fr 1fr;
}
.grid-container > div {
  background: dodgerblue;
  border: 1px solid black;
  height: 50px;
}`
	}]
})
