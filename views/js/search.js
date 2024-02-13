<script>
let search = document.querySelector('#search');
let searchBar =  document.getElementById('search-bar');
search.addEventListener('click', function() {
    if(searchBar.style.display === "none") {
        searchBar.style.display = "block"
    } else {
        searchBar.style.display = "none"
    }
});
</script>