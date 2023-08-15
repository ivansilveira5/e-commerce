let submitButton = document.getElementById("buttonsubmit")
//Función de Verificación de usuario
function ConfrimLogin() {
   localStorage.setItem('loggedin', 'true'); location.href='index.html'
   console.log(localStorage)
}
//Funciones de Error
function MailError() {
   alert("Hay un error en tu mail");
}
function PasswordError() {
   alert("Hay un error en tu contraseña");
}
//Función de Validación
function comprobarPwd () {
   const mail = document.getElementById("email").value
   const password = document.getElementById("password").value
   const estructura = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   
   console.log(estructura.test(mail))
   if(!estructura.test(mail)){
      return MailError()
   }
   else if (password.length < 6 ) {               
       return PasswordError()
   }
   else {        
       return ConfrimLogin()
   }
}
submitButton.addEventListener("click", comprobarPwd)