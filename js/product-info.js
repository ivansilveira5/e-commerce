const id = localStorage.getItem("productID");
const PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${id}.json`;

function showProducts(data) {
  const productContainer = document.getElementById("product-info");

  const productHTML = `
    <div class="stylegeneral">
    <div class="stylecontainer">
      <div class="images-container">
        <img src="${data.images[0]}" alt="Product Image">
        
      </div>
      <div class="styleinformation">
        <h1>${data.name}</h1>
        <p><strong>Publicado por:</strong></p>
        <p class="sub-title"><strong>${data.cost} ${data.currency}</strong></p>
        <p class="sub-title2"><strong>Sold Count:</strong> ${data.soldCount}</p>
      </div>    
    </div>
      <div class="buttons" style="padding-left: 1%;padding-top: 1%;">
        <button id="prev-button">Previous</button>
        <button id="next-button">Next</button>
      </div>
      <h1>Descripción</h1>
      <p>${data.description}</p>
      <h1>Related Products</h1>
      <div class="related-product">
        ${data.relatedProducts
          .map(
            (relatedProduct) =>
              `
              <div >
                 <h4>${relatedProduct.name}</h4>
                 <a href="product-info.html?id=${relatedProduct.id}" data-product-id="${relatedProduct.id}">
        <img src="${relatedProduct.image}" alt="Related Product Image">
      </a>
               </div>
               `
          )
          .join("")}
    </div>
    </div>
  `;

  productContainer.innerHTML = productHTML;

  const imagesContainer = document.querySelector(".images-container");
  let currentImageIndex = 0;

  const relatedProductLinks = document.querySelectorAll('.related-product a');
  relatedProductLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const relatedProductId = link.getAttribute('data-product-id');
      const RELATED_PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${relatedProductId}.json`;

      fetch(RELATED_PRODUCT_URL)
        .then((response) => response.json())
        .then((relatedData) => {
          showProducts(relatedData);
        })
        .catch((error) => {
          console.error("Error en el fetch: ", error);
        });
    });
  });

  function showImage(index) {
    imagesContainer.innerHTML = `<img src="${data.images[index]}" alt="Product Image">`;
  }

  showImage(currentImageIndex);

  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  prevButton.addEventListener("click", () => {
    currentImageIndex =
      (currentImageIndex - 1 + data.images.length) % data.images.length;
    showImage(currentImageIndex);
  });

  nextButton.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % data.images.length;
    showImage(currentImageIndex);
  });
}

fetch(PRODUCT_URL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.relatedProducts[0]);
    showProducts(data);
  })
  .catch((error) => {
    console.error("Error en el fetch: ", error);
  });
