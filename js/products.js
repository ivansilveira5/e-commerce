const id = localStorage.getItem("catID");
const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${id}.json`;
const container = document.getElementById("cat-list-container");
const nameCat = document.getElementById("category");
let filterData;
let catName;
/* Funcion que se encarga de hacer los llamados a la api */
function fetchProducts() {
  showSpinner();
  fetch(DATA_URL)
    .then((response) => response.json())
    .then((data) => {
      filterData = data.products;
      catName = data.catName;
      hideSpinner();
      updateProducts(filterData, catName);
    })
    .catch((error) => {
      console.error("Error en el fetch: ", error);
      hideSpinner();
    });
}
/* funcion que se encarga del renderizado de la data que traigo de la api */
function updateProducts(dataArray, catName) {
  container.innerHTML = "";
  nameCat.innerHTML = `Verás aquí todos los productos de la categoría <strong>${catName}</strong>`;
  dataArray.forEach((item) => {
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
  });
}
/* Funcion encargada del sector del filtro */
function applyCostFilter() {
  const costMin = parseFloat(inputCostMin.value);
  const costMax = parseFloat(inputCostMax.value);
  const filteredProducts =
    !isNaN(costMin) && !isNaN(costMax)
      ? filterData.filter((product) => product.cost >= costMin && product.cost <= costMax)
      : !isNaN(costMax)
      ? filterData.filter((product) => product.cost <= costMax)
      : filterData;
  updateProducts(filteredProducts, catName);
}
/* Funcion encargada de iniciar los eventlistener para que todo este actualizado siempre y que sea escalable */
function initialize() {
  fetchProducts();

  sortCostDesc.addEventListener("click", () => {
    updateProducts([...filterData].sort((a, b) => b.cost - a.cost), catName);
  });

  sortCostAsc.addEventListener("click", () => {
    updateProducts([...filterData].sort((a, b) => a.cost - b.cost), catName);
  });

  sortCountSoldDesc.addEventListener("click", () => {
    updateProducts([...filterData].sort((a, b) => b.soldCount - a.soldCount), catName);
  });

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = filterData.filter((product) => product?.name?.toLowerCase()?.includes(searchTerm));
    updateProducts(filteredProducts, catName);
  });

  filterCostButton.addEventListener("click", applyCostFilter);
  clearFilterButton.addEventListener("click", () => {
    updateProducts(filterData, catName);
    inputCostMin.value = "";
    inputCostMax.value = "";
  });
}

initialize();
