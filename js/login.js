async function hashPassword(password) {
    // Encode the password as a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Hash the data using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert the hash to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
}

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let loginError = document.getElementById('loginError');
    loginError.hidden = true;

    let users = JSON.parse(localStorage.getItem('users')) || [];
   

    // Hash the entered password before comparing it
    let hashedPassword = await hashPassword(password);

    let user = users.find(user => (user.email === username || user.name === username) && user.password === hashedPassword);

    if (user) {
        sessionStorage.setItem('username', username);
        window.location.href = '../templates/index.html';
    } else {
        loginError.hidden = false;
    }
});