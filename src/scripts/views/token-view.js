const TokenView = function () {
  const create = function (token) {
    const tokenElement = document.createElement('div');
    tokenElement.className = `token token--${token.id} drop`;
    const innerElement = document.createElement('div');
    innerElement.className = `token__body token__body--${token.id}`;
    const paraElement = document.createElement('p');
    paraElement.className = `token__body__sign`;
    paraElement.textContent = token.token;
    innerElement.append(paraElement);
    tokenElement.append(innerElement);
    return tokenElement;
  };

  return { create };
};
export default TokenView();
