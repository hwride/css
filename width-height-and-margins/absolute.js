/* Width and vertical margins */
const absWidthBaseHTML = `<div>
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
	html: absWidthBaseHTML,
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
		html: absWidthBaseHTML,
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
		html: absWidthBaseHTML,
		css: getAbsWidthCss({
			left: 'auto',
			right: '50px',
			width: '250px'
		})
	}, {
		label: 'Right is auto and forced negative - rules 1, 4',
		description: `Note that when <code>right</code> is forced negative a scroll appears in response to the overflow.
This does not happen when <code>left</code> is forced to be negative.`,
		html: absWidthBaseHTML,
		css: getAbsWidthCss({
			left: '50px',
			right: 'auto',
			width: '250px'
		})
	}, {
		label: 'Width can\'t go below shrink-to-fit - rule 1, 4',
		description: `To make the equation satisfy by modifying the <code>width</code> <code>auto</code> here would 
require taking width below shrink-to-fit, but note it won't go below that.`,
		html: absWidthBaseHTML,
		css: getAbsWidthCss({
			left: '150px',
			right: '150px',
			margin: '0 50px 0 50px',
			width: 'auto'
		})
	}, {
		label: 'Left and width are auto 1, 2, 4',
		description: `<code>width</code> becomes shrink to fit and we solve for <code>left</code>.`,
		html: absWidthBaseHTML,
		css: getAbsWidthCss({
			left: 'auto',
			right: '50px',
			width: 'auto'
		})
	}, {
		label: 'Left and right are auto - rules 1, 3, 4',
		description: `<code>left</code> gets set to the static position and we solve for <code>right</code>.`,
		html: absWidthBaseHTML,
		css: getAbsWidthCss({
			left: 'auto',
			right: 'auto'
		})
	}, {
		label: 'Left, right and width are auto - rules 1, 2, 3, 4',
		description: `<code>width</code> becomes shrink to fit, then <code>left</code> gets set to the static position and 
we solve for <code>right</code>.`,
		html: absWidthBaseHTML,
		css: getAbsWidthCss({
			left: 'auto',
			right: 'auto',
			width: 'auto'
		})
	}]
})

const absWidthNoAutoHTML = `<div>
	<div class="absolute-parent">
		<div class="absolute"></div>
	</div>  
</div>`
createCSSTestingComponent({
	parent: document.querySelector('.example-absolute-width-no-auto'),
	html: absWidthNoAutoHTML,
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
		html: absWidthNoAutoHTML,
		css: getAbsWidthCss({
			left: '0',
			right: '200px',
			width: '150px'
		})}, {
		label: 'Left margin is auto - rule 3',
		description: 'Note how <code>margin-left</code> expands as it\'s auto.',
		html: absWidthNoAutoHTML,
		css: getAbsWidthCss({
			left: '0',
			right: '0',
			width: '150px',
			margin: '0 10px 0 auto'
		})}, {
		label: 'Over-constrained - rule 4',
		description: 'Note how <code>margin-right</code> expands even though it was set to a fixed value, due to rule 4.',
		html: absWidthNoAutoHTML,
		css: getAbsWidthCss({
			left: '0',
			right: '0',
			width: '150px',
			margin: '0 10px 0 10px'
		})}]
})