const users = JSON.parse(localStorage.getItem('users'));
const navbar = document.getElementById('navBar');

const firstName = users[0].firstName;
const li = document.createElement('li');
li.innerHTML = `Hola ${firstName}!`;
li.classList.add('nav-link')
navbar.appendChild(li);
