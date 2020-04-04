/* Width and vertical margins */
const absBaseHTML = `<div>
  <div class="absolute-parent">
    <div class="absolute"></div>
  </div>  
</div>`
const getAbsWidthCss = (({ left, right, margin, border, padding, width }) => `
.absolute-parent {
  background: gold;
  position: relative;
  height: 100px;
  margin-top: 20px;
}
.absolute {
  background: dodgerblue;
  position: absolute;
  height: 20px;
  left: ${left || 'auto'};
  right: ${right || 'auto'};
  width: ${width || '30px'};
  margin: ${margin || '0 auto 0 auto'};
  border: ${border || '5px solid red'};
  padding: ${padding || '0 10px 0 10px'};
}`)
createCSSTestingComponent({
	parent: document.querySelector('.example-absolute-width-left-right-width-auto'),
	html: absBaseHTML,
	css: getAbsWidthCss({
		right: '10px',
		margin: '0 auto 0 50px'
	}),
	description: 'Notice <code>margin-right</code> becomes zero because it is <code>auto</code>.',
	cssHeight: '20em',
	buttons: [{
		label: 'Left is auto - rules 1, 4',
		reset: true
	}, {
		label: 'Width is auto - rules 1, 4',
		html: absBaseHTML,
		css: getAbsWidthCss({
			left: '10px',
			right: '50px',
			width: 'auto',
			margin: '0 50px 0 auto'
		})
	}, {
		label: 'Left is auto and forced negative - rules 1, 4',
		description: `Note that when <code>left</code> is forced negative no left scroll is applied in response to the 
overflow. A scrollbar does appears when <code>right</code> is forced to be negative though.`,
		html: absBaseHTML,
		css: getAbsWidthCss({
			left: 'auto',
			right: '50px',
			width: '250px'
		})
	}, {
		label: 'Right is auto and forced negative - rules 1, 4',
		description: `Note that when <code>right</code> is forced negative a scroll appears in response to the overflow.
Specifically note as well it is the viewport that is scrolling, not the containing block. A scroll does not appear when 
<code>left</code> is forced to be negative.`,
		html: absBaseHTML,
		css: getAbsWidthCss({
			left: '50px',
			right: 'auto',
			width: '250px'
		})
	}, {
		label: 'Width can\'t go below shrink-to-fit - rule 1, 4',
		description: `To make the equation satisfy by modifying the <code>width</code> <code>auto</code> here would 
require taking width below shrink-to-fit, but note it won't go below that.`,
		html: absBaseHTML,
		css: getAbsWidthCss({
			left: '150px',
			right: '150px',
			margin: '0 50px 0 50px',
			width: 'auto'
		})
	}, {
		label: 'Left and width are auto 1, 2, 4',
		description: `<code>width</code> becomes shrink-to-fit and we solve for <code>left</code>.`,
		html: absBaseHTML,
		css: getAbsWidthCss({
			left: 'auto',
			right: '50px',
			width: 'auto'
		})
	}, {
		label: 'Left and right are auto - rules 1, 3, 4',
		description: `<code>left</code> gets set to the static position and we solve for <code>right</code>.`,
		html: absBaseHTML,
		css: getAbsWidthCss({
			left: 'auto',
			right: 'auto'
		})
	}, {
		label: 'Left, right and width are auto - rules 1, 2, 3, 4',
		description: `<code>width</code> becomes shrink-to-fit, then <code>left</code> gets set to the static position and 
we solve for <code>right</code>.`,
		html: absBaseHTML,
		css: getAbsWidthCss({
			left: 'auto',
			right: 'auto',
			width: 'auto'
		})
	}]
})

