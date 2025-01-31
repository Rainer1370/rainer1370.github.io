// Function to update UTC, local time, and Unix timestamp
function updateTime() {
    try {
        console.log("✅ updateTime() called.");
        const now = new Date();

        // Ensure elements exist before updating them
        const utcElem = document.getElementById("utcTime");
        const localElem = document.getElementById("localTime");
        const timezoneElem = document.getElementById("timezone");
        const unixElem = document.getElementById("unixTimestamp");

        if (utcElem && localElem && timezoneElem && unixElem) {
            console.log("✅ Elements found. Updating time...");
            utcElem.textContent = now.toISOString().split("T").join(" ").split(".")[0];
            localElem.textContent = now.toLocaleString();
            timezoneElem.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
            unixElem.textContent = Math.floor(now.getTime() / 1000);
        } else {
            console.warn("⚠️ UTC elements not found. Retrying in 500ms...");
            setTimeout(updateTime, 500); // Retry after 500ms
        }
    } catch (error) {
        console.error("❌ Error updating time:", error);
    }
}

// Debugging: Confirm script is loaded
console.log("✅ UTC.js loaded.");

// Ensure updateTime() runs after dynamic content loads
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOMContentLoaded event fired in UTC.js");
    updateTime();

    // Ensure the interval starts only once
    if (!window.utcInterval) {
        window.utcInterval = setInterval(updateTime, 1000);
        console.log("⏳ 1Hz update interval started.");
    }
});

// Ensure updateTime() re-runs after tools.html loads
window.addEventListener("load", () => {
    console.log("✅ Window loaded, ensuring UTC updates in embedded tools.html");
    updateTime();
});
