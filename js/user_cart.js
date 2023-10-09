CART_URL = "https://github.com/JaPCeibal/emercado-api/blob/main/user_cart/25801.json";
user_cart = document.getElementById("user_cart");
const exchangeRateApiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

CART = {
    "user": 25801,
    "articles": [
        {
            "id": 50924,
            "name": "Peugeot 208",
            "count": 1,
            "unitCost": 15200,
            "currency": "USD",
            "image": "img/prod50924_1.jpg"
        }
    ]
}

fetch(exchangeRateApiUrl)
        .then(response => response.json())
        .then(data => {
            const rates = data.rates;
            // Obtener la tasa de cambio para UYU
            const uyUstoUSD = rates.UYU;
        })

        .catch(error => console.error("Error al obtener tasas de cambio:", error));



// fetch(CART_URL)
//       .then((response) => response.json())
//       .then((data) => {
//         let articles = data.articles
//         console.log(artilces);
//        // mostrarCarrito(articles);
//       })
//       .catch("error");

  
  function mostrarCarrito(array) {


    // Fetch para el cambio de moneda
    fetch(exchangeRateApiUrl)
        .then(response => response.json())
        .then(data => {
            const rates = data.rates;
            const uyUstoUSD = rates.UYU;

            let articles = array.articles;

            articles.forEach(element => {
                // Convertir el costo a USD si la moneda no es USD
                const costoEnUSD = (element.currency === "USD") ? element.unitCost : element.unitCost * uyUstoUSD;

                // Calcular el subtotal
                const subtotal = element.count * costoEnUSD;

                user_cart.innerHTML +=
                    `<div class="container">
                        <div class="row">
                            <div class="col">
                                <img class="img-thumbnail mw-50" src="${element.image}">
                            </div>
                            <div class="col">
                                <p>${element.name}</p>
                            </div>
                            <div class="col">
                               ${costoEnUSD} USD
                            </div>
                            <div class="col">
                               <input type="text" size="1" value="${element.count}">
                            </div>
                            <div class="col" id="subtotal">
                                ${subtotal} USD
                            </div>
                        </div>
                    </div>`;
            });
        })
        .catch(error => console.error("Error al obtener tasas de cambio:", error));
}

mostrarCarrito(CART);