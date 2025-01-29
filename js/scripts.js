document.addEventListener("DOMContentLoaded", async function () {
    console.log("✅ scripts.js loaded and running");

    const componentBasePath = "/components/";
    const toolsBasePath = "/pages/tools/";

    // Function to load content dynamically
    async function loadComponent(id, filePath, callback = null) {
        console.log(`🔄 Attempting to load ${id} from ${filePath}`);
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`❌ Failed to load ${id}: ${response.statusText}`);

            const content = await response.text();
            document.getElementById(id).innerHTML = content;
            console.log(`✅ ${id} loaded successfully`);

            // Call callback function if provided
            if (callback) {
                console.log(`⚡ Executing callback for ${id}`);
                callback();
            }
        } catch (error) {
            console.error(`❌ ${id} Error:`, error);
            document.getElementById(id).innerHTML = `<p>${id} could not be loaded.</p>`;
        }
    }

    // Load Header and Footer
    await Promise.all([
        loadComponent("header", componentBasePath + "header.html"),
        loadComponent("footer", componentBasePath + "footer.html"),
    ]);

    // Dynamic loading for UTC tool
    const toolContainer = document.getElementById("toolContainer");
    if (toolContainer) {
        const toolName = toolContainer.dataset.tool;
        console.log(`🔍 Detected tool: ${toolName}`);

        if (toolName) {
            loadComponent("toolContainer", `${toolsBasePath}${toolName}.html`, () => {
                console.log("✅ Tool content loaded. Checking for updateTime function...");

                function startUpdatingTime() {
                    if (typeof updateTime === "function") {
                        console.log("🚀 Calling updateTime() and starting 1Hz interval.");
                        updateTime(); // Run immediately
                        if (typeof utcInterval === "undefined") {
                            window.utcInterval = setInterval(updateTime, 1000);
                            console.log("⏳ 1Hz update interval started.");
                        }
                    } else {
                        console.error("❌ updateTime() function is not defined!");
                    }
                }

                if (typeof updateTime === "function") {
                    startUpdatingTime();
                } else {
                    console.warn("⚠️ updateTime() function not found, dynamically loading UTC.js...");
                    
                    // Dynamically load UTC.js if missing
                    const script = document.createElement("script");
                    script.src = "/js/UTC.js";
                    script.defer = true;
                    script.onload = () => {
                        console.log("✅ UTC.js script loaded dynamically.");
                        startUpdatingTime();
                    };
                    document.body.appendChild(script);
                }
            });
        } else {
            console.warn("⚠️ No UTC tool detected for dynamic loading.");
        }
    }

    // Dynamic loading for 8b10b tool
    const tool8b10bContainer = document.getElementById("tool8b10b");
    if (tool8b10bContainer) {
        const toolName = tool8b10bContainer.dataset.tool;
        console.log(`🔍 Detected tool: ${toolName}`);

        if (toolName) {
            loadComponent("tool8b10b", `${toolsBasePath}${toolName}.html`, () => {
                console.log("✅ 8b10b tool content loaded. Checking for encoding functions...");

                // Dynamically load 8b10b.js
                const script = document.createElement("script");
                script.src = "/js/8b10b.js";
                script.defer = true;
                script.onload = () => {
                    console.log("✅ 8b10b.js script loaded dynamically.");
                };
                document.body.appendChild(script);
            });
        } else {
            console.warn("⚠️ No 8b10b tool detected for dynamic loading.");
        }
    }
});
