const robot = require('robotjs');
const vkey = require('vkey');

function handleMouseUp(data) {
  const { clientX, clientY, screenSize, videoSize } = data;
  const x = (clientX * screenSize.width) / videoSize.width;
  const y = (clientY * screenSize.height) / videoSize.height;
  robot.moveMouse(x, y);
  robot.mouseClick();
  // 本地模拟点击
  setTimeout(() => {
    robot.mouseClick();
  }, 1000);
}

function handleKeyDown(data) {
  const { keyCode, meta, shift, alt, ctrl } = data;
  const modifiers = [];
  if (meta) modifiers.push('meta');
  if (shift) modifiers.push('shift');
  if (alt) modifiers.push('alt');
  if (ctrl) modifiers.push('ctrl');
  const key = vkey[keyCode].toLowerCase();
  if (key[0] !== '<') {
    robot.keyTap(key, modifiers);
  }
}

module.exports = {
  handleKeyDown,
  handleMouseUp,
};
