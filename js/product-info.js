const id = localStorage.getItem("productID");
const container = document.getElementById("product-container")
const container_img = document.getElementById("img-container")
const container_comments = document.getElementById("comments-container")
const form = document.getElementById('newCommentForm');

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
    `<div class="product-info-div">
      <h1>${Obj.name}</h1>
      <hr>
      <h6>Descripción</h6>
      <p>${Obj.description}</p>
      <h6>Categoría</h6>
      <p>${Obj.category}</p>
      <h6>Cantidad de vendidos</h6>
      <p>${Obj.soldCount}</p>
      <h6>Imágenes ilustrativas</h6>
    </div>`
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
      <div class="product-comments-user">
        <h6>${element.user} - ${element.dateTime} - </h6>
        <div id="${element.user}">
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span> 
          <span class="fa fa-star"></span> 
          <span class="fa fa-star"></span> 
          <span class="fa fa-star"></span>
        </div>
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