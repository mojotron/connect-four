const CurrentPlayerView = function () {
  const parentElement = document.querySelector('.current__player__icon');

  const setIcon = function (icon) {
    parentElement.textContent = `${icon}`;
  };

  const removeIcon = function () {
    parentElement.textContent = '';
  };

  return { setIcon, removeIcon };
};

export default CurrentPlayerView();
