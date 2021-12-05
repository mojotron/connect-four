const LogoView = function () {
  const parentElement = document.querySelector('.logo__headings');
  const add = function () {
    parentElement.innerHTML = `
      <span class="logo__headings__icon"></span><br />
      c<span class="logo__headings__icon"></span>nnect<br />
      f<span class="logo__headings__icon"></span>ur<br />
      <span class="logo__headings__icon"></span>
    `;
  };

  return {
    add,
  };
};

export default LogoView();
