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
    description: `Here <code>a</code> forms a block formatting context, and <code>b</code> and <code>c</code> are
wrapped in an anonymous block box. Note how they are wrapped in a single block box rather than separate ones so remain
on the same line.`,
    html: `<div class="a blue">
    <div class="red">text</div>
    <span class="b green">text</span>
    <span class="c aqua">text</span>
</div>`,
    css: `
.a {
  padding: 10px;
}
`,
    buttons: [{
        label: 'Block and inline siblings',
        reset: true
    }, {
        label: 'Mixed children where inline has block child',
        description: `Inline boxes that have block-level children are broken around the block-level boxes, one on each 
side and enclosed in anonymous block-level boxes. The block-level box becomes a sibling of these anonymous block-level boxes.`,
        html: `<div class="a blue">
    <div class="red">text</div>
    <span class="b green">
        text
        <div class="c aqua">text</div>
        text
    </span>
</div>`
    }, {
        label: 'Inline children where inline has block child',
        description: ``,
        html: `<div class="a blue">
    <span class="red">text</span>
    <span class="b green">
        text
        <div class="c aqua">text</div>
        text
    </span>
</div>`
    }]
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