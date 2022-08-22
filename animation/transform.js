createCSSTestingComponent({
	parent: document.querySelector('.example-transformations'),
	html: `<div class="a">Some text</div>`,
	css: `
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	transform: scale(3.5, 2);
	margin: auto;
}`,
	description: `<p>Notice how the text also scales when <code>scale</code> is used.</p>
<p>
	Also notice how scaling happens around the center, not scaling only down and right for example. But this can be
	changed with <code>transform-origin</code>. 
</p>`,
	buttons: [{
		label: 'scale',
		reset: true
	}, {
		label: 'translate',
		description: `Notice how <code>a</code> overlaps <code>b</code> and isn't affecting its layout. The rest of the
layout treats a transformed element as if it has not moved.`,
		html: `<div class="a"></div>
<div class="b"></div>`,
		css: `
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	transform: translate(20px, 40px);
}
.b {
	background: green;
	width: 50px;
	height: 50px;
}`
	}, {
		label: 'rotate',
		html: `<div class="a"></div>`,
		css: `
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	margin: 20px;
	transform: rotate(30deg);
	/* Below is another unit that can be used with rotate. */
	/* transform: rotate(0.6turn); */
}`
	}, {
		label: 'rotate - transform origin',
		description: `This will rotate from the bottom right edge of the element instead of the center.`,
		html: `<div class="a"></div>`,
		css: `
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	margin: 20px;
	transform-origin: right bottom;
	transform: rotate(30deg);
}`
	}, {
		label: 'skew',
		html: `<div class="a"></div>`,
		css: `
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	margin: 20px;
	transform: skew(30deg);
}`
	}, {
		label: 'matrix',
		description: `The matrix transform allows you to apply matrix transformations to the coordinates of an element.`,
		html: `<div class="a"></div>`,
		css: `
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	margin: 20px;
	transform: matrix(1, 1.5, -1, 1, 20, 30);
}`
	}, {
		label: 'multiple transforms',
		html: `<div class="a"></div>`,
		css: `
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	margin: 20px;
	transform: scale(3, 1)
	    translate(20px, 20px)
    	rotate(20deg);
}`
	}, {
		label: 'Percentage',
		description: `Note how the percentage value is using the size of the shape including the margins. If it
had included the margins it would been transformed a further 100px (margin) + 10px (width) = 110px, but it is only 
transformed by 10px which is equal to the element's width.`,
		html: `<div class="a"></div>
<div class="b"></div>`,
		css: `
.a {
	background: dodgerblue;
	width: 10px;
	height: 10px;
	border: 5px solid red;
	margin-left: 100px;
	transform: translateX(100%);
}
.b {
    background: green;
    height: 20px;
    width: 100px;
}`
	}, {
		label: 'Centering with absolute and translate',
		description: `The fact that <code>translate</code> refers to an elements own size for percentages can be used as a
useful mechanism for centering.`,
		html: `<div class="a">
	<div class="b">
		Some <br/>
		Content	
	</div>
</div>`,
		css: `
.a {
  background: dodgerblue;
  position: relative;
  width: 150px;
  height: 150px;
}
.b {
  background: salmon;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
`
	}]
})
