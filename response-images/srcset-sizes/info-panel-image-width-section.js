addInfoPanelSection(
  '<code>imageWidth</code>',
  '<span class="info-panel-image-width"></span>',
  () => {
    const width = document.querySelector('.example-img-figure img').width;
    document.querySelector('.info-panel-image-width').innerHTML = width;
  }
)
