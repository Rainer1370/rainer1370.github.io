document.addEventListener("DOMContentLoaded", function () {
    // Include Header
    fetch("/RainerPortfolio/components/header.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load header: " + response.statusText);
            }
            return response.text();
        })
        .then((data) => {
            document.getElementById("header").innerHTML = data;
        })
        .catch((error) => console.error("Header Error:", error));

    // Include Footer
    fetch("/RainerPortfolio/components/footer.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load footer: " + response.statusText);
            }
            return response.text();
        })
        .then((data) => {
            document.getElementById("footer").innerHTML = data;
        })
        .catch((error) => console.error("Footer Error:", error));
});
