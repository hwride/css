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
    label: 'overflow: auto',
    description: `<code>overflow: auto</code> causes a scroll bar to appear to scroll to overflowing children.`,
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
  }]
})