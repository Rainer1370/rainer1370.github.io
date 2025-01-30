document.addEventListener("DOMContentLoaded", async function () {
    console.log("✅ scripts.js loaded and running");

    const componentBasePath = "/components/";
    const toolsBasePath = "/pages/tools/";

    async function loadComponent(id, filePath, callback = null) {
        console.log(`🔄 Attempting to load ${id} from ${filePath}`);
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`❌ Failed to load ${id}: ${response.statusText}`);

            const content = await response.text();
            document.getElementById(id).innerHTML = content;
            console.log(`✅ ${id} loaded successfully`);

            if (callback) {
                console.log(`⚡ Executing callback for ${id}`);
                callback();
            }
        } catch (error) {
            console.error(`❌ ${id} Error:`, error);
            document.getElementById(id).innerHTML = `<p>${id} could not be loaded.</p>`;
        }
    }

    await Promise.all([
        loadComponent("header", componentBasePath + "header.html"),
        loadComponent("footer", componentBasePath + "footer.html"),
    ]);

    // Function to load scripts only once
    function loadScriptOnce(scriptPath) {
        if (!document.querySelector(`script[src="${scriptPath}"]`)) {
            const script = document.createElement("script");
            script.src = scriptPath;
            script.defer = true;
            document.body.appendChild(script);
            console.log(`📥 ${scriptPath} loaded dynamically.`);
        } else {
            console.log(`⚡ ${scriptPath} already loaded, skipping.`);
        }
    }

    // Dynamically load tools
    const tools = {
        "toolContainer": "utc",
        "tool8b10b": "8b10b",
        "toolPLC": "plc"
    };

    Object.keys(tools).forEach(id => {
        const toolContainer = document.getElementById(id);
        if (toolContainer) {
            loadComponent(id, `${toolsBasePath}${tools[id]}.html`, () => {
                console.log(`✅ ${tools[id]} tool content loaded.`);
                
                // Load respective scripts if needed
                if (tools[id] === "plc") {
                    loadScriptOnce("/js/plc.js");
                }
            });
        }
    });
});
