/* Block width */
createCSSTestingComponent({
	parent: document.querySelector('.example-block-one-auto'),
	html: '<div class="block"></div>',
	css: `
.block {
  background: dodgerblue;
  height: 50px;
  width: 75px;
  margin: 0 50px 0 auto;
  padding: 0 50px 0 50px;
  border-left: 10px solid red;
  border-right: 10px solid red;
}`})

createCSSTestingComponent({
	parent: document.querySelector('.example-block-border-padding-width-large'),
	html: '<div class="block"></div>',
	css: `
.block {
  background: dodgerblue;
  height: 50px;
  width: auto;
  padding: 0 120px 0 120px;
  border: 10px solid red;
  margin: auto;
}`})

createCSSTestingComponent({
	parent: document.querySelector('.example-block-over-constrained'),
	html: '<div class="block"></div>',
	css: `
.block {
  background: dodgerblue;
  height: 50px;
  width: 75px;
  margin: 0 50px 0 50px;
  padding: 0 50px 0 50px;
  border-left: 10px solid red;
  border-right: 10px solid red;
}`})

createCSSTestingComponent({
	parent: document.querySelector('.example-block-width-auto'),
	html: '<div class="block"></div>',
	css: `
.block {
  background: dodgerblue;
  height: 50px;
  width: auto;
  margin: 0 auto 0 auto;
}`})

createCSSTestingComponent({
	parent: document.querySelector('.example-block-margin-auto'),
	html: '<div class="block"></div>',
	css: `
.block {
  background: dodgerblue;
  height: 50px;
  width: 50px;
  margin: auto;
}`})

/* Block height */
createCSSTestingComponent({
	parent: document.querySelector('.example-block-vertical-margin-auto'),
	html: '<div class="block"></div>',
	css: `
.block {
  background: dodgerblue;
  height: 50px;
  margin: auto 0 auto 0;
}`})

createCSSTestingComponent({
	parent: document.querySelector('.example-block-height-inline'),
	html: `<div class="block">
  Text text text text text text text text text text text text text text text text
</div>`,
	css: `
.block {
  background: dodgerblue;
  height: auto;
  width: 10em;
}`})

createCSSTestingComponent({
	parent: document.querySelector('.example-block-height-block-no-bottom-margin-collapse'),
	html: `<div class="block">
  <div></div>
  <div></div>
</div>`,
	css: `
.block {
  background: dodgerblue;
  height: auto;
  width: 10em;
  padding: 5px 0 5px 0;
  margin-bottom: 10px;
}
.block > div {
  background: green;
  height: 20px;
  padding: 5px;
  border: 5px solid red;
}
.block > div:last-child {
  margin-bottom: 20px;
}
`})

createCSSTestingComponent({
	parent: document.querySelector('.example-block-height-block-no-top-margin-collapse'),
	html: `<div class="block">
  <div></div>
  <div></div>
</div>`,
	css: `
.block {
  background: dodgerblue;
  height: auto;
  width: 10em;
  margin-bottom: 10px;
}
.block > div {
  background: green;
  height: 20px;
  padding: 5px;
  border: 5px solid red;
  margin-bottom: 20px;
}
.block > div:last-child {
  height: 0;
  border: 0;
  padding: 0;
  outline: 1px dashed red;
}
`})

createCSSTestingComponent({
	parent: document.querySelector('.example-block-height-zero'),
	html: `<div class="block">
  <div class="child"></div>
  <div class="child"></div>
</div>`,
	css: `
.block {
  background: dodgerblue;
  height: auto;
  width: 10em;
}
`})

/* Block percentage width and height */
/* These examples do not seem to work properly in the iframe. The 100% height stretches to the whole iframe even when
the containing block has a height of auto. Leaving the code in case this can be debugged later. */
/* createCSSTestingComponent({
	parent: document.querySelector('.example-block-percent'),
	html: `<div class="block">
  <div></div>
</div>`,
	css: `
.block {
  background: dodgerblue;
  width: 230px;
  height: 100px;
}
.block > div {
  background: red;
  width: 50%;
  height: 75%;
}
`})

createCSSTestingComponent({
	parent: document.querySelector('.example-block-percent-revert-auto'),
	html: `<div class="block">
  <div></div>
  <div></div>
  <div></div>
</div>`,
	css: `
.block {
  background: dodgerblue;
}
.block > div:nth-child(1) {
  background: red;
  height: 50px;
}
.block > div:nth-child(2) {
  background: green;
  height: 100%;
}
.block > div:nth-child(3) {
  background: gold;
  height: 20px;
  width: 50%;
}
`})

createCSSTestingComponent({
	parent: document.querySelector('.example-block-percent-revert-auto-grandparent-fixed'),
	html: `<div class="grandparent">
  <div class="parent">
    <div class="child"></div>
  </div>
</div>`,
	css: `
.block {
  background: dodgerblue;
}
.grandparent {
  background: red;
  height: 100px;
}
.parent {
  background: green;
  height: auto;
}
.child {
  background: gold;
  height: 100%;
}
`})
*/