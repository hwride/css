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