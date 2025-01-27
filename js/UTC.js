// Function to update UTC and local time
function updateDateTime() {
    // Get current time
    const now = new Date();

    // Format UTC time
    const utcTime = now.toISOString().slice(0, 19).replace("T", " "); // YYYY-MM-DD HH:mm:ss format

    // Format local time and timezone
    const localTime = now.toLocaleString(); // Local time in user's format
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get the timezone

    // Update DOM elements
    document.getElementById("utcTime").textContent = utcTime;
    document.getElementById("localTime").textContent = localTime;
    document.getElementById("timezone").textContent = timezone;
}

// Call the function every second
setInterval(updateDateTime, 1000);

// Initialize on page load
updateDateTime();
