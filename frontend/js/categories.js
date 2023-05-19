// Fetch categories from the backend
function fetchCategories() {
    fetch('http://localhost:3000/categories')
      .then(response => response.json())
      .then(categories => {
        const categoryList = document.getElementById('categoryList');
        categoryList.innerHTML = '';
  
        categories.forEach(category => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${category.id}</td>
            <td>${category.Name}</td>
            <td>
              <button onclick="editCategory(${category.id})">Edit</button>
              <button onclick="deleteCategory(${category.id})">Delete</button>
            </td>
          `;
  
          categoryList.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }
  
  // Create or update a category
  function submitCategory(event) {
    event.preventDefault();
    
    const categoryName = document.getElementById('categoryName').value.trim();
    
    if (categoryName === '') {
      alert('Please enter a category name.');
      return;
    }
    
    
    fetch('http://localhost:3000/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: categoryName })
    })
      .then(response => {
        if (response.ok) {
          document.getElementById('categoryForm').reset();
          fetchCategories();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .catch(error => {
        console.error('Error creating/updating category:', error);
      });
  }
  
  // Edit a category
  function editCategory(categoryId) {
    fetch(`http://localhost:3000/categories/${categoryId}`)
      .then(response => response.json())
      .then(category => {
        document.getElementById('categoryId').value = category.id;
        document.getElementById('categoryName').value = category.name;
      })
      .catch(error => {
        console.error('Error fetching category:', error);
      });
  }
  
  // Delete a category
  function deleteCategory(categoryId) {
    if (confirm('Are you sure you want to delete this category?')) {
      fetch(`http://localhost:3000/categories/${categoryId}`, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            fetchCategories();
          } else {
            throw new Error('Error: ' + response.status);
          }
        })
        .catch(error => {
          console.error('Error deleting category:', error);
        });
    }
  }
  
  // Fetch categories when the page loads
  window.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    document.getElementById('categoryForm').addEventListener('submit', submitCategory);
  });
  