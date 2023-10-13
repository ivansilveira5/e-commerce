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
                        <div class="row categoriesCards d-flex">
                            <div class="col-12 col-md-4">
                                <img class="img-thumbnail" src="${element.image}">
                            </div>
                            <div class="col">
                            <div class="col-12 col-sm-8 d-flex flex-wrap justify-content-around align-items-center">
                                <p class="text-muted">${element.name} -</p>
                                <p class="text-muted">${costoEnUSD} USD</p>
                            </div>
                            <div class="d-flex align-items-center">
                            <div class="col-6 col-sm-5">
                            <label for="countValue" class="text-muted">Cant.</label>
                            <input name="countValue" id="countValue" class="form-control h-50 w-75" type="number" min="0" value="${element.count}">
                            </div>
                            <p class="col-6 text-muted" id="subtotal">Subtotal: ${subtotal} USD</p>
                            </div>
                            </div>
                        </div>
                    </div>`;
            });
        })
        .catch(error => console.error("Error al obtener tasas de cambio:", error));
}

mostrarCarrito(CART);