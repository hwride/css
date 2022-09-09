function updateDeviceInfo() {
  document.querySelector('.device-pixel-ratio').innerHTML = window.devicePixelRatio;
  document.querySelector('.window-outer-width').innerHTML = window.outerWidth;
  document.querySelector('.window-inner-width').innerHTML = window.innerWidth;
  document.querySelector('.device-pixels-outer').innerHTML = window.devicePixelRatio * window.outerWidth;
  document.querySelector('.device-pixels-inner').innerHTML = window.devicePixelRatio * window.innerWidth;
}
updateDeviceInfo()

window.addEventListener('resize', updateDeviceInfo)
