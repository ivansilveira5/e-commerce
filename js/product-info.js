const id = localStorage.getItem("productID");
const container = document.getElementById("product-container")

const PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${id}.json`;

async function fetchData() {
  await fetch(PRODUCT_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      createProducts(data);
    })
    .catch("error");
}
console.log(fetchData());

function createProducts(Obj) {
    container.innerHTML +=     
    `<p>Nombre ${Obj.name} </p>
    <p>Descripción ${Obj.description}</p>
    <p>Categoría ${Obj.category}</p>
    <p>Cantidad de vendidos ${Obj.soldCount} </p>
    <p>Imágenes ilustrativas</p>`
    Obj.images.map((image)=> {
      container.innerHTML += `<img class="product-img img-thumbnail" src=${image}>`}
    );    
}

