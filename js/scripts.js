document.addEventListener("DOMContentLoaded", function () {
    // Include Header
    fetch("../components/header.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load header: " + response.statusText);
            }
            return response.text();
        })
        .then((data) => {
            document.getElementById("header").innerHTML = data;
        })
        .catch((error) => console.error(error));

    // Include Footer
    fetch("../components/footer.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load footer: " + response.statusText);
            }
            return response.text();
        })
        .then((data) => {
            document.getElementById("footer").innerHTML = data;
        })
        .catch((error) => console.error(error));
});
