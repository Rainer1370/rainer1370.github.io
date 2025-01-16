document.addEventListener("DOMContentLoaded", function () {
    // Include Header
    fetch('../components/header.html')
        .then((response) => response.text())
        .then((data) => {
            document.getElementById('header').innerHTML = data;
        });

    // Include Footer
    fetch('../components/footer.html')
        .then((response) => response.text())
        .then((data) => {
            document.getElementById('footer').innerHTML = data;
        });
});
