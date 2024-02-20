const robot = require('robotjs');
const vkey = require('vkey');

function handleMouse(data) {
  const { clientX, clientY, screenSize, videoSize } = data;
  const x = (clientX * screenSize.width) / videoSize.width;
  const y = (clientY * screenSize.height) / videoSize.height;
  robot.moveMouse(x, y);
  robot.mouseClick();
}

function handleKey(data) {
  console.log('key', data);
  const { keyCode, meta, shift, alt, ctrl } = data;
  const modifiers = [];
  if (meta) modifiers.push('meta');
  if (shift) modifiers.push('shift');
  if (alt) modifiers.push('alt');
  if (ctrl) modifiers.push('ctrl');
  const key = vkey[keyCode].toLowerCase();
  robot.keyTap(key, modifiers);
}

module.exports = {
  handleKey,
  handleMouse,
};
