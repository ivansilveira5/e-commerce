const id =localStorage.getItem("productID")

const PRODUCT_URL= `https://japceibal.github.io/emercado-api/products/${id}.json`

 async function pepe() {
   await fetch(PRODUCT_URL)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
    })
    .catch("error")
 } 
 console.log(pepe()); 
    