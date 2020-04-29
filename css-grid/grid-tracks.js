createCSSTestingComponent({
	parent: document.querySelector('.example-grid-tracks'),
	html: getGridWithItems(9),
	css: `
.grid-container {
  display: grid;
  grid-template-columns: 30px 60px 10px;
  grid-template-rows: 20px 80px 80px;
}
.grid-container > div {
  background: dodgerblue;
  border: 1px solid black;
}`,
	description: '',
	buttons: [{
		label: 'Fixed size tracks',
		reset: true
	}, {
		label: 'Flexible tracks',
		description: 'Each <code>fr</code> takes up a fraction of the available space.',
		html: getGridWithItems(9),
		css: `.grid-container {
  display: grid;
  width: 200px;
  height: 150px;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}
.grid-container > div {
  background: dodgerblue;
  border: 1px solid black;
}`
	}, {
		label: 'Fixed and flexible tracks',
		description: 'Each <code>fr</code> takes up a fraction of the remaining space after fixed units have been applied.',
		html: getGridWithItems(9),
		css: `.grid-container {
  display: grid;
  width: 200px;
  height: 150px;
  grid-template-columns: 1fr 50px 1fr;
  grid-template-rows: 50px 1fr 50px;
}
.grid-container > div {
  background: dodgerblue;
  border: 1px solid black;
}`
	}, {
		label: 'Track repeat',
		description: '<code>repeat</code> can take one or more tack listings and repeat it.',
		html: getGridWithItems(12),
		css: `
.grid-container {
  display: grid;
  width: 200px;
  height: 150px;
  grid-template-columns: repeat(3, 50px);
  grid-template-rows: repeat(2, 10px 1fr);
}
.grid-container > div {
  background: dodgerblue;
  border: 1px solid black;
}`
	}, {
		label: 'Explicit tracks always take up space',
		description: 'Note how the grid is still as tall as the 3 defined rows even though it contains no grid items.',
		html: getGridWithItems(1),
		css: `
.grid-container {
  display: grid;
  border: 1px solid red;
  grid-template-columns: repeat(3, 50px);
  grid-template-rows: repeat(3, 50px);
}
.grid-container > div {
  background: dodgerblue;
  border: 1px solid black;
}`
	}, {
		label: 'minmax',
		description: `Note how:
<ul>
	<li>Column 1 expands to contain the <code>100px</code> grid item.</li>
	<li>Column 2 does not go below <code>50px</code> even though the only grid item is smaller than that.</li>
	<li>Column 3 takes up the remaining space, as its ideal <code>max-content</code> is wider than what is left. Try 
	reducing the size of the first grid item and you'll see column 3 expand.<br/>
	Note here that the fixed size tracks are being assigned space first (you can test that it's not based on column 
	order by placing the text column first, you'll see it still is the column to flex). </li>
</ul>
`,
		html: `<div class="grid-container">
  <div></div>
  <div></div>
  <div>Text text text text text text text text text text text text text text text</div>
</div>`,
		css: `
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, max-content));
  grid-template-rows: 50px;
}
.grid-container > div {
  background: dodgerblue;
  border: 1px solid black;
}
.grid-container > div:first-child {
  width: 100px;
}
.grid-container > div:nth-child(2) {
  width: 20px;
}`
	}, {
		label: 'Gutters',
		html: getGridWithItems(9),
		css: `
.grid-container {
  display: grid;
  grid-template-columns: 30px 40px 10px;
  grid-template-rows: 20px 40px 40px;
  grid-gap: 20px;
}
.grid-container > div {
  background: dodgerblue;
  border: 1px solid black;
}`
	}]
})