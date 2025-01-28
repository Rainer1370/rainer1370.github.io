// Function to update UTC, local time, and Unix timestamp
function updateTime() {
    try {
        const now = new Date();

        // UTC Time
        const utcTime = now.toISOString().split("T").join(" ").split(".")[0];
        document.getElementById("utcTime").textContent = utcTime;

        // Local Time and Timezone
        const localTime = now.toLocaleString();
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        document.getElementById("localTime").textContent = localTime;
        document.getElementById("timezone").textContent = timezone;

        // Unix Timestamp
        const unixTimestamp = Math.floor(now.getTime() / 1000);
        document.getElementById("unixTimestamp").textContent = unixTimestamp;
    } catch (error) {
        console.error("Error updating time:", error);
    }
}

// Update time every second
setInterval(updateTime, 1000);

// Initialize immediately
document.addEventListener("DOMContentLoaded", updateTime);
