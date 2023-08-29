function verification(){
    if (!localStorage.getItem('loggedin') || localStorage.getItem('loggedin') === 'false'){
        alert("Ingresa para ver el contenido")
        location.href='login.html'
    }

}
verification()