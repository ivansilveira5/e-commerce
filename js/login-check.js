function Verificacion(){
    if (localStorage.getItem('loggedin') === null){
        alert("Logeate para poder ver este sector")
            window.location = 'login.html';
         
    }
}
Verificacion()