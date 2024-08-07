function search() {
  var searchbar = document.getElementById("serachbar");
  var searchString = searchbar.value.trim().toLowerCase();
  window.location.href = `search.html?q=${encodeURIComponent(searchString)}`;
}
function logoutUser() {

  if (sessionStorage.getItem('username')) {
      sessionStorage.removeItem('username');
  } 
  

  window.location.href = './login.html';
}

function authUser() {
  if (!sessionStorage.getItem('username')) {
    window.location.href = './login.html';
  }
}



//related to saja and ali's part 
document.addEventListener('DOMContentLoaded', () => {
  authUser();
  // Search bar input field
  const searchbar = document.getElementById("serachbar");

  // Add event listener for the Enter key
  searchbar.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') { // Check if the Enter key is pressed
          event.preventDefault(); // Prevent the default action (form submission)
          search(); // Call the search function
      }
  });
  
});
