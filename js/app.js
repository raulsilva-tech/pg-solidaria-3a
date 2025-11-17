(function () {
  const app = document.getElementById('app');

  const routes = {
    '': 'home',
    '#home': 'home',
    '#projetos': 'projetos',
    '#cadastro': 'cadastro',
    '#contato': 'contato'
  };

  function renderView(viewName) {
    if (viewName === 'home') {
      
      const home = document.getElementById('home-view');
      if (home) {
        app.innerHTML = '';
        app.appendChild(home);
    
        app.appendChild(home);
      }
      return;
    }

    const tpl = document.getElementById('tpl-' + viewName);
    if (!tpl) {
      app.innerHTML = '<p>Conteúdo não encontrado.</p>';
      return;
    }
    app.innerHTML = '';
    const clone = tpl.content.cloneNode(true);
    app.appendChild(clone);

    document.dispatchEvent(new Event('contentRendered'));
  }

  function onHashChange() {
    const h = document.location.hash || '#home';
    const route = routes[h] || 'home';
    renderView(route);
  }

  window.addEventListener('hashchange', onHashChange);
  document.addEventListener('DOMContentLoaded', function () {

    onHashChange();


    document.querySelectorAll('a[data-route]').forEach(a => {
      a.addEventListener('click', function (e) {
      
      });
    });
  });

})();