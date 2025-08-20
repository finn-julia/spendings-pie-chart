const button = document.getElementById('clickMe');
const form = document.getElementById('spendingForm');
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const ctx = document.getElementById('myChart').getContext('2d');

let categories = [];
let amounts = [];

button.addEventListener('click', () => {
  form.style.display = "block";
  button.style.display = "none";
});

// Add new category row
addCategoryBtn.addEventListener('click', () => {
  const div = document.createElement('div');
  div.className = "category-row";
  div.innerHTML = `
    <input type="text" placeholder="Category">
    <input type="number" placeholder="Amount">
  `;
  categoriesContainer.appendChild(div);
});

// Initialize empty pie chart
let myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: categories,
    datasets: [{
      data: amounts,
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    }]
  }
});

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const categoryInputs = document.querySelectorAll('#categoriesContainer input[type="text"]');
  const amountInputs = document.querySelectorAll('#categoriesContainer input[type="number"]');

  const categories = [];
  const amounts = [];

  for (let i = 0; i < categoryInputs.length; i++) {
    const category = categoryInputs[i].value.trim();
    const amount = parseFloat(amountInputs[i].value);
    if (category && !isNaN(amount) && amount > 0) {
      categories.push(category);
      amounts.push(amount);
    }
  }

  if (categories.length === 0) {
    alert("Please enter at least one valid category and amount");
    return;
  }

  // If chart exists, destroy before creating new
  if (myChart) myChart.destroy();

  myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        data: amounts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      }]
    }
  });
});