createCSSTestingComponent({
	parent: document.querySelector('.example-absolute-width-no-auto'),
	html: absBaseHTML,
	css: getAbsWidthCss({
		left: '10px',
		right: '10px',
		width: '50px'
	}),
	cssHeight: '20em',
	buttons: [{
		label: 'Both margins are auto - rule 1',
		reset: true
	}, {
		label: 'Negative margin - right - rule 2',
		description: 'Note how <code>margin-left</code> is zero and <code>margin-right</code> expands.',
		html: absBaseHTML,
		css: getAbsWidthCss({
			left: '0',
			right: '200px',
			width: '150px'
		})}, {
		label: 'Left margin is auto - rule 3',
		description: 'Note how <code>margin-left</code> expands as it\'s auto.',
		html: absBaseHTML,
		css: getAbsWidthCss({
			left: '0',
			right: '0',
			width: '150px',
			margin: '0 10px 0 auto'
		})}, {
		label: 'Over-constrained - rule 4',
		description: `Note how <code>margin-right</code> expands even though it was set to a fixed value, due to rule 4.
Looking in dev tools for Chrome 80 and Firefox 74 both still actually list <code>margin-right</code> as
<code>10px</code>, although the resulting effect appears to be the same as if it was <code>auto</code>.`,
		html: absBaseHTML,
		css: getAbsWidthCss({
			left: '0',
			right: '0',
			width: '150px',
			margin: '0 10px 0 10px'
		})}]
})

/* Height and horizontal margins */
const getAbsHeightCss = (({ top, bottom, margin, border, padding, height }) => `
.absolute-parent {
  background: gold;
  position: relative;
  height: 250px;
  margin-top: 20px;
}
.absolute {
  background: dodgerblue;
  position: absolute;
  width: 20px;
  top: ${top || 'auto'};
  bottom: ${bottom || 'auto'};
  height: ${height || '30px'};
  margin: ${margin || 'auto 0 auto 0'};
  border: ${border || '5px solid red'};
  padding: ${padding || '10px 0 10px 0'};
}`)
createCSSTestingComponent({
	parent: document.querySelector('.example-absolute-height-top-bottom-height-auto'),
	html: absBaseHTML,
	css: getAbsHeightCss({
		bottom: '10px',
		margin: '0 50px 0 auto'
	}),
	description: 'Notice <code>margin-bottom</code> becomes zero because it is <code>auto</code>.',
	cssHeight: '20em',
	buttons: [{
		label: 'Top is auto - rules 1, 4',
		reset: true
	}, {
		label: 'Height is auto - rules 1, 4',
		html: absBaseHTML,
		css: getAbsHeightCss({
			top: '10px',
			bottom: '50px',
			height: 'auto',
			margin: 'auto 0 50px 0'
		})
	}, {
		label: 'Top is auto and forced negative - rules 1, 4',
		description: `Note that when <code>top</code> is forced negative no top scroll is applied in response to the
overflow. A scrollbar does appears when <code>bottom</code> is forced to be negative though.`,
		html: absBaseHTML,
		css: getAbsHeightCss({
			top: 'auto',
			bottom: '50px',
			height: '250px'
		})
	}, {
		label: 'Bottom is auto and forced negative - rules 1, 4',
		description: `Note that when <code>right</code> is forced negative a scroll appears in response to the overflow.
This does not happen when <code>left</code> is forced to be negative.`,
		html: absBaseHTML,
		css: getAbsHeightCss({
			top: '50px',
			bottom: 'auto',
			height: '450px'
		})
	}, {
		label: 'Height can\'t go below shrink-to-fit - rule 1, 4',
		description: `To make the equation satisfy by modifying the <code>height</code> <code>auto</code> here would
require taking height below shrink-to-fit, but note it won't go below that.`,
		html: absBaseHTML,
		css: getAbsHeightCss({
			top: '150px',
			bottom: '150px',
			margin: '50px 0 50px 0',
			height: 'auto'
		})
	}, {
		label: 'Top and height are auto 1, 2, 4',
		description: `<code>height</code> becomes shrink-to-fit and we solve for <code>top</code>.`,
		html: absBaseHTML,
		css: getAbsHeightCss({
			top: 'auto',
			bottom: '50px',
			height: 'auto'
		})
	}, {
		label: 'Top and bottom are auto - rules 1, 3, 4',
		description: `<code>top</code> gets set to the static position and we solve for <code>bottom</code>.`,
		html: absBaseHTML,
		css: getAbsHeightCss({
			top: 'auto',
			bottom: 'auto'
		})
	}, {
		label: 'Top, bottom and height are auto - rules 1, 2, 3, 4',
		description: `<code>height</code> becomes shrink-to-fit, then <code>top</code> gets set to the static position 
and we solve for <code>bottom</code>.`,
		html: absBaseHTML,
		css: getAbsHeightCss({
			top: 'auto',
			bottom: 'auto',
			height: 'auto'
		})
	}, {
		label: 'Height is shrink-to-fit with block descendants',
		description: `Note the vertical margins are contained.`,
		html: `<div>
  <div class="absolute-parent">
    <div class="absolute">
      <div class="block-child"></div>
      <div class="block-child"></div>
    </div>
  </div>  
</div>`,
		css: getAbsHeightCss({
			top: 'auto',
			bottom: '50px',
			height: 'auto'
		}) + `
.block-child {
  background: green;
  height: 20px;
  margin: 20px 0 20px 0;
}`
	}, {
		label: 'Height is shrink-to-fit with inline descendants',
		description: `Note all line boxes are contained and vertical margins are ignored.`,
		html: `<div>
  <div class="absolute-parent">
    <div class="absolute">
      <span class="inline-child">Inline child 1</span>
      <span class="inline-child">Inline child 2</span>
    </div>
  </div>  
</div>`,
		css: getAbsHeightCss({
			top: 'auto',
			bottom: '50px',
			height: 'auto'
		}) + `
.inline-child {
  background: green;
  margin: 40px 0 40px 0;
}`
	}, {
		label: 'Height is shrink-to-fit contains floated content',
		description: `Shrink-to-fit <code>height</code> will expand to include any floated content in the same block
formatting context (e.g. not any floats inside absolutely positioned descendants).`,
		html: `<div>
  <div class="absolute-parent">
    <div class="absolute">
      <div class="floated"></div>
    </div>
  </div>  
</div>`,
		css: getAbsHeightCss({
			top: 'auto',
			bottom: '50px',
			height: 'auto'
		}) + `
.floated {
  background: green;
  width: 30px;
  height: 30px;
  float: left;
}`
	}, {
		label: 'Height is auto and not shrink-to-fit does not contain floated content',
		description: `But if the <code>height</code> is <code>auto</code> but not shrink-to-fit it will not contain floated 
content.`,
		html: `<div>
  <div class="absolute-parent">
    <div class="absolute">
      <div class="floated"></div>
    </div>
  </div>  
</div>`,
		css: getAbsHeightCss({
			top: '150px',
			bottom: '150px',
			height: 'auto'
		}) + `
.floated {
  background: green;
  width: 30px;
  height: 30px;
  float: left;
}`
	}]
})

