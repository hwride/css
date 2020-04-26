const getGridWithItems = itemCount => {
	let gridHtml = '<div class="grid-container">\n  '
	for(let i = 0; i < itemCount; i++) {
		gridHtml += '<div></div>'
		if(i > 0 && (i+1) % 3 === 0 && i < itemCount-1) gridHtml += '\n  '
	}
	gridHtml += '\n</div>'
	return gridHtml
}