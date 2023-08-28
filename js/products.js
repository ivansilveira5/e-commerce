const catNumber = localStorage.getItem("catID")
const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${catNumber}.json`
const container = document.getElementById("cars-container");

function createProducts(dataArray) {
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
    console.log(data);
    createProducts(data.products);
})
.catch(error => {
    console.error("Error en el fetch: ", error);
})