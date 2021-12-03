const OverlayView = function () {
  const overlayElement = document.querySelector('.overlay');

  const add = function () {
    overlayElement.classList.remove('hidden');
  };

  const remove = function () {
    overlayElement.classList.add('hidden');
  };

  return { add, remove };
};

export default OverlayView();
