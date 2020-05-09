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
    <div class="red">text</div>
    <div class="green">text</div>
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
    <div class="red">text</div>
    <div class="b green">text</div>
    <div class="aqua">text</div>
</div>`,
    css: `
.a {
  padding: 10px;
}
.b {
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
    <div class="red">text</div>
    <span class="b green">text</span>
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
    <span class="red">bbbb</span>
    <span class="green">
        cccccc ccc cc
        ccccc cc cc ccc
    </span>
    <span class="aqua">
        text text text
        cannotbesplitsooverflowsssssssssssss
        more text</span>
    <span class="pink">text text text text</span>
    <span class="b red">bigger</span>
    <span class="green">fff fffff ff</span>
</div>`,
    css: `
.a {
  padding: 10px;
  width: 150px;
}
.b {
  font-size: 2em; 
}`,
})

createCSSTestingComponent({
    parent: document.querySelector('.example-inline-formatting-context-props'),
    hiddenCSS,
    html: `<div class="a blue">
    <span class="red">text ttt tt</span>
    <span class="green">text text text text</span>
    <span class="b aqua">text text</span>
    <span class="pink">tt text text text text</span>
</div>`,
    css: `
.a {
  padding: 10px;
  width: 150px;
}
.b {
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
  <span class="red">text</span>
  <span class="b green">text
      <span class="c aqua">text</span>
  </span>
  <span class="pink">text</span>
</div>`,
    css: `
.a {
  padding: 10px;
  width: 150px;
}
.b {
  padding: 0 10px 0 10px;
}`,
})

createCSSTestingComponent({
    parent: document.querySelector('.example-anon-inline'),
    hiddenCSS,
    html: `<div class="a blue">
    Some text
    <span class="red">text</span>
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
  <span class="red">text text</span>
  <span class="green">text text</span>
  <span class="b aqua">
    text text text text text
    text text text
  </span>
  <span class="pink">text text</span>
</div>`,
    css: `
.a {
  padding: 10px;
  width: 150px;
}
.b {
  display: inline-block;
}`,
})