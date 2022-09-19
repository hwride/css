(function() {
	const imgHTML = `<img src="../response-images/max-width/lemur.png">`
	createCSSTestingComponent({
		parent: document.querySelector('.example-replaced'),
		description: `Notice how without styles the image has a default height and width, this is its intrinsic height
and width.`,
		html: imgHTML,
		css: ``,
		buttons: [{
			label: '[Default] Basic image',
			reset: true
		}, {
			label: 'Image with set width',
			description: `Notice here how the height of the image changes when only the width is set. This is because the
height is calculated from the intrinsic ratio of the image as only the width is set.`,
			html: imgHTML,
			css: `img {
  width: 150px;
}`,
		}, {
			label: 'Image with set height',
			description: `Same example as for width but with height.`,
			html: imgHTML,
			css: `img {
  height: 75px;
}`,
		}, {
			label: 'Image with set width and height',
			description: `If both are set then this can break the intrinsic ratio.`,
			html: imgHTML,
			css: `img {
  width: 50px;
  height: 100px;
}`,
		}, {
			label: 'Inline',
			description: `Notice how the text appears alongside the image as you'd expect for inline elements (images 
are inline by default). This is demonstrating that regular box rules are applying to the replaced element even though 
width and height calculations are different.`,
			html: imgHTML + '\ntext',
			css: ``,
		}, {
			label: 'Block',
			description: `Notice here the margin rules apply as normal for blocks are (images are inline by default).`,
			html: imgHTML,
			css: `img {
  display: block;
  margin: auto;
}`,
		}, {
			label: 'Absolute',
			html: imgHTML,
			css: `img {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 150px;
}`,
		}, {
			label: 'Default with no intrinsic dimensions',
			description: `An iframe has no intrinsic dimensions so uses the replaced element defaults of 
<code>300px</code> width and <code>150px</code> height.`,
			html: `<iframe></iframe>`,
			css: `iframe {
  border: 5px solid red;
}`,
		}]
	})
})()
