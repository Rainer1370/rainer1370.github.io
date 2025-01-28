document.addEventListener("DOMContentLoaded", async function () {
    // Base URLs for components and tools
    const componentBasePath = "/components/";
    const toolsBasePath = "/pages/tools/";

    // Function to load content dynamically
    async function loadComponent(id, filePath, callback = null) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`Failed to load ${id}: ${response.statusText}`);
            document.getElementById(id).innerHTML = await response.text();

            // Call callback function if provided (e.g., initialize UTC.js)
            if (callback) callback();
        } catch (error) {
            console.error(`${id} Error:`, error);
            document.getElementById(id).innerHTML = `<p>${id} could not be loaded.</p>`;
        }
    }

    // Load Header and Footer
    await Promise.all([
        loadComponent("header", componentBasePath + "header.html"),
        loadComponent("footer", componentBasePath + "footer.html"),
    ]);

    // Dynamic loading for tools
    const toolContainer = document.getElementById("toolContainer");
    if (toolContainer) {
        const toolName = toolContainer.dataset.tool; // e.g., 'utc'
        if (toolName) {
            loadComponent("toolContainer", toolsBasePath + `${toolName}.html`, () => {
                if (toolName === "utc") updateTime(); // Reinitialize UTC.js
            });
        }
    }
});
