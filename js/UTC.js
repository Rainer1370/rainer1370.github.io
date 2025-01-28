// Function to update UTC, local time, and Unix timestamp
function updateTime() {
    try {
        const now = new Date();

        // Ensure elements exist before trying to update them
        const utcElem = document.getElementById("utcTime");
        const localElem = document.getElementById("localTime");
        const timezoneElem = document.getElementById("timezone");
        const unixElem = document.getElementById("unixTimestamp");

        if (utcElem && localElem && timezoneElem && unixElem) {
            utcElem.textContent = now.toISOString().split("T").join(" ").split(".")[0];
            localElem.textContent = now.toLocaleString();
            timezoneElem.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
            unixElem.textContent = Math.floor(now.getTime() / 1000);
        }
    } catch (error) {
        console.error("Error updating time:", error);
    }
}

// Update time every second
setInterval(updateTime, 1000);

// Initialize immediately if script is already present
document.addEventListener("DOMContentLoaded", updateTime);
