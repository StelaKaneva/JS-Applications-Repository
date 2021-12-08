import page from '//unpkg.com/page/page.mjs';

function homePage(ctx, next) {
    main.innerHTML = '<h2>Home Page</h2><p>Welcome to our site!</p>';
}

function catalogPage() {
    main.innerHTML = '<h2>Catalog</h2><p>List of items</p><a href="/catalog/1234">Product</a>';
}

function detailsPage(ctx) {
    console.log(ctx);
    main.innerHTML = '<h2>Product</h2><p>Product Details</p><button>Buy now</button>';
    document.querySelector('button').addEventListener('click', () => {
        page.redirect('/checkout');
    });
}

function checkoutPage() {
    main.innerHTML = '<h2>Card Details</h2><p>Products in card</p>';
}

function aboutPage() {
    main.innerHTML = '<h2>About Us</h2><p>Contact: +359 888 834018</p>';
}

const views = {
    '/catalog/kitchens': () => '<h2>Kitchen Equipment</h2><p>List of items</p>'
};

const main = document.querySelector('main');

page('/home', homePage);
page('/catalog', catalogPage);
page('/catalog/:productNumber', detailsPage);
page('/about', aboutPage);
page('/checkout', checkoutPage);

page.redirect('/', '/home');

page.start();