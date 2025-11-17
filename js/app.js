// Simple hash-based SPA router and renderer.
// Renders templates embedded as <template id="tpl-..."> to #app
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
      // Home is the existing content inside #home-view
      const home = document.getElementById('home-view');
      if (home) {
        app.innerHTML = '';
        app.appendChild(home);
        // Re-attach home node (clone) to keep template persistent
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
    // Dispatch event so other scripts can apply masks/listeners
    document.dispatchEvent(new Event('contentRendered'));

    // If we rendered the cadastro form, attach submit handler
    if (viewName === 'cadastro') {
      const form = document.getElementById('cadastro-form');
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          const data = new FormData(form);
          const nome = data.get('nome') || '';
          const email = data.get('email') || '';
          const telefone = data.get('telefone') || '';
          const msg = document.getElementById('cadastro-msg');
          msg.textContent = 'Obrigado, ' + nome + '! Recebemos seu cadastro.';
          form.reset();
        });
      }
    }
  }

  function onHashChange() {
    const h = document.location.hash || '#home';
    const route = routes[h] || 'home';
    renderView(route);
  }

  window.addEventListener('hashchange', onHashChange);
  document.addEventListener('DOMContentLoaded', function () {
    // Initial render
    onHashChange();

    // Make nav links with data-route work: prevent default and set hash
    document.querySelectorAll('a[data-route]').forEach(a => {
      a.addEventListener('click', function (e) {
        // default behavior navigates to hash; keep it
      });
    });
  });

})();