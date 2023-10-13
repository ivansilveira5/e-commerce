const id = localStorage.getItem("productID");
const container = document.getElementById("product-container")
const container_img = document.getElementById("img-container")
const container_comments = document.getElementById("comments-container")
const form = document.getElementById('newCommentForm');
const container_carrousel = document.getElementById("carousel-img-container");
const local_cart = localStorage.getItem("local_cart")

const PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${id}.json`;
const PRODUCT_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${id}.json`;
const CART_URL = "https://github.com/JaPCeibal/emercado-api/blob/main/user_cart/25801.json";

let currentProduct;

async function fetchData() {
  await fetch(PRODUCT_URL)
    .then((response) => response.json())
    .then((data) => {      
      console.log(data);
      createProducts(data);
      showRelatedProducts(data);
      currentProduct = data;
    })
    .catch("error");
}
console.log(fetchData());





function createProducts(Obj) {
  container.innerHTML +=     
  `<div class="product-info-div pt-3">
    <div class="product-info-cabecera">
      <h2 class="text-muted">${Obj.name}</h2>
      <input class="btnBlack" type="submit" value="Comprar" id="add-carrito" onclick="addToCart()">
    </div>
    <hr>
    <strong class="text-muted">Descripción</strong>
    <p class="text-muted">${Obj.description}</p>
    <strong class="text-muted">Categoría</strong>
    <p class="text-muted">${Obj.category}</p>
    <strong class="text-muted">Cantidad de vendidos</strong>
    <p class="text-muted">${Obj.soldCount}</p>
    <strong class="text-muted">Imágenes ilustrativas</strong>
  </div>`

  const carouselItems = Obj.images.map((image, index) => 
  `<div class="carousel-item${index === 0 ? ' active' : ''} img-thumbnail" style="object-fit : cover; background-position : center;">
    <img src="${image}">
  </div>`
);

container_carrousel.innerHTML = carouselItems.join('');

Obj.images.map((image)=> {
  container_img.innerHTML += 
  `<img class="img-thumbnail product-info-img" src=${image}>`}
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
    container_comments.innerHTML +=     
    `<div class="product-comments-div">
      <div class="product-comments-user flex-wrap">
        <h6 class="text-muted">${element.user} - ${element.dateTime} - </h6>
        <div class="text-muted" id="${element.user}">
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span> 
          <span class="fa fa-star"></span> 
          <span class="fa fa-star"></span> 
          <span class="fa fa-star"></span>
        </div>
      </div>
      <p class="text-muted">${element.description}</p>
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


  form.addEventListener('submit', async event => {
    event.preventDefault();// se crea un prevent default, para evitar que la pagina se recarge al tocar el submit.
  
    let userArray = JSON.parse(localStorage.getItem("users"))
    let user = `${userArray[0].firstName}_${userArray[0].lastName}`
    let comentario = document.getElementById("comment")
    let stars = document.getElementById("stars")
  
    //fecha
    let newDate = new Date()
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    const hours = String(newDate.getHours()).padStart(2, '0');
    const minutes = String(newDate.getMinutes()).padStart(2, '0');
    const seconds = String(newDate.getSeconds()).padStart(2, '0');
    const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


    // crear obj
    let datosComentario = {
      product: id,
      score: stars.value,
      description: comentario.value,
      user: user,
      dateTime: dateTime,      
      }

    let datosComentarioArray = [datosComentario]
  
    console.log(datosComentario);
    console.log(datosComentarioArray);
    
    if(document.getElementById(user) == null)
    {
      createComments(datosComentarioArray)
      
      try {
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          {
            method: 'POST',
            body: JSON.stringify(datosComentario)
          },
        );
    
        const resData = await res.json();
    
        console.log(resData);
      } catch (err) {
        console.log(err.message);
      }
    } 
    else {alert("Ya opinaste sobre este producto")}



  });

  // Muestra productos relacionados

  function showRelatedProducts(array){

    let relatedProductsDiv = document.getElementById("relatedProducts")  
    
    array.relatedProducts.forEach(relatedProduct => {
      relatedProductsDiv.innerHTML += `
          <div onclick="redirect(${relatedProduct.id})" class="related-product cursor-active">
              <img class="related-products-img" src="${relatedProduct.image}" alt="${relatedProduct.name}">
              <p class="text-muted">${relatedProduct.name}</p>
          </div>`;
    });
  }

  function redirect(itemId){
    localStorage.setItem("productID", itemId);
    window.location.href="product-info.html"
  }

  //Agregar al carrito

  function addToCart() {
    alert("Se agregó el producto al carrito")
    const currentCart = JSON.parse(localStorage.getItem("local_Cart")) || [];
    
    const newArticle = {
        "id": currentProduct.id,
        "name": currentProduct.name,
        "count": currentProduct.count,
        "unitCost": currentProduct.cost,
        "currency": currentProduct.currency,
        "image": currentProduct.images[0]
    };

    currentCart.push(newArticle);

    localStorage.setItem("local_Cart", JSON.stringify(currentCart));
}