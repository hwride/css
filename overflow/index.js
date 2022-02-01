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
    label: 'overflow on the root',
    description: `Note how on the root element the overflow scrollbar actually appears on the viewport. Notice how
margin and border are within the scrollbar unlike all other elements.`,
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
    label: 'overflow: visible on html tag',
    description: `Setting overflow on the root element to <code>visible</code> actually makes it behave like 
<code>auto</code>. This is actually the default value.`,
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
    label: 'overflow: hidden on html tag',
    description: `This will successfully hide content.`,
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
