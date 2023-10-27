CART_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
user_cart = document.getElementById("user_cart");
const exchangeRateApiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

const localStorageCart = JSON.parse(localStorage.getItem("local_Cart"));

// Funcion para unificar y no repetir en el carrito
function unifyCarts(serverCart, localStorageCart) {
  // Creamos un mapa para rastrear elementos por ID
  const idMap = new Map();

  // Agregamos elementos del servidor al mapa
  for (const article of serverCart.articles) {
    idMap.set(article.id, article);
  }

  // Agregamos elementos de localStorage al mapa o actualizamos el count si ya existe
  for (const article of localStorageCart) {
    if (idMap.has(article.id)) {
      idMap.get(article.id).count += article.count;
    } else {
      idMap.set(article.id, article);
    }
  }

  // Convertimos el mapa de nuevo en un arreglo
  const unifiedCart = Array.from(idMap.values());

  return unifiedCart;
}

// Fetch del carrito de la API

fetch(CART_URL)
  .then((response) => response.json())
  .then((serverCart) => {
    // Unificar los carritos
    const unifiedCart = unifyCarts(serverCart, localStorageCart);
    console.log(unifiedCart);
    mostrarCarrito(unifiedCart)
  })
  .catch((error) => {
    console.error("Error al obtener datos del servidor:", error);
  });

  // Fetch del cambio de moneda - El valor en pesos debe ser dividido por el valor que devuelve esta función

  function exchange(){
    return fetch(exchangeRateApiUrl)
    .then(response => response.json())
    .then(data => {
        const rates = data.rates;
        const uyUstoUSD = rates.UYU;
        console.log(uyUstoUSD);
        return uyUstoUSD
     }
    )
}

// función para mostrar el carrito en HTML

async function mostrarCarrito(array) {
    let articles = array;
    const rate = await exchange();
    articles.forEach(async element => {
        // Convertir el costo a USD si la moneda no es USD
        const costoEnUSD = Math.round((element.currency === "USD") ?  element.unitCost : element.unitCost / rate);
        console.log(`Soy un costoEnUSD individual ${costoEnUSD}`)

        addEventListener("input", (UpdateValue) => {
            
        });

        user_cart.innerHTML +=
            `<div class="container">
                <div class="row categoriesCards d-flex flex-wrap">
                    <div class="col-12 col-md-4">
                        <img class="img-thumbnail" src="${element.image}">
                    </div>
                    <div class="col">
                        <div class="col-12 col-sm-8 d-flex flex-wrap justify-content-around align-items-center">
                            <h6 class="text-muted">${element.name} - ${costoEnUSD} USD</h6>
                        </div>
                        <div class="row d-flex align-items-center flex-wrap">
                            <div class="col-6 col-sm-5">
                                <label for="countValue" class="text-muted">Cant.</label>
                                <input name="countValue" id="countValue${element.id}" class="form-control h-50 w-75" oninput min="1" value="${element.count}" data-id="${element.id}">
                            </div>
                            <p class="col-5 text-muted" id="subtotal${element.id}">Subtotal: ${element.count * costoEnUSD} USD</p>
                            <div class="col-1">
                                <button type="button" data-id="${element.id}" class="btn btn-outline-danger button-delete" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

    }); 
    const deleteButtons = document.getElementsByClassName("button-delete");
    console.log(deleteButtons)
    const arraybuttons = Array.from(deleteButtons)
    console.log(arraybuttons)
    
    arraybuttons.forEach(deleteButton => {
        deleteButton.addEventListener("click", () => {
         const productId= deleteButton.getAttribute("data-id")
         console.log(productId)
         const currentData = JSON.parse(localStorage.getItem('local_Cart'))
         console.log(currentData)
         const newData = currentData.filter((e) => e.id != productId)
            console.log(newData)
            localStorage.setItem("local_Cart", JSON.stringify(newData));
            location.reload() 
        })
})
.catch(error => console.error("Error al obtener tasas de cambio:", error));
}

