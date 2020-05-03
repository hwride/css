const hiddenCSS = `
  .blue { background: dodgerblue; }
  .red { background: salmon; }
  .green { background: lightgreen; }
  .aqua { background: aquamarine; }
  .pink { background: hotpink; }
`
createCSSTestingComponent({
    parent: document.querySelector('.example-block-formatting-context'),
    hiddenCSS,
    html: `<div class="a blue">
    <div class="b red">b</div>
    <div class="c green">c</div>
</div>`,
    css: `
.a {
  padding: 10px;
}`
})

createCSSTestingComponent({
    parent: document.querySelector('.example-block-formatting-context-props'),
    hiddenCSS,
    html: `<div class="a blue">
    <div class="b red">b</div>
    <div class="c green">c</div>
    <div class="d aqua">d</div>
</div>`,
    css: `
.a {
  padding: 10px;
}
.c {
  width: 100px;
  height: 100px;
  margin: 10px;
  border: 5px solid red;
  padding: 5px;
}`,
})

createCSSTestingComponent({
    parent: document.querySelector('.example-anon-block-box'),
    hiddenCSS,
    html: `<div class="a blue">
    <div class="b red">b</div>
    <span class="c green">c</span>
</div>`,
    css: `
.a {
  padding: 10px;
}
`,
})

createCSSTestingComponent({
    parent: document.querySelector('.example-inline-formatting-context'),
    hiddenCSS,
    html: `<div class="a blue">
    <span class="b red">bbbb</span>
    <span class="c green">
        cccccc ccc cc
        ccccc cc cc ccc
    </span>
    <span class="d aqua">
        text text text
        cannotbesplitsooverflowsssssssssssss
        more text</span>
    <span class="e pink">text text text text</span>
    <span class="f red">bigger</span>
    <span class="g green">fff fffff ff</span>
</div>`,
    css: `
.a {
  padding: 10px;
  width: 150px;
}
.f {
  font-size: 2em; 
}`,
})

createCSSTestingComponent({
    parent: document.querySelector('.example-inline-formatting-context-props'),
    hiddenCSS,
    html: `<div class="a blue">
    <span class="b red">bbb bbb bb</span>
    <span class="c green">ccccc cc ccc</span>
    <span class="d aqua">ddd ddd</span>
    <span class="e pink">ee ee eeeeee eeee eeee ee</span>
</div>`,
    css: `
.a {
  padding: 10px;
  width: 150px;
}
.d {
  width: 100px;
  height: 100px;
  margin: 10px;
  border: 5px solid red;
  padding: 10px;
}`,
})

createCSSTestingComponent({
    parent: document.querySelector('.example-nested-inline'),
    hiddenCSS,
    html: `<div class="a blue">
  <span class="b red">b</span>
  <span class="c green">c
      <span class="d aqua">dddd</span>
  </span>
  <span class="e pink">e</span>
</div>`,
    css: `
.a {
  padding: 10px;
  width: 150px;
}
.c {
  padding: 0 10px 0 10px;
}`,
})

createCSSTestingComponent({
    parent: document.querySelector('.example-anon-inline'),
    hiddenCSS,
    html: `<div class="a blue">
    Some text
    <span class="b red">b</span>
    some more text
</div>`,
    css: `
.a {
  padding: 10px;
}`,
})

createCSSTestingComponent({
    parent: document.querySelector('.example-inline-atomic'),
    hiddenCSS,
    html: `<div class="a blue">
  <span class="b red">text text</span>
  <span class="c green">text text</span>
  <span class="d aqua">
    text text text text text
    text text text
  </span>
  <span class="e pink">text text</span>
</div>`,
    css: `
.a {
  padding: 10px;
  width: 150px;
}
.d {
  display: inline-block;
}`,
})