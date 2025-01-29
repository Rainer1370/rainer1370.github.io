// Global variable for running disparity
let runningDisparity = 0;

// Ensure the script runs only after DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ 8b10b.js initialized");

    // Add event listeners for input fields
    document.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", (e) => handleInput(e.target.id));
        input.addEventListener("blur", (e) => handleInput(e.target.id));
        input.addEventListener("change", (e) => handleInput(e.target.id));

        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                console.log(`⏩ Enter pressed in ${e.target.id}, processing input...`);
                handleInput(e.target.id);
                e.preventDefault(); // Prevents unwanted form submissions or focus loss
            }
        });
    });

    // Bind event listeners to buttons
    document.getElementById("encodeButton").addEventListener("click", encodeBinary);
    document.getElementById("clearDisparityButton").addEventListener("click", clearDisparity);
});

// Function to handle input based on ID
function handleInput(id) {
    const value = document.getElementById(id).value.trim();
    if (!id || value === "") return;

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

// Ensure encodeBinary is correctly triggered
function encodeBinary() {
    console.log("🚀 Encoding Binary...");
    
    const binaryInput = document.getElementById("binaryInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!binaryInput || !/^[01]+$/.test(binaryInput)) {
        displayError("Invalid Binary input! Must be a valid binary number.");
        return;
    }

    const decimal = parseInt(binaryInput, 2);
    if (decimal < 0 || decimal > 255) {
        displayError("Binary input is out of range for 8b10b encoding (must be 0-255).");
        return;
    }

    const paddedBinary = binaryInput.padStart(8, "0");

    // 8b10b Encoding
    const fiveToSixTable = {
        "00000": "100111", "00001": "011101", "00010": "101101", "00011": "110001",
        "00100": "110101", "00101": "101001", "00110": "011001", "00111": "111000",
        "01000": "111001", "01001": "100101", "01010": "010101", "01011": "110100",
        "01100": "001101", "01101": "101100", "01110": "011100", "01111": "010111",
        "10000": "101011", "10001": "110011", "10010": "100011", "10011": "110010",
        "10100": "010011", "10101": "110001", "10110": "011011", "10111": "100110",
        "11000": "010110", "11001": "001011", "11010": "111010", "11011": "011010",
        "11100": "101010", "11101": "011110", "11110": "101110", "11111": "111011"
    };
    const threeToFourTable = {
        "000": "1011", "001": "1001", "010": "0101", "011": "1100",
        "100": "0011", "101": "1010", "110": "0110", "111": "1110"
    };

    const msb = paddedBinary.slice(0, 5);
    const lsb = paddedBinary.slice(5);

    const msbEncoded = fiveToSixTable[msb];
    const lsbEncoded = threeToFourTable[lsb];

    if (!msbEncoded || !lsbEncoded) {
        displayError("Encoding failed due to invalid input.");
        return;
    }

    const tenBitOutput = msbEncoded + lsbEncoded;
    const disparityChange = tenBitOutput.split("").reduce((acc, bit) => acc + (bit === "1" ? 1 : -1), 0);
    runningDisparity += disparityChange;

    console.log("✅ Encoding successful!");
    resultDiv.innerHTML = `
        <p><strong>Binary Input:</strong> ${paddedBinary}</p>
        <p><strong>10-bit Output:</strong> <u>${tenBitOutput}</u></p>
        <p><strong>Running Disparity:</strong> ${runningDisparity >= 0 ? "+" : ""}${runningDisparity}</p>
    `;
}

// Function to clear running disparity
function clearDisparity() {
    runningDisparity = 0;
    console.log("🔄 Running disparity cleared.");
    document.getElementById("result").innerHTML = "<p style='color: green;'><strong>Running Disparity cleared!</strong></p>";
}

// Function to display error messages
function displayError(message) {
    console.error(`❌ ${message}`);
    document.getElementById("result").innerHTML = `<p style='color: red;'>${message}</p>`;
}

// Function to clear error messages
function clearError() {
    document.getElementById("result").innerHTML = "";
}
