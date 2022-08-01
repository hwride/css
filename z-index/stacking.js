createCSSTestingComponent({
	parent: document.querySelector('.examples-stacking'),
	buttons: [{
		label: 'Flow layout default stacking',
		reset: true,
		html: `<div class="a">a</div>
<div class="b">b</div>`,
		css: `
div {
  width: 50px;
  height: 50px;
  border: 3px solid red;
  background: salmon;
  font-size: 32px;
  text-align: center;
}

.b {
  margin-top: -50px;
  margin-left: 27px;
  background: green;
}`,
		description: `Note here two things:
<ol>
	<li>DOM order controls which elements appears in front of the other.</li>
	<li>The first element which is layered behind, but its text is in front of the background of the second element!</li>
</ol>
<p>Flow layout isn't really designed for decent layering, and you're better off with positioned layout.</p>
`
	}, {
		label: 'Positioned layout default stacking',
		html: `<div class="a">a</div>
<div class="b">b</div>`,
		css: `
div {
  width: 50px;
  height: 50px;
  border: 3px solid red;
  background: dodgerblue;
  background: salmon;
  font-size: 32px;
  text-align: center;
}

.a, .b {
  position: relative;
}
.b {
  margin-top: -50px;
  margin-left: 27px;
  background: green;
}`,
		description: `See how when both elements are positioned we don't get strange different layering of text and 
background/borders as in flow layout.`
	}, {
		label: 'Flow vs. positioned layout default stacking',
		html: `<div class="a">a</div>
<div class="b">b</div>`,
		css: `
div {
  width: 50px;
  height: 50px;
  border: 3px solid red;
  background: salmon;
  font-size: 32px;
  text-align: center;
}

.a {
  position: relative;
}
.b {
  margin-top: -50px;
  margin-left: 27px;
  background: green;
}`,
		description: `Notice how regardless of DOM order positioned elements are in front of non positioned elements.`
	}, {
		label: 'Flow vs. positioned layout stacking with z-index',
		html: `<div class="a">a</div>
<div class="b">b</div>`,
		css: `
div {
  width: 50px;
  height: 50px;
  border: 3px solid red;
  background: salmon;
  font-size: 32px;
  text-align: center;
}

.a {
  position: relative;
}
.b {
  margin-top: -50px;
  margin-left: 27px;
  background: green;
  z-index: 10;
}`,
		description: `Notice how even with a z-index flow elements will not be placed above positioned elements.`
	}, {
		label: 'Flex vs. positioned layout default stacking',
		html: `<div class="container">
  <div class="a">a</div>
  <div class="b">b</div>
</div>`,
		css: `
.container {
  display: flex;
}

.container > div {
  width: 50px;
  height: 50px;
  border: 3px solid red;
  font-size: 32px;
  text-align: center;
}

.a {
  position: relative;
  background: salmon;
}
.b {
  margin-top: 6px;
  margin-left: -29px;
  background: green;
}`,
		description: `Notice how positioned elements appear above non-positioned by default for flex items as well.`
	}, {
		label: 'Flex vs. positioned layout stacking with z-index',
		html: `<div class="container">
  <div class="a">a</div>
  <div class="b">b</div>
</div>`,
		css: `
.container {
  display: flex;
}

.container > div {
  width: 50px;
  height: 50px;
  border: 3px solid red;
  font-size: 32px;
  text-align: center;
}

.a {
  position: relative;
  background: salmon;
}
.b {
  margin-top: 6px;
  margin-left: -29px;
  background: green;
  z-index: 1;
}`,
		description: `But notice that you do not need to make a flex item positioned to have z-index have an effect.`
	}, {
			label: 'Flow and positioned stacking of cousin elements',
			description: `Here aa is before b and c in the DOM. But note:
 <ul>
 		<li>
			a is shown underneath b due to normal DOM ordering.
		</li>
		<li>
			aa is shown above b overriding DOM ordering. This is because b is <code>position: static</code> and aa is 
			<code>position: absolute</code>. This happens even though the parent of aa is underneath b due to DOM ordering.
			This shows how descendants of an element can overlap the same elements differently to their ancestors as long as 
			they all share the same <b>stacking context</b>. 
		</li>
		<li>
			aa is shown below c, which is after b in the DOM. Element c and aa are both positioned so DOM ordering is applied 
			in this case.
		</li>
`,
			html: `<div class="a">a
	<div class="aa relative">aa</div>
</div>
<div class="b">b</div>
<div class="c relative">c</div>`,
			css: `
div {
  padding: 10px;
  border: 1px solid black;
  text-align: center;
}

.a {
  background: salmon;
  margin-bottom: -10px;
  margin-right: 50px;
}
.aa {
  background: red;
  position: absolute;
  top: 20px;
  height: 100px;
}
.b {
  background: green;
  margin-right: 25px;
}
.c {
  background: dodgerblue;
  position: relative;
}`
}, {
		label: 'z-index - basic',
		description: `Note here how the stacking order has been completely changed by setting z-index values.`,
		html: `<div class="a">a</div>
<div class="b">b</div>
<div class="c">c</div>`,
		css: `
div {
  padding: 10px;
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  text-align: center;
}

.a {
  background: salmon;
  z-index: 1;
}
.b {
  background: green;
  z-index: 2;
  top: 40px;
  left: 40px;
}
.c {
  background: dodgerblue;
  z-index: 0;
  top: 7px;
  left: 55px;
}`
	}, {
		label: 'z-index - stacking of cousin elements',
		description: `Note here how:
 <ul>
 		<li>
			a is behind both b and bb, due to natural dom ordering.
		</li>
		<li>
			aa is in front of both b and bb, due to having a z-index of 1.
		</li>
</ul>

<p>This shows how even if your ancestors stack one way, you can control stacking of descendents another way with
<code>z-index</code>. This works because all these elements are in the same <b>stacking context</b>.</p>`,
		html: `<div class="a">a
	<div class="aa">aa</div>
</div>
<div class="b">b
	<div class="bb">bb</div>
</div>`,
		css: `
div {
  padding: 10px;
  border: 1px solid black;
  text-align: center;
  position: absolute;
  height: 50px;
  width: 50px;
}

.a {
  background: salmon;
  margin-right: 50px;
  height: 200px;
}
.aa {
  background: red;
  top: 40px;
  z-index: 1;
}
.b {
  background: green;
  top: 15px;
  left: 65px;
  margin-right: 25px;
}
.bb {
  background: lawngreen;
  top: 50px;
  left: -7px;
}`
	}, {
		label: 'New stacking context with isolation: isolate',
		description: `
<p>
	Here the example is exactly the same as the "z-index - stacking of non-siblings" example, except we have applied an
 <code>isolation: isolate</code>. This creates a new <b>stacking context</b>, which means that any elements that are
  descendents in that new stacking context cannot break out of it, and will always be on the same "layer" as their 
  ancestor that created the stacking context.
</p>
<p>The effect here is aa is no longer able to stack different than its parent a with b and bb, they both stack
underneath, as that is what happened to a and a created a new stacking context.</p>`,
		css: `
div {
  padding: 10px;
  border: 1px solid black;
  text-align: center;
  position: absolute;
  height: 50px;
  width: 50px;
}

.a {
  background: salmon;
  margin-right: 50px;
  height: 200px;
  isolation: isolate;
}
.aa {
  background: red;
  top: 40px;
  z-index: 1;
}
.b {
  background: green;
  top: 15px;
  left: 65px;
  margin-right: 25px;
}
.bb {
  background: lawngreen;
  top: 50px;
  left: -7px;
}`
	}]
})
