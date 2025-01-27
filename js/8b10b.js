// Add event listeners for inputs
document.getElementById("binaryInput").addEventListener("change", convertFromBinary);
document.getElementById("hexInput").addEventListener("change", convertFromHex);
document.getElementById("base10Input").addEventListener("change", convertFromBase10);
document.getElementById("encodeButton").addEventListener("click", encodeBinary);

// Function to convert from binary
function convertFromBinary() {
    const binaryInput = document.getElementById("binaryInput").value.trim();
    if (!binaryInput || binaryInput.length !== 8 || !/^[01]+$/.test(binaryInput)) {
        displayError("Invalid Binary input! Please enter 8 bits (e.g., 11010101).");
        return;
    }

    const decimal = parseInt(binaryInput, 2);
    const hex = decimal.toString(16).toUpperCase();

    // Update other fields
    document.getElementById("hexInput").value = hex;
    document.getElementById("base10Input").value = decimal;
}

// Function to convert from hex
function convertFromHex() {
    const hexInput = document.getElementById("hexInput").value.trim().toUpperCase();
    if (!hexInput || !/^[0-9A-F]{1,2}$/.test(hexInput)) {
        displayError("Invalid Hex input! Please enter up to 2 hex digits (e.g., A5).");
        return;
    }

    const decimal = parseInt(hexInput, 16);
    if (decimal > 255) {
        displayError("Hex input must represent a value between 0 and 255.");
        return;
    }

    const binary = decimal.toString(2).padStart(8, "0");

    // Update other fields
    document.getElementById("binaryInput").value = binary;
    document.getElementById("base10Input").value = decimal;
}

// Function to convert from base 10
function convertFromBase10() {
    const base10Input = document.getElementById("base10Input").value.trim();
    if (!base10Input || isNaN(base10Input) || parseInt(base10Input) < 0 || parseInt(base10Input) > 255) {
        displayError("Invalid Base 10 input! Please enter a number between 0 and 255.");
        return;
    }

    const decimal = parseInt(base10Input);
    const binary = decimal.toString(2).padStart(8, "0");
    const hex = decimal.toString(16).toUpperCase();

    // Update other fields
    document.getElementById("binaryInput").value = binary;
    document.getElementById("hexInput").value = hex;
}

// Function to encode binary to 8b10b
function encodeBinary() {
    const binaryInput = document.getElementById("binaryInput").value.trim();
    const resultDiv = document.getElementById("result");

    // Validate binary input
    if (!binaryInput || binaryInput.length !== 8 || !/^[01]+$/.test(binaryInput)) {
        displayError("Invalid Binary input! Please enter 8 bits (e.g., 11010101).");
        return;
    }

    // Predefined encoding tables
    const fiveToSixTable = {
        "00000": "100111", "00001": "011101", "00010": "101101",
        "00011": "110001", "00100": "110101", "00101": "101001",
        "00110": "011001", "00111": "111000", "01000": "111001",
        "01001": "100101", "01010": "010101", "01011": "110100",
        "01100": "001101", "01101": "101100", "01110": "011100",
        "01111": "010111", "10000": "101011", "10001": "110011",
        "10010": "100011", "10011": "110010", "10100": "010011",
        "10101": "110001", "10110": "011011", "10111": "100110",
        "11000": "010110", "11001": "001011", "11010": "111010",
        "11011": "011010", "11100": "101010", "11101": "011110",
        "11110": "101110", "11111": "111011"
    };

    const threeToFourTable = {
        "000": "1011", "001": "1001", "010": "0101",
        "011": "1100", "100": "0011", "101": "1010",
        "110": "0110", "111": "1110"
    };

    // Split into MSB (5 bits) and LSB (3 bits)
    const msb = binaryInput.slice(0, 5);
    const lsb = binaryInput.slice(5);

    // Encode using the tables
    const msbEncoded = fiveToSixTable[msb];
    const lsbEncoded = threeToFourTable[lsb];

    if (!msbEncoded || !lsbEncoded) {
        displayError("Encoding failed due to invalid input.");
        return;
    }

    // Combine into 10-bit output
    const tenBitOutput = msbEncoded + lsbEncoded;

    // Calculate running disparity
    const disparity = tenBitOutput.split("").reduce((acc, bit) => acc + (bit === "1" ? 1 : -1), 0);

    // Display the results
    resultDiv.innerHTML = `
        <p><strong>Binary Input:</strong> ${binaryInput}</p>
        <p><strong>Most Significant Bits (MSB):</strong> ${msb} → ${msbEncoded}</p>
        <p><strong>Least Significant Bits (LSB):</strong> ${lsb} → ${lsbEncoded}</p>
        <p><strong>10-bit Output:</strong> ${msbEncoded}+${lsbEncoded} → <u>${tenBitOutput}</u></p>
        <p><strong>Running Disparity:</strong> ${disparity >= 0 ? "+" : ""}${disparity}</p>
        <p><a href="https://en.wikipedia.org/wiki/8b/10b_encoding" target="_blank">Learn more about 8b10b encoding</a></p>
    `;
}

// Function to display error messages
function displayError(message) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<p style='color: red;'>${message}</p>`;
}
