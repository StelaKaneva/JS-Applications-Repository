import { page, render } from './lib.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { detailsPage } from './views/details.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { getUserData, loadMovie } from './util.js';

const root = document.querySelector('main');

page(decorateContext);
page('/home', catalogPage);
page('/create', createPage);
page('/edit/:id', loadMovie, editPage);
page('/details/:id', loadMovie, detailsPage);
page('/login', loginPage);
page('/register', registerPage);

page('/', '/home');

updateUserNav();
page.start();

async function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        [...document.querySelectorAll('nav .user')].forEach(e => e.style.display = 'block');
        [...document.querySelectorAll('nav .guest')].forEach(e => e.style.display = 'none');
        document.getElementById('welcomeMsg').textContent = `Welcome, ${userData.email}`;
    } else {
        [...document.querySelectorAll('nav .user')].forEach(e => e.style.display = 'none');
        [...document.querySelectorAll('nav .guest')].forEach(e => e.style.display = 'block');
    }
}

