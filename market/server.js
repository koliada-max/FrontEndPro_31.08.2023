const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'src')));

app.get('/api/data', (req, res) => {
  const data = {
    categories: [
      { name: 'flowers', label: 'Квіти' },
      { name: 'books', label: 'Книги' },
      { name: 'electronics', label: 'Електроніка' },
    ],
    products: [
      { category: 'flowers', id: 1, name: 'Квітка 1', price: 100 },
      { category: 'flowers', id: 2, name: 'Квітка 2', price: 150 },
      { category: 'books', id: 1, name: 'Книга 1', price: 200 },
      { category: 'books', id: 2, name: 'Книга 2', price: 250 },
      { category: 'electronics', id: 1, name: 'Гаджет 1', price: 300 },
      { category: 'electronics', id: 2, name: 'Гаджет 2', price: 350 },
    ],
  };

  res.json(data);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});