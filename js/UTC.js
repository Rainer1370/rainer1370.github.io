// Function to update UTC, local time, and Unix timestamp
function updateTime() {
    try {
        console.log("updateTime() called");

        // Ensure elements exist before trying to update them
        const utcElem = document.getElementById("utcTime");
        const localElem = document.getElementById("localTime");
        const timezoneElem = document.getElementById("timezone");
        const unixElem = document.getElementById("unixTimestamp");

        if (utcElem && localElem && timezoneElem && unixElem) {
            utcElem.textContent = new Date().toISOString().split("T").join(" ").split(".")[0];
            localElem.textContent = new Date().toLocaleString();
            timezoneElem.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
            unixElem.textContent = Math.floor(new Date().getTime() / 1000);
            console.log("updateTime() executed successfully");
        } else {
            console.warn("updateTime() elements not found, retrying...");
            setTimeout(updateTime, 500); // Retry after 500ms
        }
    } catch (error) {
        console.error("Error updating time:", error);
    }
}

// Initialize when the tool content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded event in UTC.js");
    updateTime();
});
