document.addEventListener("DOMContentLoaded", function() {
    console.log(localStorage.getItem("users"));
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    const saveButton = document.getElementById("saveButton");

    // Cargar datos del almacenamiento local si están disponibles
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
    const storedEmail = localStorage.getItem("email");

    if (storedFirstName) {
        firstNameInput.value = storedFirstName;
    }
    if (storedLastName) {
        lastNameInput.value = storedLastName;
    }
    if (storedEmail) {
        emailInput.value = storedEmail;
    }

    saveButton.addEventListener("click", function() {
        const newFirstName = firstNameInput.value;
        const newLastName = lastNameInput.value;
        const newEmail = emailInput.value;

        // Guardar los nuevos valores en el almacenamiento local
        localStorage.setItem("firstName", newFirstName);
        localStorage.setItem("lastName", newLastName);
        localStorage.setItem("email", newEmail);

        Swal.fire({
            icon: 'success',
            title: '¡Datos guardados!',
            text: 'Los datos se han guardado correctamente.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        });
    });
});
