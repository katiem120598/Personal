function toggleDropdown() {
    var content = document.querySelector('.dropdown-content');
    if (content.style.display === "flex") {
        content.style.display = "none";
    } else {
        content.style.display = "flex"; // This makes the dropdown part of the document flow
    }
}