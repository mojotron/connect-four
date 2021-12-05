const CallBtnView = function () {
  const parentElement = document.querySelector('.wrapper');

  const add = function (handler) {
    const btn = document.createElement('button');
    btn.classList = 'btn new-game__btn--call';
    btn.textContent = 'New Game';
    btn.addEventListener('click', handler);
    parentElement.append(btn);
  };

  const remove = function () {
    const btn = document.querySelector('.new-game__btn--call');
    parentElement.removeChild(btn);
  };

  return {
    add,
    remove,
  };
};

export default CallBtnView();
