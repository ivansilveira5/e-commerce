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

