const CallModalBtnView = function () {
  const btn = document.querySelector('.new-game__btn--call');

  const addHandler = function (handler) {
    btn.addEventListener('click', handler);
  };

  return { addHandler };
};

export default CallModalBtnView();
