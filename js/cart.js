CART_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
user_cart = document.getElementById("user_cart");
const exchangeRateApiUrl = "https://api.exchangerate-api.com/v4/latest/USD";
CART = JSON.parse(localStorage.getItem("local_Cart"));
const buyForm = document.getElementById("buy_form");
const buyModal = document.getElementById("buy_modal");
const calle = document.getElementById("calle");
const numero = document.getElementById("numero");
const esquina = document.getElementById("esquina");

const creditcard = document.getElementById("creditcard");
const banktransfer = document.getElementById("banktransfer");
const cardnumber = document.getElementById("cardnumber");
const accountNumberField = document.getElementById("accountnumber");
const securitycode = document.getElementById("securitycode");
const expirationdate = document.getElementById("expirationdate");


const paymentStatusParagraph = document.getElementById("paymentStatus");
const buyButton = document.getElementById("buy_button");
const continuarButton = document.getElementById("btnContinuarModal");
var formaPago = false;

/*
const subtotalHTML = document.getElementById('subtotalHTML');
const shipPriceHTML = document.getElementById('shipPriceHTML');
const totalHTML = document.getElementById('totalHTML');
const premiumCheck = document.getElementById('premium');
const expressCheck = document.getElementById('express');
const standarCheck = document.getElementById('standar');
*/

async function fetchData() {
    await fetch(CART_URL)
      .then((response) => response.json())
      .then((data) => {      
        console.log(data);
        mostrarCarrito(data.articles)
      })
      .catch("error");
  }
  console.log(fetchData());

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


  async function mostrarCarrito(array) {
        let articles = array;
        const rate = await exchange();
        articles.forEach(async element => {
            // Convertir el costo a USD si la moneda no es USD
            const costoEnUSD = Math.round((element.currency === "USD") ?  element.unitCost : element.unitCost / rate);
            console.log(`Soy un costoEnUSD individual ${costoEnUSD}`)

            addEventListener("input", (UpdateValue) => {
                obtenerValores()
                inputEvents(element.id)
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

const radiooPremium = document.getElementById("premium");
const radioExpress = document.getElementById("express");
const radioStandar = document.getElementById("standar");

// calculo del total
function calculoSubtotal(array) {
    let subtotal = [];
    let subtotalFinal = 0;
    let porcentajeFinal = 0;
    array.forEach(object => {
        let result = object.itemCount * object.itemPrice;
        subtotal.push(result)
        let subtotalHTMLIndividual = document.getElementById(`subtotal${object.itemId}`)
        subtotalHTMLIndividual.textContent = `${result} USD`
        if(radiooPremium.checked)
        {
            porcentajeFinal += radiooPremium.value * result;
        }
        if(radioExpress.checked)
        {
            porcentajeFinal += radioExpress.value * result;
        }
        if(radioStandar.checked)
        {
            porcentajeFinal += radioStandar.value * result;
        }
    });

    subtotal.forEach(value => {
        subtotalFinal += value;
    })

    let subtotalHTMLCostos = document.getElementById('priceSubTotal');
    subtotalHTMLCostos.textContent = `${subtotalFinal} USD`
    let envioHTMLCostos = document.getElementById('priceEnvio');
    envioHTMLCostos.textContent = `${porcentajeFinal} USD`
    let totalHTMLCostos = document.getElementById('priceTotal');
    totalHTMLCostos.textContent = `${subtotalFinal + porcentajeFinal} USD`
}

addEventListener("DOMContentLoaded", (event) => {    
    obtenerValores();
});

async function obtenerValores() { //dataNeeded es el array que debemos pasar como parámetro
    let valores = [];
    let localStItems =  JSON.parse(localStorage.getItem('local_Cart'));
    console.log(`Soy el local storage ${localStItems}`)
    const rate = await exchange();
    localStItems.forEach(localItem => {
        const costoEnUSD = Math.round((localItem.currency === "USD") ?  localItem.unitCost : localItem.unitCost / rate);
        valores.push({
            itemId : localItem.id,
            itemCount : localItem.count,
            itemPrice: costoEnUSD
        })
    });
    console.log(valores);
    calculoSubtotal(valores);
}

function inputEvents(expectedId){
    const countInput = document.getElementById(`countValue${expectedId}`);
    let localStorageInputs = JSON.parse(localStorage.getItem('local_Cart'));
    /*const subtotalElement = document.getElementById(`subtotal${element.id}`);
    let count = parseInt(countInput.value);
    let subtotal = count * costoEnUSD;*/
    let objetoActualizado = localStorageInputs.find(obj => obj.id === expectedId);
    if (objetoActualizado) {
        objetoActualizado.count = countInput.value;
    }
    localStorage.setItem('local_Cart', JSON.stringify(localStorageInputs));
    obtenerValores();
}

mostrarCarrito(CART);

creditcard.addEventListener("change", function () {
    if (creditcard.checked) {
        accountNumberField.disabled = true;
        accountNumberField.style.backgroundColor = "#ccc";
        cardnumber.disabled = false;
        cardnumber.style.backgroundColor = "";
        securitycode.disabled = false;
        securitycode.style.backgroundColor = "";
        expirationdate.disabled = false;
        expirationdate.style.backgroundColor = "";
        paymentStatusParagraph.textContent = "Tarjeta de crédito.";
        paymentStatusParagraph.classList.add('text-muted')
    }
});

banktransfer.addEventListener("change", function () {
    if (banktransfer.checked) {
        accountNumberField.disabled = false;
        accountNumberField.style.backgroundColor = "";
        cardnumber.disabled = true;
        cardnumber.style.backgroundColor = "#ccc";
        securitycode.disabled = true;
        securitycode.style.backgroundColor = "#ccc";
        expirationdate.disabled = true;
        expirationdate.style.backgroundColor = "#ccc";
        paymentStatusParagraph.textContent = "Transferencia bancaria.";
        paymentStatusParagraph.classList.add('text-muted')
    }
});

buyButton.addEventListener("click", function(event){
    if (!creditcard.checked && !banktransfer.checked)
    {
        paymentStatusParagraph.textContent = "Debe seleccionar una forma de pago.";
        paymentStatusParagraph.style.color = "#ff0000";
    }
    if(calle.value !== "" && numero.value !== "" && esquina.value !== "" && formaPago)
    {
        event.preventDefault();
        return Swal.fire({
            icon: "success",
            title: "¡Has realizado tu compra con éxito!",
            });
    }
    buyForm.classList.add("was-validated")
    event.preventDefault(); 
})

continuarButton.addEventListener("click", function(event){
    if (creditcard.checked && cardnumber.value !== "" && securitycode.value !== "" && expirationdate.value !== "")
    {
        paymentStatusParagraph.classList.remove('text-muted')
        paymentStatusParagraph.style.color = "#008000";
        formaPago = true;
    } 
    else if (banktransfer.checked && accountNumberField.value !== "")
    {
            paymentStatusParagraph.classList.remove('text-muted')
            paymentStatusParagraph.style.color = "#008000";
            formaPago = true;
    }
    else
    {
        formaPago = false; 
    }
    buyModal.classList.add("was-validated");
    event.preventDefault();
})

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation')
    
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
        
      })
  })()