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