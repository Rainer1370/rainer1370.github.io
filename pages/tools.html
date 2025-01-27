// Global variable for running disparity
let runningDisparity = 0;

// Add event listeners for inputs
document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            const id = e.target.id;
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
            }
        }
    });
});

document.getElementById("encodeButton").addEventListener("click", encodeBinary);
document.getElementById("clearDisparityButton").addEventListener("click", clearDisparity);

// Conversion functions
function convertFromBase10() {
    const base10Input = document.getElementById("base10Input").value.trim();
    if (!base10Input || isNaN(base10Input) || parseInt(base10Input) < 0 || parseInt(base10Input) > 255) {
        displayError("Invalid Decimal input! Must be between 0 and 255.");
        return;
    }
    const decimal = parseInt(base10Input);
    updateFields(decimal);
}

function convertFromHex() {
    const hexInput = document.getElementById("hexInput").value.trim().toUpperCase();
    if (!hexInput || !/^[0-9A-F]{1,2}$/.test(hexInput)) {
        displayError("Invalid Hexadecimal input! Must be 1 or 2 hex digits.");
        return;
    }
    const decimal = parseInt(hexInput, 16);
    updateFields(decimal);
}

function convertFromOctal() {
    const octalInput = document.getElementById("octalInput").value.trim();
    if (!octalInput || !/^[0-7]{1,3}$/.test(octalInput)) {
        displayError("Invalid Octal input! Must be 1 to 3 octal digits.");
        return;
    }
    const decimal = parseInt(octalInput, 8);
    updateFields(decimal);
}

function convertFromAscii() {
    const asciiInput = document.getElementById("asciiInput").value.trim();
    if (!asciiInput || asciiInput.length !== 1) {
        displayError("Invalid ASCII input! Must be a single character.");
        return;
    }
    const decimal = asciiInput.charCodeAt(0);
    updateFields(decimal);
}

function convertFromBinary() {
    const binaryInput = document.getElementById("binaryInput").value.trim();
    if (!binaryInput || binaryInput.length > 8 || !/^[01]+$/.test(binaryInput)) {
        displayError("Invalid Binary input! Must be up to 8 bits.");
        return;
    }
    const decimal = parseInt(binaryInput, 2);
    updateFields(decimal);
}

// Function to update all fields based on a decimal value
function updateFields(decimal) {
    const binary = decimal.toString(2).padStart(8, "0");
    const octal = decimal.toString(8);
    const hex = decimal.toString(16).toUpperCase();
    const ascii = decimal >= 32 && decimal <= 126 ? String.fromCharCode(decimal) : "N/A";

    document.getElementById("base10Input").value = decimal;
    document.getElementById("hexInput").value = hex;
    document.getElementById("octalInput").value = octal;
    document.getElementById("asciiInput").value = ascii;
    document.getElementById("binaryInput").value = binary;
    clearError();
}

// Function to encode binary to 8b10b
function encodeBinary() {
    const binaryInput = document.getElementById("binaryInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!binaryInput || binaryInput.length !== 8 || !/^[01]+$/.test(binaryInput)) {
        displayError("Invalid Binary input! Please enter 8 bits (e.g., 11010101).");
        return;
    }

    // Complete Encoding Tables
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

    const msb = binaryInput.slice(0, 5);
    const lsb = binaryInput.slice(5);

    const msbEncoded = fiveToSixTable[msb];
    const lsbEncoded = threeToFourTable[lsb];

    if (!msbEncoded || !lsbEncoded) {
        displayError("Encoding failed due to invalid input.");
        return;
    }

    const tenBitOutput = msbEncoded + lsbEncoded;
    const disparityChange = tenBitOutput.split("").reduce((acc, bit) => acc + (bit === "1" ? 1 : -1), 0);
    runningDisparity += disparityChange;

    resultDiv.innerHTML = `
        <p><strong>Binary Input:</strong> ${binaryInput}</p>
        <p><strong>10-bit Output:</strong> <u>${tenBitOutput}</u></p>
        <p><strong>Running Disparity:</strong> ${runningDisparity >= 0 ? "+" : ""}${runningDisparity}</p>
    `;
}

// Function to clear running disparity
function clearDisparity() {
    runningDisparity = 0;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<p style='color: green;'><strong>Running Disparity cleared!</strong></p>";
}

// Function to display error messages
function displayError(message) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<p style='color: red;'>${message}</p>`;
}

// Function to clear error messages
function clearError() {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
}
