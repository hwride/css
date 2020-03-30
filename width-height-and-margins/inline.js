/* Width and vertical margins */
createCSSTestingComponent({
	parent: document.querySelector('.example-inline-width'),
	html: `<div>
  Text text text text text text 
  text text text text text
  <span>text</span>
  text text text text text text
  text text text text
</div>`,
	css: `
span {
  background: dodgerblue;
  width: 200px;
}`})

createCSSTestingComponent({
	parent: document.querySelector('.example-inline-margin'),
	html: `<div>
  Text text text text text text 
  text text text text text
  <span class="text-1">text</span>
  text text text 
  <span class="text-2">text</span> 
  text text text text text text
</div>`,
	css: `
.text-1 {
  background: dodgerblue;
  border-left: 5px solid red;
  border-right: 5px solid red;
  padding: 0 20px 0 20px;
  margin: 0 50px 0 50px;
}
.text-2 {
  background: red;
  margin: 0 auto 0 auto;
}
`})

/* Height and horizontal margins */
createCSSTestingComponent({
	parent: document.querySelector('.example-inline-height'),
	html: `<div>
  Text text text text text text 
  text text text text text
  <span class="height">text</span>
  text text text 
  <span class="font-2">text</span> 
  text text text text text text
</div>`,
	css: `
.height {
  background: dodgerblue;
  height: 100px;
}
.font-2 {
  background: red;
  font-size: 2em;
}
`})

createCSSTestingComponent({
	parent: document.querySelector('.example-inline-vertical-props'),
	html: `<div>
  Text text text text text text text text text text text text text text text 
	<span class="vertical-props">Text</span>
	text text text text text text text text text text text text text text text
</div>`,
	css: `
.vertical-props {
  background: dodgerblue;
  margin: 250px 0 250px 0;
  padding: 40px 0 40px 0;
  border-top: 5px solid red;
  border-bottom: 5px solid red;
}
`})