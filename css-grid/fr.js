createCSSTestingComponent({
	parent: document.querySelector('.example-fr'),
	html: getGridWithItems(6),
	css: `
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.grid-container > div {
  background: dodgerblue;
  border: 1px solid black;
  height: 50px;
}`,
	description: '',
	buttons: [{
		label: '1fr 1fr 1fr',
		reset: true
	}, {
		label: 'Grid item fr + content overflow',
		description: `Notice how even though the template columns are defined to be <code>1fr</code> each, the content of
the first grid item causes the first grid column to expand to fit it.`,
		html: `<div class="grid-container">
  <div>Testttttttttttttttttttttttttttttttt</div><div></div><div></div>
  <div></div><div></div><div></div>
</div>`,
		css: `.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.grid-container > div {
  background: dodgerblue;
  border: 1px solid black;
  height: 50px;
}`
	},
	{
		label: 'Grid item fr + content overflow minmax fix',
		description: `If you set the minimum width of a column to 0 using minmax, this causes the column to ignore the
<code>min-content</code> size and cause columns to always be their defined fractional width.
<br/><br/>
Note you can apply overflow to allow the content to be seen. Try adding 
<code>
	.grid-container > div:first-child { overflow: auto }
</code> to the CSS.`,
		html: `<div class="grid-container">
  <div>Testttttttttttttttttttttttttttttttt</div><div></div><div></div>
  <div></div><div></div><div></div>
</div>`,
			css: `.grid-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.grid-container > div {
  background: dodgerblue;
  border: 1px solid black;
  height: 50px;
}`
		},
		{
		label: 'Grid item fr + fixed width',
		description: `Note how the first grid item has a fixed width greater than <code>1fr</code>, and this takes priority
over the fractional width and the grid item expands to be larger than <code>1fr</code>.`,
		html: getGridWithItems(6),
		css: `.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.grid-container > div {
  background: dodgerblue;
  border: 1px solid black;
  height: 50px;
}
.grid-container > div:first-child {
	width: 150px;
}`
	}]
})
