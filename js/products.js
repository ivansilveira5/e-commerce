const id = localStorage.getItem("catID");
const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${id}.json`;
const container = document.getElementById("cars-container");

function createProducts(dataArray) {
  for (const item of dataArray) {
    container.innerHTML += `
   
    <div class="product-container" onclick="localStorage.setItem('productID', ${item.id}); location.href='product-info.html?id=${item.id}?${item.name}'">
        <img class="product-img img-thumbnail" src="${item.image}">
        <div class="product-text">
             <h1 class="product-title">${item.name} - ${item.currency} ${item.cost}</h1>
             <p class="product-description">${item.description}</p> 
        </div>
        <p class="product-count">${item.soldCount} vendidos</p>
    </div>
    `;
  }
}
showSpinner();
fetch(DATA_URL)
  .then((response) => response.json())
  .then((data) => {
    createProducts(data.products);
    hideSpinner();
  })
  .catch((error) => {
    console.error("Error en el fetch: ", error);
    hideSpinner();
  });
