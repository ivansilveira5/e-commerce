document.addEventListener("DOMaContentLoaded", function() {
    const registrationForm = document.getElementById("registrationForm");
    
    registrationForm.addEventListener("submit", function(event) {
      event.preventDefault();
        const firstName = document.getElementById("nombre").value;
        const lastName = document.getElementById("apellido").value;
        const email = document.getElementById("correo").value;
        const password = document.getElementById("contraseña").value;
        const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
      const users = JSON.parse(localStorage.getItem("users")) || []
      console.log(users)
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      Swal.fire({
        icon: 'success',
        title: '¡Datos Registrados con Exito!',
        text: 'Aguarde Mientras Re-direccionamos.',
        timer: 3000,
        confirmButtonText: 'Aceptar'
        }).then(()=>{location.href='login.html'})
    });
  });
  