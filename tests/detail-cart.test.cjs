const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');

// Exercise the real cart initializer with an isolated page and storage.
function detailPage(type) {
    const listeners = new Map();
    const button = { addEventListener: (event, callback) => listeners.set(event, callback) };
    const storage = new Map();
    const ready = [];
    const html = readFileSync(require.resolve('../src/pizza.html'), 'utf8');
    const cards = Array.from(html.matchAll(/<a class="pizza-grid-card"([^>]*)>([\s\S]*?)<\/a>/g), ([, attrs, content]) => ({
        dataset: {
            pizzaType: /data-pizza-type="([^"]+)"/.exec(attrs)[1],
            price: /data-price="([^"]+)"/.exec(attrs)[1],
        },
        querySelector: selector => selector === 'h3'
            ? { textContent: /<h3>(.*?)<\/h3>/.exec(content)[1] }
            : { src: /<img src="([^"]+)"/.exec(content)[1] },
    }));
    const context = {
        URLSearchParams,
        window: { location: { search: `?type=${type}` }, Swal: { fire() {} } },
        localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) },
        document: {
            addEventListener: (event, callback) => ready.push(callback),
            getElementById: () => null,
            querySelector: selector => selector === '.btn-order-now' ? button : null,
            querySelectorAll: selector => selector === '.pizza-grid-card' ? cards : [],
        },
    };
    const source = readFileSync(require.resolve('../src/js/cart.js'), 'utf8').replace('export function initializeCart', 'function initializeCart');
    vm.runInNewContext(`${source}\ninitializeCart();`, context);
    ready.forEach(callback => callback());
    return {
        click: () => { assert.ok(listeners.has('click'), 'detail order button must be wired'); listeners.get('click')({ preventDefault() {} }); },
        cart: () => JSON.parse(storage.get('pizzaCart') || '[]'),
        disabled: () => button.disabled,
    };
}

for (const [type, title, price] of [
    ['margarita', 'بيتزا مارجريت', 12],
    ['veggie', 'بيتزا الخضار', 9],
    ['chicken', 'بيتزا الدجاج', 19],
]) {
    test(`detail order adds ${type} with its menu price`, () => {
        const page = detailPage(type);
        page.click();
        const [item] = page.cart();
        assert.equal(item.title, title);
        assert.equal(item.price, price);
        assert.equal(item.quantity, 1);
        assert.ok(item.image);
    });
}
test('repeated detail orders increase the existing quantity', () => {
    const page = detailPage('margarita');
    page.click();
    page.click();
    assert.equal(page.cart().length, 1);
    assert.equal(page.cart()[0].quantity, 2);
});
test('unsupported pizza types cannot add an invalid item', () => {
    const page = detailPage('unknown');
    assert.equal(page.disabled(), true);
    assert.deepEqual(page.cart(), []);
});
