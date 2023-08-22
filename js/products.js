const id = localStorage.getItem("catID");
const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${id}.json`;
const container = document.getElementById("cat-list-container");
const nameCat = document.getElementById("category");
let filterData;
let catName;

function createProducts(dataArray, catName) {
  container.innerHTML = "";
  nameCat.innerHTML = "";
  nameCat.innerHTML += `Verás aquí todos los productos de la categoría <strong>${catName}</strong>`;
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
    filterData = data.products;
    catName = data.catName;
    hideSpinner();
  })
  .then(() => createProducts(filterData, catName))
  .catch((error) => {
    console.error("Error en el fetch: ", error);
    hideSpinner();
  });

/* ------------------------Sector Filtrado--------------------------------- */

const sortCostDesc = document.getElementById("sortCostDesc");
sortCostDesc.addEventListener("click", () => {
  createProducts(
    filterData.sort((a, b) => b.cost - a.cost),
    catName
  );
});
const sortCostAsc = document.getElementById("sortCostAsc");
sortCostAsc.addEventListener("click", () => {
  createProducts(
    filterData.sort((a, b) => a.cost - b.cost),
    catName
  );
});
const sortCountSoldDesc = document.getElementById("sortCountSoldDesc");
sortCountSoldDesc.addEventListener("click",()=>{
  createProducts(filterData.sort((a,b)=>b.soldCount-a.soldCount),catName)
})
