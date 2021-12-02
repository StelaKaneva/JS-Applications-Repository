import { render } from './lib.js';
import articleTemplate from './templates/article.js';
import { onUntil } from './delayed.js';

start();

async function start() {
    const data = await (await fetch('./data.json')).json();
    const main = document.querySelector('#content');
    const renderBtn = document.getElementById('renderBtn');
    renderBtn.addEventListener('click', onRender);

    document.getElementById('changeBtn').addEventListener('click', onChange);
    document.getElementById('untilBtn').addEventListener('click', onUntil);

    function onRender() {
        data[1].author += 1;
        const result = data.map(a => articleTemplate(onSubmit.bind(null, a), a));

        render(result, main);
    }

    function onSubmit(article, event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const content = formData.get('comment');
        article.comments.push({ content });

        onRender();
    }

    function onChange() {
        data.shift();

        data.unshift({
            'title': 'First Article 1234',
            'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            'author': 'John Smith',
            'comments': [],
            'isOwner': true
        });

        onRender();
    }
}