
document.getElementById("encodeButton").addEventListener("click", () => {
    const binaryInput = document.getElementById("binaryInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!binaryInput || binaryInput.length !== 8 || !/^[01]+$/.test(binaryInput)) {
        resultDiv.innerHTML = "<p style='color: red;'>Invalid input! Please enter 8 bits (e.g., 11010101).</p>";
        return;
    }

    // Predefined encoding tables
    const fiveToSixTable = {
        "00000": "100111",
        "00001": "011101",
        "00010": "101101",
        "00011": "110001",
        "00100": "110101",
        "00101": "101001",
        "00110": "011001",
        "00111": "111000",
        "01000": "111001",
        "01001": "100101",
        "01010": "010101",
        "01011": "110100",
        "01100": "001101",
        "01101": "101100",
        "01110": "011100",
        "01111": "010111",
        "10000": "101011",
        "10001": "110011",
        "10010": "100011",
        "10011": "110010",
        "10100": "010011",
        "10101": "110001",
        "10110": "011011",
        "10111": "100110",
        "11000": "010110",
        "11001": "001011",
        "11010": "111010",
        "11011": "011010",
        "11100": "101010",
        "11101": "011110",
        "11110": "101110",
        "11111": "111011"
    };

    const threeToFourTable = {
        "000": "1011",
        "001": "1001",
        "010": "0101",
        "011": "1100",
        "100": "0011",
        "101": "1010",
        "110": "0110",
        "111": "1110"
    };

    // Split into MSB (5 bits) and LSB (3 bits)
    const msb = binaryInput.slice(0, 5);
    const lsb = binaryInput.slice(5);

    // Encode using the tables
    const msbEncoded = fiveToSixTable[msb];
    const lsbEncoded = threeToFourTable[lsb];

    if (!msbEncoded || !lsbEncoded) {
        resultDiv.innerHTML = "<p style='color: red;'>Encoding failed due to invalid input.</p>";
        return;
    }

    const tenBitOutput = msbEncoded + lsbEncoded;

    // Display the results
    resultDiv.innerHTML = `
        <p><strong>Binary Input:</strong> ${binaryInput}</p>
        <p><strong>Most Significant Bits (MSB):</strong> ${msb} → ${msbEncoded}</p>
        <p><strong>Least Significant Bits (LSB):</strong> ${lsb} → ${lsbEncoded}</p>
        <p><strong>10-bit Output:</strong> ${tenBitOutput}</p>
    `;
});
