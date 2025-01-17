document.addEventListener("DOMContentLoaded", async function () {
    // Function to load content dynamically
    async function loadComponent(id, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`Failed to load ${id}: ${response.statusText}`);
            document.getElementById(id).innerHTML = await response.text();
        } catch (error) {
            console.error(`${id} Error:`, error);
            document.getElementById(id).innerHTML = `<p>${id} could not be loaded.</p>`;
        }
    }

    // Load Header and Footer
    await Promise.all([
        loadComponent("header", "components/header.html"),
        loadComponent("footer", "components/footer.html"),
    ]);
});
