const users = JSON.parse(localStorage.getItem('users'));
const dropdownuser = document.getElementById('dropdownMenuButton1');

const firstName = users.firstName;
dropdownuser.innerHTML = `Hola ${firstName}!`;