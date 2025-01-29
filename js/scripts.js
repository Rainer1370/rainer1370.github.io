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

            // Call callback function if provided (e.g., initialize scripts)
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

    // Load UTC Tool
    const toolContainer = document.getElementById("toolContainer");
    if (toolContainer) {
        const utcToolName = toolContainer.dataset.tool;
        if (utcToolName) {
            loadComponent("toolContainer", `${toolsBasePath}${utcToolName}.html`, () => {
                console.log("UTC tool loaded. Now loading UTC.js...");

                // Dynamically load UTC.js
                const utcScript = document.createElement("script");
                utcScript.src = "/js/UTC.js";
                utcScript.defer = true;
                utcScript.onload = () => {
                    console.log("UTC.js loaded dynamically.");
                    if (typeof updateTime === "function") {
                        updateTime();
                        setInterval(updateTime, 1000); // Ensure 1Hz updates
                    } else {
                        console.error("updateTime() function still not defined!");
                    }
                };
                document.body.appendChild(utcScript);
            });
        }
    }

    // Load 8b10b Tool
    const tool8b10bContainer = document.getElementById("tool8b10b");
    if (tool8b10bContainer) {
        const b10bToolName = tool8b10bContainer.dataset.tool;
        if (b10bToolName) {
            loadComponent("tool8b10b", `${toolsBasePath}${b10bToolName}.html`, () => {
                console.log("8b10b tool loaded, initializing...");

                // Dynamically load 8b10b.js
                const b10bScript = document.createElement("script");
                b10bScript.src = "/js/8b10b.js";
                b10bScript.defer = true;
                b10bScript.onload = () => {
                    console.log("8b10b.js loaded dynamically.");
                };
                document.body.appendChild(b10bScript);
            });
        }
    }
});
