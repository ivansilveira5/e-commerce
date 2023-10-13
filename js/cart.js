CART_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
user_cart = document.getElementById("user_cart");
const exchangeRateApiUrl = "https://api.exchangerate-api.com/v4/latest/USD";
CART = JSON.parse(localStorage.getItem("local_Cart"));
  
async function fetchData() {
    await fetch(CART_URL)
      .then((response) => response.json())
      .then((data) => {      
        console.log(data);
        mostrarCarrito(data.articles);
      })
      .catch("error");
  }
  console.log(fetchData());

  function mostrarCarrito(array) {


    fetch(exchangeRateApiUrl)
    .then(response => response.json())
    .then(data => {
        const rates = data.rates;
        const uyUstoUSD = rates.UYU;

        let articles = array;

        articles.forEach(element => {
            // Convertir el costo a USD si la moneda no es USD
            const costoEnUSD = Math.round((element.currency === "USD") ?  element.unitCost : element.unitCost / uyUstoUSD);

            // Función para calcular y actualizar el subtotal
            addEventListener("input", (UpdateValue) => {
                const countInput = document.getElementById(`countValue${element.id}`);
                const subtotalElement = document.getElementById(`subtotal${element.id}`);
                const count = parseInt(countInput.value);
                const subtotal = count * costoEnUSD;
                subtotalElement.textContent = `Subtotal: ${subtotal} USD`;
            })

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
                                    <input name="countValue" id="countValue${element.id}" class="form-control h-50 w-75" type="number" min="0" value="${element.count}" data-id="${element.id}" oninput="actualizarSubtotal()">
                                </div>
                                <p class="col-6 text-muted" id="subtotal${element.id}">Subtotal: ${element.count * costoEnUSD} USD</p>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
    })
    .catch(error => console.error("Error al obtener tasas de cambio:", error));
  }
mostrarCarrito(CART);