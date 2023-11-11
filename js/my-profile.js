
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

  // Nombre
  let profileFirstName = document.getElementById("profileFirstName");
    // Segundo nombre
  let profileSecondName = document.getElementById("profileSecondName");
  // Primer Apellido
  let profileFirstLastname = document.getElementById("profileFirstLastname");
  // Segundo apellido
  let profileSecondLastname = document.getElementById("profileSecondLastname");
  // Telefono
  let profileNumber = document.getElementById("profileNumber");
  // E-Mail
  let profileMail = document.getElementById("profileMail");
  // Imagen de perfil
  let defaultProfile = "img/img_perfil.png";
  //array de users
  let usuarios = JSON.parse(localStorage.getItem("users"));
 // asegurate que haya un usuario y elije el primero
  let usuario = usuarios && usuarios.length > 0 ? usuarios[0] : {};

  let password = usuario.password;
  
  // para que aparezcan los datos guardados en LS
  profileMail.value = usuario.email;
  if (usuario.firstName) { profileFirstName.value = usuario.firstName; }
  if (usuario.secondName) { profileSecondName.value = usuario.secondName; }
  if (usuario.lastName) { profileFirstLastname.value = usuario.lastName; }
  if (usuario.secondLastName) { profileSecondLastname.value = usuario.secondLastName; }
  if (usuario.phoneNumber) { profileNumber.value = usuario.phoneNumber; }
    
    // imagen de perfil

document.getElementById("profileImage").addEventListener("change", function () {        //  Detecto uando el elemento con el ID "profileImage" cambia 
  console.log(this.files);                                                            //  Imprime en la consola la información sobre los archivos seleccionados.
  const reader = new FileReader();                                                       //  Crea una nueva instancia de FileReader.


  reader.addEventListener("load", () => {                                            //  Cuando la lectura del archivo se completa, ejecuta la siguiente función.
    localStorage.setItem("profilephoto", reader.result)                             // Guarda la representación en formato de URL base64 del archivo en el almacenamiento local.
  });

  reader.readAsDataURL(this.files[0]);                                                     // Lee el contenido del primer archivo seleccionado como una URL base64.

});

document.addEventListener("DOMContentLoaded", () => {
  const profilePicture = localStorage.getItem("profilephoto");                           // Recupera la URL base64 de la imagen del almacenamiento local.
  if (profilePicture) {                                                                 // Checkea si hay una imagen almacenada,
    document.getElementById("imgcanvas").setAttribute("src", profilePicture)             // Establece la fuente de la imagen en el elemento con el ID "imgcanvas" con la URL base64 recuperada.
  }
})


  // Función para cambiar datos de usuario
  saveProfileButton.addEventListener("click", ()=>{
    // Verificamos que los campos obligatorios esten llenos
    if (profileFirstName.value == "" || profileFirstLastname.value == "" || profileNumber.value == "") {
      Swal.fire({
        icon: "error",
        title: "Debe rellenar los campos obligatorios",
        confirmButtonText: "Aceptar"
        });
    }
    else {
    // declaramos lista con objeto con datos del usuario nuevo
    let datosNuevos = [{
        firstName: profileFirstName.value,
        secondName: profileSecondName.value,
        lastName: profileFirstLastname.value,
        secondLastName: profileSecondLastname.value,
        phoneNumber: profileNumber.value,
        email: profileMail.value,
        password: password
    }]

    
      // cambiamos los datos en localStorage
      localStorage.setItem("users",JSON.stringify(datosNuevos))
    }}
  )


