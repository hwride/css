/* Hook up device info panel */
function updateDeviceInfo() {
  document.querySelector('.device-pixel-ratio').innerHTML = window.devicePixelRatio;
  document.querySelector('.window-outer-width').innerHTML = window.outerWidth;
  document.querySelector('.window-inner-width').innerHTML = window.innerWidth;
  document.querySelector('.device-pixels-outer').innerHTML = window.devicePixelRatio * window.outerWidth;
  document.querySelector('.device-pixels-inner').innerHTML = window.devicePixelRatio * window.innerWidth;
}
updateDeviceInfo()

window.addEventListener('resize', updateDeviceInfo)

/* Populate results table */
const results = [{
  device: 'iPhone',
  devicePixelRatio: '2',
  outerWidth: '414',
  innerWidth: '414',
  devicePixelsInner: '828',
  devicePixelsOuter: '828',
  selectedImageSrcsetDpr: '1000x250',
  selectedImageSrcsetWidthDescriptor: '1000x250',
  selectedImageSrcsetPxSizes: '500x250',
}, {
  header: 'Windows 10 + Chrome 105'
}];
const resultsTbody = document.querySelector('.results-table tbody');
for(const result of results) {
  if(result.header) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<th colspan="9">' + result.header + '</th>';
    resultsTbody.appendChild(tr);
  } else {
    const tr = document.createElement('tr');
    const appendTd = text => tr.innerHTML += '<td>' + text + '</td>';
    appendTd(result.device);
    appendTd(result.devicePixelRatio);
    appendTd(result.outerWidth);
    appendTd(result.innerWidth);
    appendTd(result.devicePixelsInner);
    appendTd(result.devicePixelsOuter);
    appendTd(result.selectedImageSrcsetDpr);
    appendTd(result.selectedImageSrcsetWidthDescriptor);
    appendTd(result.selectedImageSrcsetPxSizes);
    resultsTbody.appendChild(tr);
  }
}
