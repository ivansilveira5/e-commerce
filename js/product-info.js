const id = localStorage.getItem("productID");
const container = document.getElementById("product-container")

const PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${id}.json`;
const PRODUCT_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${id}.json`;

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

function fetchComments() {
   fetch(PRODUCT_COMMENTS)
    .then((response) => response.json())
    .then((dataComments) => {
      createComments(dataComments);
    })
    .catch("error");
}
console.log(fetchComments());

function createComments(array) {
  array.forEach(element => {
    container.innerHTML +=     
    `<div>
      <p>${element.user} - ${element.dateTime} - </p>
      <div id="${element.user}">
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span> 
      <span class="fa fa-star"></span> 
      <span class="fa fa-star"></span> 
      <span class="fa fa-star"></span>
      </div>
      <p>${element.description}</p>
    </div>`
    const starContainer = document.getElementById(`${element.user}`);
    let estrellas = starContainer.querySelectorAll(".fa.fa-star");
    console.log(estrellas)
    estrellas.forEach((item, index) => {
      if (index < element.score){
        item.classList.add('checked')
      }
    })
    
  });   
  };