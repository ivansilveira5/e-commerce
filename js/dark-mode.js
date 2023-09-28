// elementos a los que se le aplica modo oscuro
// index.html
const mainContainer = document.getElementById('main-container');
const footer = document.getElementById('footer');
const mainImgDiv = document.getElementById('div-main-img');
const lightModeIconsDiv = document.getElementById('lightMode-icons-div');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');
let darkMode = '';
let darkModeStatus = JSON.parse(localStorage.getItem('darkMode-value'));

// categories.html
let categoriesCards = document.getElementsByClassName('categoriesCards');


// array con todos los objetos afectados
let objectsToToggle = [mainContainer, footer]

//cambio a modo oscuro
moonIcon.addEventListener('click', () => {
    objectsToToggle.forEach(element => {
        element.classList.toggle('bg-dark');
    });

    if(mainImgDiv){
        mainImgDiv.classList.add('bg-dark');
        mainImgDiv.classList.remove('bg-light');
        mainImgDiv.style.backgroundImage = `url("/img/cover_back_night.png")`;
    }

    if(categoriesCards){
        Array.from(categoriesCards).forEach(card => {
            card.classList.add('bg-dark');
        })
    }

    moonIcon.classList.toggle('hidden');
    sunIcon.classList.toggle('hidden');

    darkMode = true;
    localStorage.setItem('darkMode-value', JSON.parse(darkMode));   
})

//cambio a modo claro
sunIcon.addEventListener('click', () => {
    objectsToToggle.forEach(element => {
        element.classList.toggle('bg-dark');
    });

    if(mainImgDiv){
        mainImgDiv.style.backgroundImage = `url("/img/cover_back.png")`;
        mainImgDiv.classList.toggle('bg-dark');
    }

    if(categoriesCards){
        Array.from(categoriesCards).forEach(card => {
            card.classList.remove('bg-dark')
        })
    }

    moonIcon.classList.toggle('hidden');
    sunIcon.classList.toggle('hidden');
    darkMode = false;
    localStorage.setItem('darkMode-value', JSON.parse(darkMode));
})

//chequeo de la variable en el local storage

if (darkModeStatus === true){
        objectsToToggle.forEach(element => {
            element.classList.remove('bg-light');
            element.classList.add('bg-dark');
        });

        
        if(mainImgDiv){
        mainImgDiv.style.backgroundImage = `url("/img/cover_back_night.png")`;
        mainImgDiv.classList.remove('bg-light');
        mainImgDiv.classList.add('bg-dark');
        }
    
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    }  else {
        objectsToToggle.forEach(element => {
            element.classList.remove('bg-dark');
            element.classList.add('bg-light');
        });

        if(mainImgDiv){
            mainImgDiv.style.backgroundImage = `url("/img/cover_back.png")`;
            mainImgDiv.classList.remove('bg-dark');
            mainImgDiv.classList.add('bg-light');
        }

        if(categoriesCards){
            Array.from(categoriesCards).forEach(card => {
                card.classList.remove('bg-dark')
            })
        }

        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
}
