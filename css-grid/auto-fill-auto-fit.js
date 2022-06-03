const gridChildColCss = `
.grid-container > div {
  background: dodgerblue;
  border: 1px solid black;
  height: 50px;
}`;

createCSSTestingComponent({
	parent: document.querySelector('.example-auto-fill-auto-fit'),
	html: `<div class="grid-container">
  <div></div><div></div><div></div>
</div>`,
	css: `
.grid-container {
  display: grid;
  outline: 1px solid red;
  grid-template-columns: repeat(3, 60px);
}
${gridChildColCss}`,
	description: '',
	buttons: [{
		label: 'Basic repeated columns',
		reset: true
	}, {
		label: 'auto-fill definite max track size',
		description: `Note here how the columns are created using the max track size as it is definite.`,
		html: `<div class="grid-container">
  <div></div><div></div><div></div>
  <div></div><div></div><div></div>
</div>`,
		css: `.grid-container {
  display: grid;
  outline: 1px solid red;
  grid-template-columns: 
  	repeat(auto-fill, minmax(10px, 50px));
}
${gridChildColCss}`
	}, {
		label: 'auto-fill indefinite max track size',
		description: `Note here how the columns are created using the min track size as the max track size is indefinite.
It's not permitted to have an indefinite min track size.`,
		html: `<div class="grid-container">
  <div></div><div></div><div></div>
  <div></div><div></div><div></div>
</div>`,
		css: `.grid-container {
  display: grid;
  outline: 1px solid red;
  grid-template-columns: 
  	repeat(auto-fill, minmax(50px, 1fr));
}
${gridChildColCss}`
	}, {
		label: 'auto-fill indefinite max track size, remaining space divided',
		description: `Here how the max track size is indefinite, so the number of columns to use is determined by
the min track size. But the min track size of 51*3 = 153px, which is less than the width of the 200px grid. This
demonstrates how the remaining space is divided between the columns when the max track size is indefinite.`,
		html: `<div class="grid-container">
  <div></div><div></div><div></div>
</div>`,
		css: `.grid-container {
  display: grid;
  width: 200px;
  outline: 1px solid red;
  grid-template-columns: 
  	repeat(auto-fill, minmax(51px, 1fr));
}
${gridChildColCss}`
	}, {
		label: 'auto-fill with empty tracks',
		description: `Note how the automatically created empty tracks are left there.`,
		html: `<div class="grid-container">
  <div></div><div></div><div></div>
</div>`,
		css: `.grid-container {
  display: grid;
  outline: 1px solid red;
  grid-template-columns: 
  	repeat(auto-fill, minmax(30px, 1fr));
}
${gridChildColCss}`
	}, {
		label: 'auto-fit with empty tracks',
		description: `Note how there are no extra empty tracks, and the extra space was divided between the tracks that
have actual grid items in them.`,
		html: `<div class="grid-container">
  <div></div><div></div><div></div>
</div>`,
		css: `.grid-container {
  display: grid;
  outline: 1px solid red;
  grid-template-columns: 
  	repeat(auto-fit, minmax(30px, 1fr));
}
${gridChildColCss}`
	}, {
		label: 'auto-fill 1 track would overflow',
		description: `The minimum number of tracks to make is 1, even if overflow would occur.`,
		html: `<div class="grid-container">
  <div></div><div></div><div></div>
  <div></div><div></div><div></div>
</div>`,
		css: `.grid-container {
  display: grid;
  outline: 1px solid red;
  grid-template-columns: 
  	repeat(auto-fill, minmax(500px, 1fr));
}
${gridChildColCss}`
	}]
})
