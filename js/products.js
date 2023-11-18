const catNumber = localStorage.getItem("catID");
const DATA_URL = `http://localhost:4700/json/cats_products/${catNumber}.json`;
const container = document.getElementById("product-container");
const searchInput = document.getElementById("searchInput");
let filterData;

function createProducts(dataArray) {
  container.innerHTML = "";
  for (const item of dataArray) {
    container.innerHTML += `
        
        <div class="col-8 col-sm-12 mb-2">
        <div onclick="redirect(${item.id})" class="list-group-item-action cursor-active categoriesCards mt-3">
          <div class="row">
            <div class="col-12 col-sm-3">
              <img class="img-thumbnail" src="${item.image}">
            </div>
          <div class="col-12 col-md-9">
            <div class="d-flex w-100 justify-content-between flex-wrap mb-2">
              <h4 class="mb-1 text-muted">${item.name} - ${item.currency} ${item.cost}</h4>
              <p class="product-count text-muted">${item.soldCount} vendidos</p>
            </div>
            <p class="product-description text-muted">${item.description}</p> 
          </div>
          </div>
          </div>
    </div>`;
  }
}

function redirect(itemId){
  localStorage.setItem("productID", itemId);
  window.location.href="product-info.html"
}

fetch(DATA_URL)
  .then((response) => response.json())
  .then((data) => {
    filterData = data.products;
    createProducts(data.products);
  })
  .catch((error) => {
    console.error("Error en el fetch: ", error);
  });
function initialize() {
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = filterData.filter((product) => 
    (product?.name?.toLowerCase().includes(searchTerm) || product?.description?.toLowerCase().includes(searchTerm))
    );
    createProducts(filteredProducts);
  });
  sortDesc.addEventListener("click", () => {
    createProducts([...filterData].sort((a, b) => b.cost - a.cost));
  })
  sortAsc.addEventListener("click", () => {
    createProducts([...filterData].sort((a, b) => a.cost - b.cost));
  })
  sortByCount.addEventListener("click", () => {
    createProducts([...filterData].sort((a, b) => b.soldCount - a.soldCount));
  })
}
initialize();

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;
});

document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }
    
    function filterProductsPrice()
    {
        let filterPrice = filterData
        if (minCount !== undefined || maxCount !== undefined)
        {
            filterPrice = filterData.filter((product)=> product.cost <= maxCount && product.cost >= minCount)
        }
        createProducts(filterPrice);
    }

    filterProductsPrice();

});
