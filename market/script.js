const storedCart = localStorage.getItem("cart");
const cart = storedCart ? JSON.parse(storedCart) : {};

const categories = document.getElementById('categories');
const productList = document.getElementById('products');
const productDetails = document.getElementById('product-details');
const cartDiv = document.getElementById('cart');

function updateLocalStorageCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function show(element, hideElements = []) {
  hideElements.forEach((el) => el.classList.add('hidden'));
  element.classList.remove('hidden');
}

function showCart() {
  show(cartDiv, [categories, productDetails, productList]);
  const cartItemsList = document.getElementById('cart-items');
  while (cartItemsList.firstChild) {
    cartItemsList.removeChild(cartItemsList.firstChild);
  }

  let totalCost = 0;

  for (const category in cart) {
    cart[category].forEach((productId) => {
      const product = document.querySelector(
        `li[data-category="${category}"][data-id="${productId}"]`
      );
      if (product) {
        const productName = product.querySelector('.product-link').textContent;
        const productPrice = parseFloat(product.getAttribute('data-price'));
        totalCost += productPrice;

        const li = document.createElement('li');
        li.textContent = `Product: ${productName}, Category: ${category}, ID: ${productId}, Price: ${productPrice} грн`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Видалити';
        removeButton.addEventListener('click', () =>
          removeItemFromCart(category, productId)
        );

        li.appendChild(removeButton);
        cartItemsList.appendChild(li);
      }
    });
  }

  const totalLi = document.createElement('li');
  totalLi.textContent = `Total: ${totalCost} грн`;
  cartItemsList.appendChild(totalLi);

  updateLocalStorageCart();
}

function updateCartCount() {
  let totalCount = 0;
  for (const category in cart) {
    totalCount += cart[category].length;
  }
  const cartLink = document.getElementById('cartLink');
  cartLink.textContent = `Basket (${totalCount})`;
}

function showCategories() {
  show(categories, [productDetails, productList, cartDiv]);
  document.getElementById('product-list').style.display = 'none';

  const categoryList = document.getElementById('categoryList');
  categoryList.innerHTML = '';

  fetch('http://localhost:3000/api/data')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.categories.forEach((category) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'category-link';
        a.setAttribute('data-category', category.name);
        a.textContent = category.label;

        li.appendChild(a);
        categoryList.appendChild(li);

        a.addEventListener('click', (event) => {
          event.preventDefault();
          const category = a.getAttribute('data-category');
          showProducts(category);
          history.pushState({}, '', `/${category}`);
        });
      });
    });
}

const categoryLinks = document.querySelectorAll('.category-link');
categoryLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const category = link.getAttribute('data-category');
    showProducts(category);
    history.pushState({}, '', `/${category}`);
  });
});

function showProducts(category) {
  document.getElementById('product-list').style.display = 'block';
  show(productList, [productDetails]);
  productList.innerHTML = '';

  fetch('http://localhost:3000/api/data')
    .then((response) => response.json())
    .then((data) => {
      const filteredProducts = data.products.filter(
        (product) => product.category === category
      );
      console.log('filteredProducts', filteredProducts);
      filteredProducts.forEach((product) => {
        const li = document.createElement('li');
        li.setAttribute('data-category', product.category);
        li.setAttribute('data-id', product.id);
        li.setAttribute('data-price', product.price);

        const a = document.createElement('a');
        a.href = '#';
        a.className = 'product-link';
        a.textContent = product.name;

        li.appendChild(a);
        productList.appendChild(li);

        a.addEventListener('click', (event) => {
          event.preventDefault();
          showProductDetails(product.category, product.id);
          history.pushState({}, '', `/${product.category}/${product.id}`);
        });
      });
    });
}

function showProductDetails(category, productId) {
  show(productDetails);
  const product = productList.querySelector(
    `li[data-category="${category}"][data-id="${productId}"]`
  );
  const productName = product.querySelector('.product-link').textContent;
  const productPrice = `${product.getAttribute('data-price')} грн`;
  const buyButton = document.getElementById('buy-button');

  const productNameElement = document.getElementById('product-name');
  const productPriceElement = document.getElementById('product-price');

  productNameElement.textContent = productName;
  productPriceElement.textContent = productPrice;
  buyButton.setAttribute('data-category', category);
  buyButton.setAttribute('data-id', productId);
}

function removeItemFromCart(category, productId) {
  productId = productId.toString();

  if (cart[category]) {
    const index = cart[category].indexOf(productId);
    if (index > -1) {
      cart[category].splice(index, 1);
      showCart();
      updateCartCount();
    }
  }
}

showCategories();

const buyButton = document.getElementById('buy-button');
buyButton.addEventListener('click', () => {
  const category = buyButton.getAttribute('data-category');
  const productId = buyButton.getAttribute('data-id');
  if (!cart[category]) {
    cart[category] = [];
  }
  cart[category].push(productId);
  alert('Товар куплено');
  updateCartCount();
});

const cartLink = document.getElementById('cartLink');
cartLink.addEventListener('click', (event) => {
  event.preventDefault();
  showCart();
  history.pushState({}, '', '/basket');
});

const homeLink = document.getElementById('homeLink');
homeLink.addEventListener('click', (event) => {
  event.preventDefault();
  show(categories, [productDetails, productList, cartDiv]);
  showProducts();
  history.pushState({}, '', '/');
});