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
		label: 'Simple 1fr 1fr 1fr',
		reset: true
	}, {
		label: 'Example showing fr uses available space',
		description: `Notice how the fractional columns divide up available space, not the space of the entire grid`,
		html: `<div class="grid-container">
  <div></div><div></div><div></div>
  <div></div><div></div><div></div>
</div>`,
		css: `.grid-container {
  display: grid;
  grid-template-columns: 1fr 20px 1fr;
}
.grid-container > div {
  background: dodgerblue;
  border: 1px solid black;
  height: 50px;
}`
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
	}, {
		label: 'Grid item fr + content overflow minmax fix',
		description: `If you set the minimum width of a column to 0 using <code>minmax</code>, this causes the column to 
ignore the <code>min-content</code> size and cause columns to always be their defined fractional width.`,
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
	}, {
		label: 'Grid item fr + content overflow minmax fix with scroll',
		description: `See you can apply overflow to allow the content to be seen.`,
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
}
.grid-container > div:first-child { 
	overflow: auto; 
}
`
	}, {
		label: 'Grid item fr + fixed width',
		description: `Note how even with a fixed width on the grid item the <code>minmax</code> fix still works.`,
		html: getGridWithItems(6),
		css: `.grid-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.grid-container > div {
  background: dodgerblue;
  border: 1px solid black;
  height: 50px;
}
.grid-container > div:first-child {
	width: 150px;
}`
	}, {
		label: 'Grid item fr + content overflow min-width fix',
		description: `You can also apply this fix by setting <code>min-width</code> on the grid item itself.`,
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
}
.grid-container > div:first-child {
  min-width: 0;
}`
	}]
})
