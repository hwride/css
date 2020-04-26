createCSSTestingComponent({
	parent: document.querySelector('.example-template-areas'),
	html: `
<div class="grid-container">
  <div class="header"></div>
  <div class="sidebar"></div>
  <div class="main"></div>
  <div class="footer"></div>
</div>
`,
	css: `
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 40px);
  grid-template-areas:
    "hd hd   hd  "
    "sd main main"
    "sd main main"
    "ft ft   ft  "
}
.grid-container > div {
  border: 1px solid black;
  background: dodgerblue;
}
.header { grid-area: hd; } 
.sidebar { grid-area: sd; } 
.main { grid-area: main; } 
.footer { grid-area: ft; }
`,
	buttons: [{
		label: 'Basic template area',
		reset: true
	}, {
		label: 'Empty cells',
		html: `
<div class="grid-container">
  <div class="header"></div>
  <div class="sidebar"></div>
  <div class="main"></div>
  <div class="footer"></div>
</div>
`,
		css: `
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 40px);
  grid-template-areas:
    "hd hd   hd  "
    "sd .    main"
    "sd .    main"
    "ft ft   ft  "
}
.grid-container > div {
  border: 1px solid black;
  background: dodgerblue;
}
.header { grid-area: hd; } 
.sidebar { grid-area: sd; } 
.main { grid-area: main; } 
.footer { grid-area: ft; }
`
	}, {
		label: 'grid-template',
		html: `
<div class="grid-container">
  <div class="header"></div>
  <div class="sidebar"></div>
  <div class="main"></div>
  <div class="footer"></div>
</div>
`,
		css: `
.grid-container {
  display: grid;
  grid-template:
    "hd  hd   hd  " 40px
    "sd  main main" 40px
    "sd  main main" 40px
    "ft  ft   ft  " 40px
  /  1fr 1fr  1fr
}
.grid-container > div {
  border: 1px solid black;
  background: dodgerblue;
}
.header { grid-area: hd; } 
.sidebar { grid-area: sd; } 
.main { grid-area: main; } 
.footer { grid-area: ft; }
`
	}, {
		label: 'grid resets implicit grid properties',
		description: 'Notice how the extra div is not 50 pixels wide as specified by ' +
			'<code>grid-auto-rows</code>. This is because <code>grid</code> causes it to reset. Try changing ' +
			'<code>grid</code> to <code>grid-template</code> and see how the new grid row changes to be ' +
			'50 pixels tall.',
		html: `
<div class="grid-container">
  <div class="header"></div>
  <div class="sidebar"></div>
  <div class="main"></div>
  <div class="footer"></div>
  <div></div>
</div>
`,
		css: `
.grid-container {
  display: grid;
  grid-auto-rows: 50px;
  grid:
    "hd  hd   hd  " 40px
    "sd  main main" 40px
    "sd  main main" 40px
    "ft  ft   ft  " 40px
  /  1fr 1fr  1fr
}
.grid-container > div {
  border: 1px solid black;
  background: dodgerblue;
}
.header { grid-area: hd; } 
.sidebar { grid-area: sd; } 
.main { grid-area: main; } 
.footer { grid-area: ft; }
`
	}]
})