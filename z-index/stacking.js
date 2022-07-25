createCSSTestingComponent({
	parent: document.querySelector('.examples-stacking'),
	html: `<div class="a absolute">
 <strong>a</strong><br />
 position: absolute;
</div>
<div class="b relative">
  <strong>b</strong><br />
  position: relative;
</div>
<div class="c relative">
  <strong>c</strong><br />
  position: relative;
</div>
<div class="d absolute">
  <strong>d</strong><br />
  position: absolute;
</div>
<div class="e static">
  <strong>e</strong><br />
  position: static;
</div>`,
	css: `
div {
  padding: 10px;
  border: 1px solid black;
  text-align: center;
}

.absolute {
  position: absolute;
  width: 150px;
  height: 350px;
  background-color: dodgerblue;
}

.relative {
  position: relative;
  height: 80px;
  width: 450px;
  background-color: salmon;
}

.static {
  position: static;
  height: 80px;
  width: 450px;
  background-color: green;
}

.a { top: 10px; left: 10px; }
.b { top: 70px; left: 20px; }
.c { top: 20px; left: 50px; }
.d { top: 10px; right: 10px; }
.e {
  margin-block-start: 10px;
  margin-inline-start: 80px;
}`,
	description: `Note how:
<ul>
	<li>
		a, b, c and d all stack in DOM order. This is because they all have a position other than static and no z-index,
		so they just stack in DOM order.
	</li>
	<li>
		e is underneath all the elements even though it's last in the DOM. This is because static elements are always 
		positioned underneath positioned elements if z-index is not specified. 
	</li>
</ul>
`,
	buttons: [{
		label: 'Default stacking without z-index - siblings',
		reset: true
	}, {
		label: 'Default stacking without z-index - descendants',
		description: `Here aa is before b and c in the DOM. But note:
 <ul>
 		<li>
			a is shown underneath b due to normal DOM ordering.
		</li>
		<li>
			aa is shown above b overriding DOM ordering. This is because b is <code>position: static</code> and aa is 
			<code>position: absolute</code>. This happens even though the parent of aa is underneath b due to DOM ordering.
			This shows how descendants of an element can overlap the same elements differently to their ancestors as long as 
			they all share the same stacking context. 
		</li>
		<li>
			aa is shown below c, which is after b in the DOM. Element c is <code>position: relative</code> and aa is 
			<code>position: absolute</code>, so DOM ordering is applied in this case.
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
		label: 'With z-index',
		description: ``,
		html: `<div class="test-container test-container-with-z-index">
    <div class="d1">d1
        <div class="d11">d11</div>
        <div class="d12">d12</div>
    </div>
    <div class="d2">d2
        <div class="d21">d21</div>
        <div class="d22">d22</div>
    </div>
    <div class="d3">d3</div>
    <div class="d4">d4</div>
</div>`,
		css: `
.test-container div {
    border: 1px dotted black;
    /* Setting this changes the z order in which things appear. As setting opacity creates a new stacking context. */
    /*opacity: 0.95;*/
    text-align: center;
}

.d1 { background: #6495ed; }
.d2 { background: seagreen; }
.d3 { background: coral; }
.d4 { background: indianred; }

h2.with-z-index {
    clear: both;
    margin-top: 4em;
}

.test-container-with-z-index {
    /* Make relative as all child divs will be absolutely positioned. */
    position: relative;
    font-family: monospace;
    font-size: 12px;
}
.test-container-with-z-index div {
    width: 250px;
    height: 250px;
    /* z-index only has an effect if an element is positioned. */
    position: absolute;

    /* Center text. */
    display: inline-block;
    line-height: 250px;
}

.test-container-with-z-index div > div {
    height: 125px;
    width: 125px;
    line-height: 125px;
}

.test-container-with-z-index .d1 {
    /* .d1 is placed above d2 because it has a higher z-index and is in the same stacking context. */
    z-index: 1;
}
.test-container-with-z-index .d11 {
    background: dodgerblue;
    top: 85px;
    left: 190px;
    z-index: 1;
}
.test-container-with-z-index .d12 {
    background: bisque;
    top: 175px;
    left: 80px;
    /* .d12 appears above .d1 even though it has a lower z-index because children always appear above their parents when
    the parent has a z-index set. TODO: Does this relate to the creation of a new stacking context? Consider. */
    /* .d12 is placed above .d2 and .d3 even though it has a lower z-index. This is because d12's parent d1 has a
    integer z-index which creates a new stacking context. All children in a new stacking context are treated the same as
    the parent outside of that context. If you set .d1's z-index to auto you can see the difference. */
    z-index: -1;
}

.test-container-with-z-index .d2 {
    top: 150px;
    left: 150px;
}
.test-container-with-z-index .d21 {
    background: lawngreen;
    top: -145px;
    left: 95px;
    /* If a parent has a z-index of auto it does not establish a new stacking context and its children will use the
    existing stacking context. In this case that is the root stacking context. This is why .d21 appears above .d11
    even though its parent does not, auto is a special case. */
    z-index: 2;
}
.test-container-with-z-index .d22 {
    background: green;
    top: 60px;
    left: 210px;
    z-index: 1;
}

.test-container-with-z-index .d3 {
    top: 290px;
    left: 175px;
    z-index: 0;
}

.test-container-with-z-index .d4 {
    top: 450px;
    left: 125px;
}`
	}]
})
