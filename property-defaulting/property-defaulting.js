createCSSTestingComponent({
	parent: document.querySelector('.example-property-defaulting'),
	description: `This example uses the <code>all</code> property to choose the default behaviour of all properties:
<ol>
	<li>When nothing is set behaves as normal, either inheriting or not as appropriate.</li>
	<li>
		When <code>initial</code> is set note how the font size and color change to their initial values rather than
		inheriting.
	</li>
	<li>When <code>inherit</code> is set note how properties which don't normally inherit now do, e.g. the border.</li>
	<li>
		When <code>unset</code> is set it reverts to its default behaviour, the same as not setting anything. Notice how
		none of the user-agent stylesheets for <code>h3</code> are applied.
	</li>
	<li>
		When <code>revert</code> is set it reverts to one level of style origin styles. In this case it reverts back to 
		user-agent settings. Note here how unlike <code>unset</code> margins get added back in and the font weight is 
		increased.
	</li>
</ol>
`,
	html:  `
<div class="parent">
	<h3>nothing set</h3>
	<h3 class="initial">initial</h3>
	<h3 class="inherit">inherit</h3>
	<h3 class="unset">unset</h3>
	<h3 class="revert">revert</h3>
</div>`,
	css: `
h3 {
	margin: 0;
}
.parent {
	color: dodgerblue;
	font-size: 20px;
	border: 1px solid red;
}
.initial {
	all: initial;
}
.inherit {
	all: inherit;
}
.unset {
	font-size: 30px;
	all: unset;
}
.revert {
	all: revert;
}`,
	buttons: [{
		label: 'all',
		reset: true
	}, {
		label: 'colour (inherited)',
		description: `This example uses <code>color</code> which inherits by default:
<ol>
	<li>When nothing is set defaults to inheriting the parent's value.</li>
	<li>When a specific value is set that value is used.</li>
	<li>When <code>initial</code> is set the text is black (its initial value) and does not inherit.</li>
	<li>When <code>inherit</code> is manually set the text also inherits (same as its default).</li>
	<li>When <code>unset</code> is set it reverts to its default behaviour which is inherit.</li>
	<li>When <code>revert</code> is set it reverts to user-agent setting, which in this case is also inherit.</li>
	<li>When nothing is set but there is nothing to inherit from the initial value is used for <code>color</code>.</li>
</ol>
`,
		html: `
<div class="parent">
	<div>nothing set</div>
	<div class="set">set to specific value</div>
	<div class="initial">initial</div>
	<div class="inherit">inherit</div>
	<div class="unset">unset</div>
	<div class="revert">revert</div>
</div>
<div>nothing set, not in parent</div>`,
		css: `
.parent {
	color: dodgerblue;
	border: 1px solid black;
}
.set {
	color: red;
}
.initial {
	color: initial;
}
.inherit {
	color: inherit;
}
.unset {
	color: green;
	color: unset;
}
.revert {
	color: revert;
}`
	}, {
		label: 'border-width (not inherited)',
		description: `This example uses <code>border-style</code> which does not inherit by default:
<ol>
	<li>When nothing is set defaults to initial of none.</li>
	<li>When a specific value is set that value is used.</li>
	<li>When <code>initial</code> is set changes to initial value of none.</li>
	<li>When <code>inherit</code> is set inherits the value from the parent.</li>
	<li>When <code>unset</code> is set it reverts to its default behaviour which is an initial value of none.</li>
	<li>
		When <code>revert</code> is set it reverts to user-agent setting, which does not exist in this case so uses initial 
		value of none.
	</li>
	<li>When nothing is set but there is nothing to inherit from the initial value of none is used.</li>
</ol>
`,
		html: `
<div class="parent">
	<div>nothing set</div>
	<div class="set">set to specific value</div>
	<div class="initial">initial</div>
	<div class="inherit">inherit</div>
	<div class="unset">unset</div>
	<div class="revert">revert</div>
</div>
<div>nothing set, not in parent</div>`,
		css: `
div {
	border-color: red;
	border-width: 5px;
	margin-bottom: 20px;
}
.parent {
	border: 10px solid dodgerblue;
}
.set {
	border-style: dashed;
}
.initial {
	border-style: initial;
}
.inherit {
	border-style: inherit;
}
.unset {
	border-style: solid;
	border-style: unset;
}
.revert {
	border-style: revert;
}`
	}, {
		label: 'font-size (inherited, has user-agent settings)',
		description: `This example uses <code>font-size</code> which inherits by default and has some user-agent styles. 
For Chrome the default for <code>h3</code>s is 1.17em:
<table>
	<thead>
			<tr>
				<th>Element</th>
				<th>Final computed font size</th>
				<th>Notes</th>
			</tr>
	</thead>
	<tbody>
			<tr>
				<td>Nothing set in parent</td>
				<td>28.08px</td>
				<td>
					When nothing is set defaults to user-agent's stylesheet setting of 1.17em. Note this overrides the default 
					inheriting behaviour.
				</td>
			</tr>
			<tr>
				<td>Set to specific value</td>
				<td>38.4px</td>
				<td>When set to a specific value simply takes that value.</td>
			</tr>
			<tr>
				<td><code>initial</code></td>
				<td>16px</td>
				<td>
					When <code>initial</code> is set changes to initial value of <code>medium</code>. Note how this is different
					to the value set in the user-agent stylesheet.
				</td>
			</tr>
			<tr>
				<td><code>inherit</code></td>
				<td>24px</td>
				<td>
					When <code>inherit</code> is set inherits the value from the parent. Note this inherits the computed value not 
					the property value of 1.5em. If it inherited the value pre-computation then the ems would be calculated again 
					relative to the parent.
				</td>
			</tr>
			<tr>
				<td><code>unset</code></td>
				<td>24px</td>
				<td>
					When <code>unset</code> is set it reverts to its default behaviour which is to inherit.
				</td>
			</tr>
			<tr>
				<td><code>revert</code></td>
				<td>28.08px</td>
				<td>
					When <code>revert</code> is set it reverts to user-agent setting of 1.17em. 
				</td>
			</tr>
			<tr>
				<td>Nothing set - not in parent</td>
				<td>18.72px</td>
				<td>
					When nothing is set defaults to user-agent's stylesheet setting of 1.17em. Note this overrides the default 
					inheriting behaviour. This is different to the other user-agent final values due the nesting behaviour of ems.
				</td>
			</tr>
	</tbody>
</table>
`,
		html: `
<div class="parent">
	<h3>nothing set</h3>
	<h3 class="set">set to specific value</h3>
	<h3 class="initial">initial</h3>
	<h3 class="inherit">inherit</h3>
	<h3 class="unset">unset</h3>
	<h3 class="revert">revert</h3>
</div>
<h3>nothing set, not in parent</h3>`,
		css: `
h3 {
	margin: 0;
}
.parent {
	font-size: 1.5em;
	border: 1px solid black;
}
.set {
	font-size: 1.6em;
}
.initial {
	font-size: initial;
}
.inherit {
	font-size: inherit;
}
.unset {
	font-size: 30px;
	font-size: unset;
}
.revert {
	font-size: revert;
}`
	}]
})
