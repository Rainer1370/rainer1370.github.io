// Function to update UTC, local time, and Unix timestamp
function updateTime() {
    try {
        console.log("✅ updateTime() called.");
        const now = new Date();

        // Ensure elements exist before trying to update them
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
            console.warn("⚠️ UTC elements not found. Is the tool fully loaded?");
        }
    } catch (error) {
        console.error("❌ Error updating time:", error);
    }
}

// Debugging: Confirm script is loaded
console.log("✅ UTC.js loaded.");

// Try to run updateTime() immediately
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOMContentLoaded event fired in UTC.js");
    updateTime();
});

// Start periodic updates (ensure only one setInterval runs)
if (typeof utcInterval === "undefined") {
    var utcInterval = setInterval(() => {
        console.log("⏳ Running updateTime() every 1 second...");
        updateTime();
    }, 1000);
}
