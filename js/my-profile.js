
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
  let imgcanvas = document.getElementById("imgcanvas");
  let profileImage = document.getElementById("profileImage");
  let defaultProfile = "img/img_perfil.png";
  let profileIMG ;
  // Boton guardar
  let saveProfileButton = document.getElementById("saveProfileButton");
  // Usuario
  let usuario = JSON.parse(localStorage.getItem("users"));
  // Contraseña
  let password = usuario.password;

  // para que aparezcan los datos guardados en LS
    profileMail.value = usuario.email;
    if (usuario.firstName) {profileFirstName.value = usuario.firstName}
    if (usuario.secondName) {profileSecondName.value = usuario.secondName}
    if (usuario.lastName) {profileFirstLastname.value = usuario.lastName}
    if (usuario.secondLastName) {profileSecondLastname.value = usuario.secondLastName}
    if (usuario.phoneNumber) {profileNumber.value = usuario.phoneNumber}
    
    // imagen de perfil
    document.querySelector("#profileImage").addEventListener("change", ()=> {
      console.log("che capo aca andamo")
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        profileIMG =  reader.result
      })
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
    // declaramos objeto con datos del usuario nuevo
    let datosNuevos = {
        firstName: profileFirstName.value,
        secondName: profileSecondName.value,
        lastName: profileFirstLastname.value,
        secondLastName: profileSecondLastname.value,
        phoneNumber: profileNumber.value,
        email: profileMail.value,
        password: password
    }
      // cambiamos los datos en localStorage
      localStorage.setItem("users",JSON.stringify(datosNuevos))
    }}
  )


