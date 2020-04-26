createCSSTestingComponent({
	parent: document.querySelector('.example-simple-grid'),
	html: `<div class="grid-container">
  <div></div>
  <div></div>
</div>`,
	css: `
.grid-container {
  display: grid;
  width: 200px;
  height: 200px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
}
.grid-container > div {
  background: dodgerblue;
}
.grid-container > div:nth-child(1) {
  grid-column: 1;
  grid-row: 1;
}
.grid-container > div:nth-child(2) {
  grid-area: 2 / 3 / 4 / 5;
}`,
})

const getGridWithItems = itemCount => {
	let gridHtml = '<div class="grid-container">\n  '
	for(let i = 0; i < itemCount; i++) {
		gridHtml += '<div></div>'
		if(i > 0 && (i+1) % 3 === 0 && i < itemCount-1) gridHtml += '\n  '
	}
	gridHtml += '\n</div>'
	return gridHtml
}
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
	<li>Column 3 takes up the remaining space, as its ideal <code>max-content</code> is wider than the what is left. Try 
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

createCSSTestingComponent({
	parent: document.querySelector('.example-grid-lines'),
	html: getGridWithItems(5),
	css: `
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(6, 40px);
}
.grid-container > div {
  border: 1px solid black;
}
.grid-container > div:nth-child(1) {
  background: dodgerblue;
  grid-column: 1 / 2;
  grid-row: 2;
}
.grid-container > div:nth-child(2) {
  background: tomato;
  grid-column: 3;
  grid-row: 1 / span 2;
}
.grid-container > div:nth-child(3) {
  background: green;
  grid-column: -1 / -3;
  grid-row: 3;
}
.grid-container > div:nth-child(4) {
  background: gold;
  grid-area: 4 / 1 / 6 / 3;
}
.grid-container > div:nth-child(5) {
  background: maroon;
  grid-column: span 3 / 4;
  grid-row: 6;
}`,
	description: `<p class="example-description">Note:</p>
<ul>
	<li>The 1st grid item specifies only <code>grid-row-start</code> so implicitly is 1 row wide.</li>
	<li>The 2nd grid item uses a <code>span</code>.</li>
	<li>The 3rd grid item uses negative line numbers.</li>
	<li>The 4th grid item uses <code>grid-area</code>.</li>
	<li>The 5th grid item uses a backwards span.</li>
</ul>
`
})

createCSSTestingComponent({
	parent: document.querySelector('.example-grid-named-lines'),
	html: getGridWithItems(2),
	css: `
.grid-container {
  display: grid;
  grid-template-columns:
    [start-col-line] 50px
    [middle-col-line] 50px
    [end-col-line alt-name];
  grid-template-rows:
    [start-row-line] 50px
    [middle-row-line] 50px
    [end-row-line];
}
.grid-container > div {
  border: 1px solid black;
}
.grid-container > div:nth-child(1) {
  background: dodgerblue;
  grid-column: middle-col-line / end-col-line;
  grid-row: start-row-line;
}
.grid-container > div:nth-child(2) {
  background: tomato;
  grid-column: start-col-line / alt-name;
  grid-row: middle-row-line;
}`,
	description: 'Notice the use of two names for the final column line.',
	buttons: [{
		label: 'Simple line names',
		reset: true
	}, {
		label: 'First line name found is used',
		description: 'Notice how the span reaches to the second <code>col-line</code>, not just two tracks.',
		html: getGridWithItems(1),
		css: `
.grid-container {
  display: grid;
  grid-template-columns:
    50px
    50px
    [col-line] 50px
    50px
    [col-line] 50px
    [col-line];
  grid-template-rows: 50px 50px
}
.grid-container > div {
  border: 1px solid black;
  background: dodgerblue;
}
.grid-container > div:nth-child(1) {
  grid-column: 1 / col-line;
  grid-row: 1;
}`
	}, {
		label: 'Line name by index',
		html: getGridWithItems(7),
		css: `
.grid-container {
  display: grid;
  grid-template-columns:
    50px
    50px
    [col-line] 50px
    50px
    [col-line] 50px
    [col-line];
  grid-template-rows: 50px 50px
}
.grid-container > div {
  border: 1px solid black;
  background: tomato;
}
.grid-container > div:nth-child(1) {
  background: dodgerblue;
  grid-column: 1 / col-line 2;
  grid-row: 1;
}`
	}, {
		label: 'Span with line name',
		description: 'Notice how the span reaches to the second <code>col-line</code>, not just two tracks.',
		html: getGridWithItems(7),
		css: `
.grid-container {
  display: grid;
  grid-template-columns:
    50px
    50px
    [col-line] 50px
    50px
    [col-line] 50px
    [col-line];
  grid-template-rows: 50px 50px
}
.grid-container > div {
  border: 1px solid black;
  background: tomato;
}
.grid-container > div:nth-child(1) {
  background: dodgerblue;
  grid-column: 1 / span 2 col-line;
  grid-row: 1;
}`
	}, {
		label: 'Repeat with line names',
		description: 'Notice how the line name is also repeated.',
		html: getGridWithItems(7),
		css: `
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, [col-line] 50px);
  grid-template-rows: 50px 50px
}
.grid-container > div {
  border: 1px solid black;
  background: tomato;
}
.grid-container > div:nth-child(1) {
  background: dodgerblue;
  grid-column: 1 / col-line 4;
  grid-row: 1;
}`
	}]
})