let submitButton = document.getElementById("buttonsubmit")
//Función de Verificación de usuario
function ConfirmLogin() {
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;
   // Obtener la lista de usuarios desde el localStorage
   const users = JSON.parse(localStorage.getItem("users")) || [];
   // Buscar el usuario en la lista por su email
   const user = users.find(user => user.email === email);
   if (user && user.password === password) {
      localStorage.setItem('loggedin', 'true'); 
/* DATA PARA UTILIZAR EN EL NAVBAR PARA MOSTRAR EL CORREO */
      localStorage.setItem('email', email);

      Swal.fire({
         icon: 'success',
         title: '¡Datos Correctos!',
         text: 'Aguarde Mientras Re-direccionamos.',
         timer: 3000,
         confirmButtonText: 'Aceptar'
      }).then(() => {
         location.href = 'index.html';
      });
   } else {
      Swal.fire({
         icon: 'error',
         title: '¡Credenciales Incorrectas!',
         text: 'Por favor, verifique su email y contraseña.',
         confirmButtonText: 'Aceptar'
      });
   }

}



//Función de Validación
function comprobarPwd () {
   const mail = document.getElementById("email").value
   const password = document.getElementById("password").value
   const estructura = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   if(!estructura.test(mail)){
      return Swal.fire({
         icon: 'error',
         title: '¡Datos de Email Incorrectos!',
         confirmButtonText: 'Aceptar'
      });
   }
   else if (password.length < 6 ) {               
       return Swal.fire({
         icon: 'error',
         title: '¡Datos de Contraseñas Incorrectos!',
         confirmButtonText: 'Aceptar'
      });
   }
   else {        
       return ConfirmLogin()
   }
}
submitButton.addEventListener("click", comprobarPwd)