createCSSTestingComponent({
	parent: document.querySelector('.example-absolute-height-no-auto'),
	html: absBaseHTML,
	css: getAbsHeightCss({
		top: '10px',
		bottom: '10px',
		height: '50px'
	}),
	cssHeight: '20em',
	description: 'Unlike for regular block boxes vertical margins can center <code>absolute</code> elements.',
	buttons: [{
		label: 'Both margins are auto - rule 1',
		reset: true
	}, {
		label: 'Negative margin - bottom - rule 2',
		description: 'Note how <code>margin-top</code> is zero and <code>margin-bottom</code> expands.',
		html: absBaseHTML,
		css: getAbsHeightCss({
			top: '0',
			bottom: '200px',
			height: '150px'
		})}, {
		label: 'Top margin is auto - rule 3',
		description: 'Note how <code>margin-top</code> expands as it\'s auto.',
		html: absBaseHTML,
		css: getAbsHeightCss({
			top: '0',
			bottom: '0',
			height: '150px',
			margin: 'auto 0 10px 0'
		})}, {
		label: 'Over-constrained - rule 4',
		description: 'Note how <code>margin-bottom</code> expands even though it was set to a fixed value, due to rule 4.',
		html: absBaseHTML,
		css: getAbsHeightCss({
			top: '0',
			bottom: '0',
			height: '150px',
			margin: '10px 0 10px 0'
		})}]
})