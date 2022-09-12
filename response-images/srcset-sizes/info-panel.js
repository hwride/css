const infoPanelHtml = `
<div class="info">
	<table>
		<tr>
			<td><code>window.devicePixelRatio</code></td>
			<td><span class="device-pixel-ratio"></span></td>
		</tr>
		<tr>
			<td><code>window.innerWidth</code></td>
			<td><span class="window-inner-width"></span></td>
		</tr>
		<tr>
			<td><code>devicePixelRatio * innerWidth</code></td>
			<td><span class="device-pixels-inner"></span></td>
		</tr>
		<tr>
			<td><code>window.outerWidth</code></td>
			<td><span class="window-outer-width"></span></td>
		</tr>
		<tr>
			<td><code>devicePixelRatio * outerWidth</code></td>
			<td><span class="device-pixels-outer"></span></td>
		</tr>
	</table>
</div>
`;
document.body.innerHTML += infoPanelHtml;

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
