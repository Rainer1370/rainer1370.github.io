document.addEventListener("DOMContentLoaded", async function () {
    // Base URL for components
    const basePath = "/components/";

    // Function to load content dynamically
    async function loadComponent(id, fileName) {
        try {
            const response = await fetch(basePath + fileName);
            if (!response.ok) throw new Error(`Failed to load ${id}: ${response.statusText}`);
            document.getElementById(id).innerHTML = await response.text();
        } catch (error) {
            console.error(`${id} Error:`, error);
            document.getElementById(id).innerHTML = `<p>${id} could not be loaded.</p>`;
        }
    }

    // Load Header and Footer using absolute paths
    await Promise.all([
        loadComponent("header", "header.html"),
        loadComponent("footer", "footer.html"),
    ]);
});
