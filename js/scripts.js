document.addEventListener("DOMContentLoaded", async function () {
    console.log("scripts.js loaded and running");

    // Base URLs for components and tools
    const componentBasePath = "/components/";
    const toolsBasePath = "/pages/tools/";

    // Function to load content dynamically
    async function loadComponent(id, filePath, callback = null) {
        console.log(`Attempting to load ${id} from ${filePath}`);
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`Failed to load ${id}: ${response.statusText}`);

            const content = await response.text();
            document.getElementById(id).innerHTML = content;
            console.log(`${id} loaded successfully`);

            // Call callback function if provided
            if (callback) {
                console.log(`Executing callback for ${id}`);
                callback();
            }
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
        console.log(`Detected tool: ${toolName}`);

        if (toolName) {
            loadComponent("toolContainer", `${toolsBasePath}${toolName}.html`, () => {
                console.log("Tool content loaded. Checking for updateTime function...");

                if (typeof updateTime === "function") {
                    console.log("Calling updateTime() after toolContainer is loaded.");
                    updateTime();
                } else {
                    console.warn("updateTime() function not found, dynamically loading UTC.js...");
                    
                    // Dynamically load UTC.js if it's missing
                    const script = document.createElement("script");
                    script.src = "/js/UTC.js";
                    script.defer = true;
                    script.onload = () => {
                        console.log("UTC.js script loaded dynamically.");
                        if (typeof updateTime === "function") {
                            updateTime();
                        } else {
                            console.error("updateTime() is still undefined after loading UTC.js!");
                        }
                    };
                    document.body.appendChild(script);
                }
            });
        } else {
            console.warn("No tool detected for dynamic loading.");
        }
    }
});
