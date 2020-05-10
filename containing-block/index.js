createCSSTestingComponent({
	parent: document.querySelector('.example-initial-containing-block'),
	html: ``,
	css: `
html {
  background: dodgerblue;
  width: 100%;
  height: 100%;
}`,
})

createCSSTestingComponent({
	parent: document.querySelector('.example-static-relative-sticky'),
	html: `<div class="a">
  <div class="b"></div>
  <div class="c"></div>
</div>`,
	css: `
.a {
  background: dodgerblue;
  width: 200px;
  height: 200px;
  padding: 20px;
}
.b {
  background: salmon;
  height: 50%;
  width: 75%;
}
.c {
  background: lightgreen;
  position: relative;
  height: 50%;
  width: 75%;
}`,
	buttons: [{
		label: 'Block container',
		reset: true
	}, {
		label: 'Block container grandparent',
		description: `Notice how <code>c</code> uses <code>b</code> as its containing block and not <code>a</code>.`,
		html: `<div class="a">
  <div class="b">
    <div class="c"></div>
  </div>
</div>`,
		css: `
.a {
  background: dodgerblue;
  width: 200px;
  height: 200px;
  padding: 20px;
}
.b {
  background: salmon;
  width: 100px;
  height: 100px;
}
.c {
  background: lightgreen;
  height: 50%;
  width: 75%;
}`
	}, {
		label: 'Block container ignores inline parent',
		description: `Notice how the child of the red inline element <code>b</code> uses <code>a</code> as its 
containing block, as its the nearest block container ancestor.`,
		html: `<div class="a">
  <span class="b">
    text
    <div class="c"></div>
    text
  </span>
</div>`,
		css: `
.a {
  background: dodgerblue;
  width: 200px;
  height: 200px;
  padding: 20px;
}
.b {
  background: salmon;
}
.c {
  background: lightgreen;
  height: 50%;
  width: 75%;
}`
	}]
})

createCSSTestingComponent({
	parent: document.querySelector('.example-fixed'),
	html: `<div class="a">
  <div class="b"></div>
</div>`,
	css: `
.a {
  background: dodgerblue;
  width: 200px;
  height: 1000px;
}
.b {
  position: fixed;
  background: salmon;
  width: 75%;
  height: 75%;
}`,
})

createCSSTestingComponent({
	parent: document.querySelector('.example-absolute'),
	description: `Notice how <code>b</code> is ignored and <code>a</code> is the containing block.
Also notice how the containing block is the padding area.`,
	html: `<div class="a">
  <div class="b">
    <div class="c"></div>
  </div>
</div>`,
	css: `
.a {
  background: dodgerblue;
  position: relative;
  width: 200px;
  height: 200px;
  padding: 20px;
}
.b {
  background: salmon;
  width: 100px;
  height: 100px;
}
.c {
  background: lightgreen;
  opacity: 50%;
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
}`,
	buttons: [{
		label: 'Block ancestor',
		reset: true
	}, {
		label: 'Inline ancestor',
		description: ``,
		html: `<div class="a">
  <span class="b">
    <span class="c">text text</span>
    <span class="d">text text</span>
    <span class="e"></span>
  </span>
</div>`,
		css: `
.a {
  background: dodgerblue;
  width: 200px;
  height: 200px;
  padding: 20px;
  padding-top: 40px;
}
.b {
  background: salmon;
  position: relative;
  padding: 20px;
}
.c {
  background: aqua;
}
.d {
  background: lavender;
}
.e {
  background: lightgreen;
  opacity: 50%;
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
}`
	}]
})