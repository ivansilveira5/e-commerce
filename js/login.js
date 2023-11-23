let submitButton = document.getElementById("buttonsubmit");
//Función de Verificación de usuario
async function confirmLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  // Obtener la lista de usuarios desde el localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  console.log(users)
  // Buscar el usuario en la lista por su email
  const user = users.find((user) => user.email === email);
  
  (async function login()
  {
      if (user && user.password === password) {
    localStorage.setItem("loggedin", "true");
    /* DATA PARA UTILIZAR EN EL NAVBAR PARA MOSTRAR EL CORREO */
    localStorage.setItem("email", email);
    await fetch("http://localhost:4700/login", {
      method: "POST",
      body: JSON.stringify({username: "admin", password: "admin"}),
      headers: {
      "Content-Type": "application/json"
      },
    })
    .then((res) => res.json())
    .then(data => {console.log(data)
      localStorage.setItem("token", JSON.stringify(data.token))})
    
     .catch((error) => console.error("Error:", error))



    Swal.fire({
      icon: "success",
      title: "¡Datos Correctos!",
      text: "Aguarde Mientras Re-direccionamos.",
      timer: 3000,
      confirmButtonText: "Aceptar",
    }).then(() => {
      location.href = "index.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "¡Credenciales Incorrectas!",
      text: "Por favor, verifique su email y contraseña.",
      confirmButtonText: "Aceptar",
    });
  }
  })()

}
//Función de Validación
async function checkPassword() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!regex.test(email)) {
    return Swal.fire({
      icon: "error",
      title: "¡Datos de Email Incorrectos!",
      confirmButtonText: "Aceptar",
    });
  } else if (password.length < 6) {
    return Swal.fire({
      icon: "error",
      title: "¡Datos de Contraseñas Incorrectos!",
      confirmButtonText: "Aceptar",
    });
  } else {
    return confirmLogin();
  }
}
submitButton.addEventListener("click", checkPassword);
