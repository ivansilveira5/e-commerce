const users = JSON.parse(localStorage.getItem('users'));
const dropdownuser = document.getElementById('dropdownMenuButton1');

const firstName = users[0].firstName;
dropdownuser.innerHTML = `Hola ${firstName}!`;