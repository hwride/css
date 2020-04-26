createCSSTestingComponent({
	parent: document.querySelector('.example-auto-placement'),
	description: 'Note how by default the automatically generated rows fit the height of their content.',
	html: getGridWithItems(9),
	css: `
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 50px;
}
.grid-container > div {
  border: 1px solid black;
  background: dodgerblue;
  height: 20px;
}
.grid-container > div:nth-child(4) {
  height: 50px;
  background: tomato;
}`,
	buttons: [{
		label: 'Basic auto generation',
		reset: true
	}, {
		label: 'Multiple auto tracks',
		html: getGridWithItems(9),
		css: `
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 50px;
  grid-auto-rows: 20px 50px;
}
.grid-container > div {
  border: 1px solid black;
  background: dodgerblue;
}`
	}, {
		label: 'Column auto generation',
		html: getGridWithItems(9),
		css: `
.grid-container {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 40px;
  grid-template-rows: 50px 50px;
  grid-auto-columns: 20px;
}
.grid-container > div {
  border: 1px solid black;
  background: dodgerblue;
}`
	}, {
		label: 'Ordering demo',
		description: `Note how:
<ul>
	<li>5 is positioned first as it was given an explicit position.</li>
	<li>4 and then 3 are positioned next as they have a lower <code>order</code> (default is <code>0</code>).</li>
	<li>Finally 1 and 2 are positioned in source document order.</li>
</ul>`,
		html: `
<div class="grid-container">
	<div>1</div>
	<div>2</div>
	<div>3</div>
	<div>4</div>
	<div>5</div>
</div>
`,
		css: `

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 50px;
}
.grid-container > div {
  border: 1px solid black;
  background: dodgerblue;
}
.grid-container > div:nth-child(5) {
  background: green;
  grid-column: 2;
  grid-row: 1;
}
.grid-container > div:nth-child(3) {
  background: tomato;
  order: -1;
}
.grid-container > div:nth-child(4) {
  background: gold;
  order: -2;
}`
	}, {
		label: 'Track spanning',
		html: getGridWithItems(7),
		description: 'Note how any empty gap is left and not back-filled.',
		css: `
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 50px;
  grid-auto-rows: 50px;
}
.grid-container > div {
  border: 1px solid black;
  background: dodgerblue;
}
.grid-container > div:nth-child(3) {
  background: tomato;
  grid-column-end: span 2;
}`
	}, {
		label: 'Dense grid placement',
		html: getGridWithItems(7),
		description: 'Note how the empty space is back filled, unlike in the track spanning example.',
		css: `
.grid-container {
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 50px;
  grid-auto-rows: 50px;
}
.grid-container > div {
  border: 1px solid black;
  background: dodgerblue;
}
.grid-container > div:nth-child(3) {
  background: tomato;
  grid-column-end: span 2;
}`
	}]
})

