// Initialization
// - find relevant section

import { showView } from './dom.js';
import { updateNav } from './app.js';
import { showHome } from './home.js';

// - detach section from DOM
const section = document.getElementById('form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
section.remove();

// Display logic
export function showRegister() {
    showView(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repass = formData.get('repeatPassword').trim();

    if (password != repass) {
        alert('Passwords don\'t match!');

        return;
    }

    try {
        const res = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();

        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        };

        sessionStorage.setItem('userData', JSON.stringify(userData));

        form.reset();
        updateUserNav();
        showHomePage();
    } catch (err) {
        alert(err.message);
    }
}