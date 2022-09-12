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
const headersWithoutDevice = headers.filter(header => header.name !== 'device');
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
const resultsGroupedByDevice = new Map(); // Preserve insertion order.
for(const result of results) {
  if(!resultsGroupedByDevice.has(result.device)) {
    resultsGroupedByDevice.set(result.device, []);
  }
  resultsGroupedByDevice.get(result.device).push(result);
}
let deviceIndex = 0;
const allRows = [];
const rowsByInnerWidth = new Map();
for(const [device, deviceResults] of resultsGroupedByDevice) {
  const isLastDevice = deviceIndex === resultsGroupedByDevice.size - 1;
  let deviceResultIndex = 0;
  for(const deviceResult of deviceResults) {
    const isFirstRow = deviceResultIndex === 0;
    const isLastRow = deviceResultIndex === deviceResults.length - 1;

    const tr = document.createElement('tr');
    allRows.push(tr);
    const innerWidth = deviceResult.innerWidth;
    if(!rowsByInnerWidth.has(innerWidth)) rowsByInnerWidth.set(innerWidth, []);
    rowsByInnerWidth.get(innerWidth).push({
      tr,
      deviceResult
    });

    // When hovering a row, add class to other rows with matching innerWidth.
    tr.addEventListener('mouseover', function() {
      const matchingRows = rowsByInnerWidth.get(innerWidth);
      console.log('mouseover ', matchingRows)
      allRows.forEach(row => row.classList.remove('results-table-highlight'));
      matchingRows.forEach(rowInfo => rowInfo.tr.classList.add('results-table-highlight'));
    })
    // Mark odd rows of each device section for styling.
    // Don't mark even rows as that captures the rowspan device cell which we don't want to style.
    if(deviceResultIndex % 2 !== 0) tr.classList.add('odd-row');

    // Add device with rowspan to the first row.
    if(isFirstRow) {
      tr.innerHTML += `<th rowspan="${deviceResults.length}" ${!isLastDevice ? 'class="section-end-row"' : ''}>
    ${deviceResult.device}
</th>`;
    }

    // Get the column order according to headers.
    for(const header of headersWithoutDevice) {
      const valueForHeader = deviceResult[header.name];
      const td = document.createElement('td');
      td.innerHTML = valueForHeader;

      // Add extra text if defined.
      const additionalText = deviceResult[header.name + 'AdditionalText'];
      if(additionalText) {
        td.innerHTML += additionalText;
      }

      if(isLastRow && !isLastDevice) {
        td.classList.add('section-end-row');
      }

      // Add style classes if defined.
      const stylePropName = header.name + 'Style';
      const style = deviceResult[stylePropName];
      if(style != null) {
        td.classList.add('style-' + style);
      }

      tr.appendChild(td);
    }
    resultsTbody.appendChild(tr);
    deviceResultIndex++;
  }
  deviceIndex++;
}
