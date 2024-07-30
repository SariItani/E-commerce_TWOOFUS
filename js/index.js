function search() { // place holder function for search functionality
    var searchbar = document.getElementById("serachbar");
    var search_string = searchbar.value;
    console.log(search_string);
    var temp = document.getElementById("temp");
    temp.textContent = search_string
}
