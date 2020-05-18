createCSSTestingComponent({
	parent: document.querySelector('.example-transformations'),
	html: `<div class="a"></div>`,
	css: `
.a {
	background: dodgerblue;
	width: 50px;
	height: 50px;
	transform: scale(5, 2);
}`,
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
		description: `Note how the percentage value is using the size of the shape not including the margins. If it
had included the margins it would have shifted beyond the green element as that has the same width as the margin.`,
		html: `<div class="a"></div>
<div class="b"></div>`,
		css: `
.a {
	background: dodgerblue;
	width: 10px;
	height: 10px;
	border: 5px solid red;
	margin-left:; 100px;
	transform: translateX(100%);
}
.b {
    background: green;
    height: 20px;
    width: 100px;
}`
	}]
})