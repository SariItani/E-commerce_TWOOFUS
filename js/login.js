document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let loginError = document.getElementById('loginError');


    loginError.hidden = true;


    let users = JSON.parse(localStorage.getItem('users')) || [];

    let user = users.find(user => (user.email === username || user.name === username) && user.password === password);

    if (user) {
        window.location.href = '../templates/index.html';
    } else {
        loginError.hidden = false;
    }
});
