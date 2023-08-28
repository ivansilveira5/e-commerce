const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"
const container = document.getElementById("cars-container");
const searchInput = document.getElementById("searchInput");
let filterData;

function createProducts(dataArray) {
    container.innerHTML = "";
    for (const item of dataArray) {
        container.innerHTML += `<div class="product-container">
        <img class="product-img img-thumbnail" src="${item.image}">
        <div class="product-text">
             <h1 class="product-title">${item.name} - ${item.currency} ${item.cost}</h1>
             <p class="product-description">${item.description}</p> 
        </div>
        <p class="product-count">${item.soldCount} vendidos</p>
    </div>`
    }
}
fetch(DATA_URL)
.then(response => response.json())
.then(data => {
    filterData = data.products;
    createProducts(data.products);
})
.catch(error => {
    console.error("Error en el fetch: ", error);
})
function initialize(){

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = filterData.filter((product) => product?.name?.toLowerCase().includes(searchTerm));
    createProducts(filteredProducts);
  });

}
initialize()
