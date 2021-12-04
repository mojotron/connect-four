const NewGameModal = function () {
  const makeModalElement = function (handler) {
    const modal = document.createElement('div');
    modal.className = 'new-game';
    modal.innerHTML = `
      <h1 class="new-game__header">Select New Game Mode</h1>
      <form>
        <div class="new-game__mode">
          <input checked type="radio" name="game-mode" id="pvp" value="pvp" />
          <label for="pvp">player vs player</label>
        </div>
        <div class="new-game__mode">
          <input type="radio" name="game-mode" id="easyAi" value="easy" />
          <label for="easyAi">player vs ai easy</label>
        </div>
        <div class="new-game__mode">
          <input type="radio" name="game-mode" id="normalAi" value="normal" />
          <label for="normalAi">player vs ai normal</label>
        </div>
        <div class="new-game__mode">
          <input type="radio" name="game-mode" id="hardAi" value="hard" />
          <label for="hardAi">player vs ai hard</label>
        </div>

        <button class="btn new-game__btn--start" type="submit">
          Start New Game
        </button>
      </form>
    `;
    const btn = modal.querySelector('button');
    btn.addEventListener('click', e => {
      e.preventDefault();
      const mode = document.querySelector('input[name="game-mode"]:checked');
      handler(mode.value);
    });

    return modal;
  };

  const createModal = function (handler) {
    document.body.append(makeModalElement(handler));
  };
  const removeModal = function () {
    document.querySelector('.new-game').remove();
  };

  return { createModal, removeModal };
};

export default NewGameModal();
