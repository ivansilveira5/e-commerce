document.addEventListener("DOMContentLoaded",function(){
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
