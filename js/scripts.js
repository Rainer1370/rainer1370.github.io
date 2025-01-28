document.addEventListener("DOMContentLoaded", async function () {
    console.log("DOMContentLoaded event triggered."); // Diagnostic Hook 1

    // Base URLs for components and tools
    const componentBasePath = "/components/";
    const toolsBasePath = "/pages/tools/";

    // Function to load content dynamically
    async function loadComponent(id, filePath, callback = null) {
        try {
            console.log(`Attempting to load ${filePath} into #${id}`); // Diagnostic Hook 2
            
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);

            const content = await response.text();
            console.log(`Successfully loaded content from ${filePath}`); // Diagnostic Hook 3
            document.getElementById(id).innerHTML = content;

            // Call the callback function (e.g., to initialize scripts)
            if (callback) {
                console.log(`Executing callback for ${id}`); // Diagnostic Hook 4
                callback();
            }
        } catch (error) {
            console.error(`Error loading ${filePath} into #${id}:`, error);
            document.getElementById(id).innerHTML = `<p style="color: red;">${id} could not be loaded.</p>`;
        }
    }

    // Load Header and Footer
    await Promise.all([
        loadComponent("header", `${componentBasePath}header.html`),
        loadComponent("footer", `${componentBasePath}footer.html`),
    ]);

    // Dynamic loading for tools
    const toolContainer = document.getElementById("toolContainer");
    if (toolContainer) {
        const toolName = toolContainer.dataset.tool; // e.g., 'utc'
        console.log(`Detected toolContainer with tool name: ${toolName}`); // Diagnostic Hook 5

        if (toolName) {
            loadComponent("toolContainer", `${toolsBasePath}${toolName}.html`, () => {
                if (toolName === "utc") {
                    console.log("Re-executing UTC.js after dynamic load..."); // Diagnostic Hook 6
                    updateTime();
                }
            });
        } else {
            console.warn("No tool name detected in toolContainer."); // Diagnostic Hook 7
        }
    } else {
        console.warn("toolContainer element not found on the page."); // Diagnostic Hook 8
    }
});
