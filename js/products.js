const containers = document.getElementById("containers");
const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/101.json`;
function showData(dataArray) {
  const itemsHTML = dataArray.map((item) => {
    return `
      <div class="stylegeneraljs">
      <div class="stylemapeo">

      <p><strong> ${item.name}</strong></p>
      <img src="${item.image}" alt="${item.name}" />
      
      <div class="stylecostandcount">
      <p><strong>Cost:</strong> ${item.cost} ${item.currency}</p>
      <p><strong>Sold Count:</strong> ${item.soldCount}</p>
      </div>

      <p><strong>Description:</strong> ${item.description}</p>
      <button onclick="localStorage.setItem('productID', ${item.id}); location.href='product-info.html'">Ver Más</button>

      </div>
    </div>
    `
  });

  containers.innerHTML = itemsHTML.join("");
}

fetch(DATA_URL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.products);
    showData(data.products);
  })
  .catch((error) => {
    console.error("Error en el fetch:", error);
  });
