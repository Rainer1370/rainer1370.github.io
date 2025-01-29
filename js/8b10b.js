// Global variable for running disparity
let runningDisparity = 0;

// Ensure the script runs only after DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ 8b10b.js initialized");

    // Add event listeners for input fields
    document.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", (e) => handleInput(e.target.id, e.target.value));
        input.addEventListener("blur", (e) => handleInput(e.target.id, e.target.value));
        input.addEventListener("change", (e) => handleInput(e.target.id, e.target.value));

        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                console.log(`⏩ Enter pressed in ${e.target.id}, processing input...`);
                handleInput(e.target.id, e.target.value);
                e.preventDefault(); // Prevents unwanted form submissions or focus loss
            }
        });
    });

    // Bind event listeners to buttons
    document.getElementById("encodeButton").addEventListener("click", encodeBinary);
    document.getElementById("clearDisparityButton").addEventListener("click", clearDisparity);
});

// Function to handle input based on ID
function handleInput(id, value) {
    if (!id || value.trim() === "") return;
    console.log(`📤 Processing input for ${id}: ${value}`);
    switch (id) {
        case "base10Input":
            convertFromBase10();
            break;
        case "hexInput":
            convertFromHex();
            break;
        case "octalInput":
            convertFromOctal();
            break;
        case "asciiInput":
            convertFromAscii();
            break;
        case "binaryInput":
            convertFromBinary();
            break;
        default:
            console.warn(`⚠️ Unrecognized input field: ${id}`);
    }
}

// Conversion functions remain unchanged...
