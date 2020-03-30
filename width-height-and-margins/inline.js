createCSSTestingComponent({
	parent: document.querySelector('.example-inline-width'),
	html: `<div>
	<span>Text</span>
</div>`,
	css: `
span {
  background: dodgerblue;
  width: 200px;
}`})

createCSSTestingComponent({
	parent: document.querySelector('.example-inline-margin'),
	html: `<div>
	<span class="auto-margin">Text</span>
	<span class="length-margin">word</span>
	text
</div>`,
	css: `
.auto-margin {
  background: dodgerblue;
  margin: 0 auto 0 auto;
}
.length-margin {
  background: red;
  margin: 0 50px 0 50px;
}
`})