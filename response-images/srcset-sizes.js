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
const headers = [
  { name: 'device', label: 'Device' },
  { name: 'devicePixelRatio', label: 'Device pixel ratio' },
  { name: 'innerWidth', label: 'innerWidth' },
  { name: 'devicePixelsInner', label: 'Device pixels - inner' },
  { name: 'outerWidth', label: 'outerWidth' },
  { name: 'devicePixelsOuter', label: 'Device pixels - outer' },
  { name: 'selectedImageSrcsetDpr', label: 'DPR image' },
  { name: 'selectedImageSrcsetWidthDescriptor', label: 'srcset only image' },
  { name: 'selectedImageSrcsetPxSizes', label: 'srcset + sizes image' }
];
const results = [{
  device: 'iPhone',
  devicePixelRatio: '2',
  innerWidth: '414',
  outerWidth: '414',
  devicePixelsInner: '828',
  devicePixelsOuter: '828',
  selectedImageSrcsetDpr: '1200x250',
  selectedImageSrcsetWidthDescriptor: '1200x250',
  selectedImageSrcsetPxSizes: '600x250',
}, {
  header: 'Windows 10 + Chrome 105'
}, {
  device: 'Windows 10 + Chrome 105',
  devicePixelRatio: '1',
  innerWidth: '600',
  outerWidth: '616',
  devicePixelsInner: '600',
  devicePixelsOuter: '616',
  selectedImageSrcsetDpr: '600x250',
  selectedImageSrcsetWidthDescriptor: '600x250',
  selectedImageSrcsetPxSizes: '600x250',
}, {
  device: 'Windows 10 + Chrome 105',
  devicePixelRatio: '1',
  innerWidth: '601',
  outerWidth: '617',
  devicePixelsInner: '601',
  devicePixelsOuter: '617',
  selectedImageSrcsetDpr: '1200x250',
  selectedImageSrcsetWidthDescriptor: '1200x250',
  selectedImageSrcsetPxSizes: '1200x250',
}, {
  device: 'Windows 10 + Chrome 105',
  devicePixelRatio: '1',
  innerWidth: '1200',
  outerWidth: '1216',
  devicePixelsInner: '1200',
  devicePixelsOuter: '1216',
  selectedImageSrcsetDpr: '1200x250',
  selectedImageSrcsetWidthDescriptor: '1200x250',
  selectedImageSrcsetPxSizes: '1200x250',
}, {
  device: 'Windows 10 + Chrome 105',
  devicePixelRatio: '1',
  innerWidth: '1201',
  outerWidth: '1217',
  devicePixelsInner: '1201',
  devicePixelsOuter: '1217',
  selectedImageSrcsetDpr: '1500x250',
  selectedImageSrcsetWidthDescriptor: '1500x250',
  selectedImageSrcsetPxSizes: '1500x250',
}];

const resultsTable = document.querySelector('.results-table');
const resultsThead = resultsTable.querySelector('thead');
const resultsTbody = resultsTable.querySelector('tbody');
// Populate table header.
const theadRow = document.createElement('tr');
for(const header of headers) {
  const th = document.createElement('th');
  th.innerHTML = header.label;
  theadRow.appendChild(th);
}
resultsThead.appendChild(theadRow);

// Populate table body.
for(const result of results) {
  if(result.header) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<th colspan="9">' + result.header + '</th>';
    resultsTbody.appendChild(tr);
  } else {
    const tr = document.createElement('tr');
    const appendTd = text => tr.innerHTML += '<td>' + text + '</td>';

    // Get the column order according to headers.
    for(const header of headers) {
      appendTd(result[header.name]);
    }
    resultsTbody.appendChild(tr);
  }
}
