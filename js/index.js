console.log(localStorage.getItem("loggedin"));
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });
  const navbarWelcome = document.getElementById("navbarWelcome");
  const isLoggedIn = localStorage.getItem("loggedin");
  const email = localStorage.getItem("email");
  const loginLink = document.getElementById("loginLink");
  const logoutLink = document.getElementById("logoutLink");

  if (isLoggedIn === "true" && email) {
      
      navbarWelcome.innerHTML = `<a href="my-profile.html" class="nav-link">Bienvenido, ${email}</a>`;
      loginLink.style.display = "none";
      logoutLink.style.display = "inline";
  } else {
    navbarWelcome.innerHTML = "";
      loginLink.style.display = "center";
      logoutLink.style.display = "none";
  }

  logoutLink.addEventListener("click", function() {
      localStorage.setItem("loggedin", "false");
      window.location.href = "login.html";
  });
});
