const hiddenCSS = `
  .blue { background: dodgerblue; }
  .red { background: salmon; }
  .green { background: lightgreen; }
  .aqua { background: aquamarine; }
  .pink { background: hotpink; }
`

createCSSTestingComponent({
  parent: document.querySelector('.example-overflow'),
  hiddenCSS,
  description: `The default is <code>overflow: visible</code> which means the child is visible outside the parents.`,
  html: `<div class="a blue">
    <div class="b red"></div>
</div>`,
  css: `
.a {
  height: 100px;
  padding: 20px;
}
.b {
  height: 200px;
  width: 100px;
}`,
  buttons: [{
    label: 'overflow: visible (default)',
    reset: true
  }, {
    label: 'overflow: hidden',
    description: `<code>overflow: hidden</code> causes the overflowing part of children to be hidden.`,
    html: `<div class="a blue">
    <div class="b red"></div>
</div>`,
    css: `
.a {
  height: 100px;
  padding: 20px;
  overflow: hidden;
}
.b {
  height: 200px;
  width: 100px;
}`,
  }, {
    label: 'overflow: auto',
    description: `<code>overflow: auto</code> causes a scroll bar to appear to scroll to overflowing children. If there 
is no overflow then no scroll bar will appear.<br/><br/>

Notice the scroll bars are taken out of the space of the block that is scrolling.`,
    html: `<div class="a blue">
    <div class="b red"></div>
</div>`,
    css: `
.a {
  height: 100px;
  padding: 20px;
  overflow: auto;
}
.b {
  height: 200px;
  width: 100px;
}`,
  }, {
    label: 'overflow: scroll',
    description: `Causes a scroll bar to always appear even when children aren't overflowing.`,
    html: `<div class="a blue">
    <div class="b red"></div>
</div>`,
    css: `
.a {
  height: 100px;
  padding: 20px;
  overflow: scroll;
}
.b {
  height: 50px;
  width: 100px;
}`,
  }, {
    label: 'Overflow top or left',
    description: `If an element overflows to the top or left of a box then no scroll bars will appear to allow the user
to scroll to it. It will just be invisible. Make the margin properties positive and you will see scroll bars appear to
allow the content to be scrolled to.`,
    html: `<div class="a blue">
    <div class="b red"></div>
</div>`,
    css: `
.a {
  height: 100px;
  padding: 20px;
  overflow: auto;
}
.b {
  height: 100px;
  width: 100px;
  margin-top: -75px;
  margin-left: -75px;
}`,
  }, {
    label: 'Nested overflow',
    description: `When a child overflows multiple ancestors the first ancestor it overflows will be the one to scroll.`,
    html: `<div class="a blue">
    <div class="b red">
        <div class="c green">
    </div>
</div>`,
    css: `
.a {
  height: 100px;
  padding: 20px;
  overflow: auto;
}
.b {
  height: 50px;
  padding: 20px;
  overflow: auto;
}
.c {
  height: 200px;
  width: 100px;
}`,
  }, {
    label: 'Overflow of non-direct descendants',
    description: `The content that overflow applies to is not just direct children, but any descendants. See here the
child <code>.b</code> does not overflow itself, but the grandchild <code>.c</code> does due it being larger than 
<code>.b</code> and <code>.b</code> having <code>overflow: visible</code> set. See how this still causes scrollbars on 
its grandparent <code>.a</code>.
<br/><br/>
Try setting <code>overflow: hidden</code> on <code>.b</code> and notice scrollbars disappear on <code>.a</code>.`,
    html: `<div class="a blue">
    <div class="b red">
        <div class="c green">
    </div>
</div>`,
    css: `
.a {
  height: 100px;
  padding: 20px;
  overflow: auto;
}
.b {
  height: 50px;
  padding: 20px;
  overflow: visible;
}
.c {
  height: 200px;
  width: 100px;
}`,
  }, {
    label: 'Overflow of position: relative',
    description: `You can still scroll to see elements that have been moved with <code>position: relative</code>.
<br/><br/>
Note how the padding is lost on the scrollable containing block though.`,
    html: `<div class="a blue">
    <div class="b red">
    </div>
</div>`,
    css: `
.a {
  height: 100px;
  padding: 20px;
  overflow: auto;
}
.b {
  height: 50px;
  padding: 20px;
  position: relative;
  top: 100px;
  left: 50px;
}`,
  }, {
    label: 'Overflow of position: absolute',
    description: `You can still scroll to see elements that have been moved with <code>position: absolute</code>. Note
this is only the case if the ancestor is the containing block - remove the <code>position: relative</code> property on
<code>.a</code> and see how it no longer scrolls. This is because the containing block is no longer <code>.a</code>`,
    html: `<div class="a blue">
    <div class="b red">
    </div>
</div>`,
    css: `
.a {
  height: 100px;
  padding: 20px;
  overflow: auto;
  position: relative;
}
.b {
  height: 50px;
  padding: 20px;
  position: absolute;
  top: 100px;
  left: 50px;
}`,
  }, {
    label: 'overflow on html sets viewport overflow',
    description: `Setting overflow on the root element actually sets it on the viewport. Notice how margin and
border are within the scrollbar unlike all other elements, this is a special property of viewport overflow.`,
    html: `<div class="a blue"></div>`,
    css: `
html {
  border: 5px solid salmon;
  margin: 5px;
  padding: 5px;
}
.a {
  height: 2000px;
  width: 50px;
}`,
  }, {
    label: 'Comparison viewport and element overflow',
    description: `Note:
<ul>
    <li>
        The border and margin are inside the scrollbar for viewport overflow but outside the scrollbar for element 
        overflow.
    </li>
    <li>
        The background colour for <code>html</code> also applies in the margins (the
        same applies if <code>body</code> is used.
    </li>
</ul>`,
    html: `<div class="a">
    <div class="b"></div>
</div>`,
    css: `
html {
  background: darkgreen;
  border: 5px solid lightgreen;
  margin: 5px;
  padding: 5px;
}
.a {
  width: 100px;
  height: 1000px;
  overflow: auto;
  background: crimson;
  border: 5px solid salmon;
  margin: 5px;
  padding: 5px;
}
.b {
  height: 4000px;
  width: 50px;
  background: dodgerblue;
  border: 5px solid lightblue;
}`,
  }, {
    label: 'overflow on body can set viewport overflow',
    description: `The <code>html</code> tag has <code>overflow: visible</code> by default. When no overflow value is 
set on <code>html</code> but one exists on <code>body</code> that will instead by used as the viewport's overflow value.
<br/><br/>
Note how the border and padding show the overflow is still applied to the viewport.
<br/><br/>
Try setting the <code>html</code> to have <code>overflow: auto</code> to see how that would override the 
<code>overflow</code> setting on the body tag.
`,
    html: `<div class="a blue"></div>`,
    css: `
html {
  /*overflow: auto*/
  border: 5px solid salmon;
  margin: 5px;
  padding: 5px;
}
body {
  overflow: hidden;
}
.a {
  height: 2000px;
  width: 50px;
}`,
  }, {
    label: 'overflow: visible on viewport',
    description: `Setting overflow on the viewport (via the <code>html</code> tag in this case) to <code>visible</code>
actually makes it behave like <code>auto</code>. <code>visible</code> is actually the default value.`,
    html: `<div class="a blue"></div>`,
    css: `
html {
  overflow: visible;
}
.a {
  height: 2000px;
  width: 50px;
}`,
  }, {
    label: 'overflow: hidden on viewport',
    description: `This will successfully hide content outside the viewport.`,
    html: `<div class="a blue"></div>`,
    css: `
html {
  overflow: hidden;
}
.a {
  height: 2000px;
  width: 50px;
}`,
  }]
})
