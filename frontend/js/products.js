// Fetch products from the backend
function fetchProducts(page = 1, pageSize = 18) {
  const offset = (page - 1) * pageSize;
  const url = `http://localhost:3000/products?offset=${offset}&limit=${pageSize}`;

  fetch(url)
    .then(response => response.json())
    .then(products => {
      const productList = document.getElementById('productList');
      productList.innerHTML = '';

      products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.productName}</td>
          <td>${product.categoryId}</td>
          <td>
            <button onclick="updateProduct(${product.id})">update</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
          </td>
        `;

        productList.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
}

// Create or update a product
function submitProduct(event) {
  event.preventDefault();
  
  const productName = document.getElementById('productName').value.trim();
  const categoryId = parseInt(document.getElementById('categoryId').value);
  
  if (productName === '') {
    alert('Please enter a product name.');
    return;
  }
 
  const url = `http://localhost:3000/products`
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productName: productName, categoryId: categoryId })
  })
    .then(response => {
      if (response.ok) {
        document.getElementById('addProductForm').reset();
        fetchProducts();
      } else {
        throw new Error('Error: ' + response.status);
      }
    })
    .catch(error => {
      console.error('Error creating product:', error);
    });
}

// update a product
function updateProduct(productId) {
  fetch(`http://localhost:3000/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      document.getElementById('productId').value = product.id;
      document.getElementById('productName').value = product.name;
      document.getElementById('categoryId').value = product.categoryId;
    })
    .catch(error => {
      console.error('Error fetching product:', error);
    });
}

// Delete a product
function deleteProduct(productId) {
  if (confirm('Are you sure you want to delete this product?')) {
    fetch(`http://localhost:3000/products/${productId}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          fetchProducts();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  }
}

// Fetch products when the page loads
window.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
  document.getElementById('productForm').addEventListener('submit', submitProduct);
});
