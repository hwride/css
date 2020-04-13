createCSSTestingComponent({
	parent: document.querySelector('.example-simple-grid'),
	html: `<div class="grid-container">
  <div></div>
  <div></div>
</div>`,
	css: `
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 50px);
  grid-template-rows: repeat(4, 50px);
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