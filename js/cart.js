CART_URL = "https://github.com/JaPCeibal/emercado-api/blob/main/user_cart/25801.json";
user_cart = document.getElementById("user_cart");
const exchangeRateApiUrl = "https://api.exchangerate-api.com/v4/latest/USD";
CART = JSON.parse(localStorage.getItem("local_Cart"));
  
  function mostrarCarrito(array) {


    // Fetch para el cambio de moneda
    fetch(exchangeRateApiUrl)
        .then(response => response.json())
        .then(data => {
            const rates = data.rates;
            const uyUstoUSD = rates.UYU;

            let articles = array;

            articles.forEach(element => {
                // Convertir el costo a USD si la moneda no es USD
                const costoEnUSD = Math.round((element.currency === "USD") ?  element.unitCost : element.unitCost / uyUstoUSD );
                   
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