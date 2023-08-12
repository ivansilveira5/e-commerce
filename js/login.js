
let submitButton = document.getElementById("buttonsubmit")
submitButton.addEventListener("click", 
 () => {
    console.log("aaa")
    localStorage.setItem('loggedin', 'true'); location.href='index.html'
   console.log(localStorage)
});

