createCSSTestingComponent({
	parent: document.querySelector('.example-interaction-named-lines-areas'),
	html: getGridWithItems(1),
	css: `
.grid-container {
  display: grid;
  grid-template-columns:
    50px [area-start] 50px [area-end];
  grid-template-rows:
    50px [area-start] 50px 50px [area-end];
}
.grid-container > div {
  border: 1px solid black;
  background: dodgerblue;
  grid-area: area;
}
`,
	buttons: [{
		label: 'Template area from named lines',
		reset: true
	}, {
		label: 'Named lines from template area',
		html: getGridWithItems(2),
		css: `
.grid-container {
  display: grid;
  display: grid;
  grid-template:
    ".   area area" 40px
    ".   area area" 40px
    ".   .    .   " 40px
   / 1fr 1fr  1fr
}
.grid-container > div:nth-child(1) {
  border: 1px solid black;
  background: dodgerblue;
  grid-area: area;
}
.grid-container > div:nth-child(2) {
  border: 1px solid black;
  background: tomato;
  grid-column: 1 / area-start;
  grid-row: area-start / area-end;
}`
	}]
})