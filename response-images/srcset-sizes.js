function updateDeviceInfo() {
  document.querySelector('.device-pixel-ratio').innerHTML = window.devicePixelRatio;
  document.querySelector('.window-outer-width').innerHTML = window.outerWidth;
  document.querySelector('.device-pixels').innerHTML = window.devicePixelRatio * window.outerWidth;
}
updateDeviceInfo()

window.addEventListener('resize', updateDeviceInfo)
