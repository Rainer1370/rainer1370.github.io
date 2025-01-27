import sys
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QLabel, QLineEdit, QPushButton, QTextEdit
from PyQt5.QtCore import Qt

# Predefined 5b6b and 3b4b encoding tables
five_to_six_table = {
    '00000': ('100111', '011000'), '00001': ('011101', '100010'),
    '00010': ('101101', '010010'), '00011': ('110001', '001110'),
    '00100': ('110101', '001010'), '00101': ('101001', '010110'),
    '00110': ('011001', '100110'), '00111': ('111000', '000111'),
    '01000': ('111001', '000110'), '01001': ('100101', '011010'),
    '01010': ('010101', '101010'), '01011': ('110100', '001011'),
    '01100': ('001101', '110010'), '01101': ('101100', '010011'),
    '01110': ('011100', '100011'), '01111': ('010111', '101000'),
    '10000': ('101011', '010100'), '10001': ('110011', '001100'),
    '10010': ('100011', '011100'), '10011': ('110010', '001101'),
    '10100': ('010011', '101100'), '10101': ('110001', '011110'),
    '10110': ('011011', '100100'), '10111': ('100110', '011001'),
    '11000': ('010110', '101001'), '11001': ('001011', '110100'),
    '11010': ('111010', '000101'), '11011': ('011010', '100101'),
    '11100': ('101010', '010101'), '11101': ('011110', '100001'),
    '11110': ('101110', '010001'), '11111': ('111011', '000100'),
}

three_to_four_table = {
    '000': ('1011', '0100'), '001': ('1001', '0110'),
    '010': ('0101', '1010'), '011': ('1100', '0011'),
    '100': ('0011', '1100'), '101': ('1010', '0101'),
    '110': ('0110', '1001'), '111': ('1110', '0001'),
}

class EncoderApp(QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()
        self.running_disparity = 0  # Tracks the running disparity

    def initUI(self):
        self.setWindowTitle("8b10b Encoder (Binary, Hex, and Base 10)")
        self.layout = QVBoxLayout()

        # Input fields for Binary, Hex, and Base 10
        self.binary_label = QLabel("Enter Binary (8 bits):")
        self.layout.addWidget(self.binary_label)
        self.binary_input = QLineEdit()
        self.layout.addWidget(self.binary_input)
        self.binary_input.returnPressed.connect(self.convert_and_encode)

        self.hex_label = QLabel("Enter Hexadecimal:")
        self.layout.addWidget(self.hex_label)
        self.hex_input = QLineEdit()
        self.layout.addWidget(self.hex_input)
        self.hex_input.returnPressed.connect(self.convert_and_encode)

        self.base10_label = QLabel("Enter Base 10:")
        self.layout.addWidget(self.base10_label)
        self.base10_input = QLineEdit()
        self.layout.addWidget(self.base10_input)
        self.base10_input.returnPressed.connect(self.convert_and_encode)

        # Encode button
        self.encode_button = QPushButton("Encode")
        self.encode_button.clicked.connect(self.convert_and_encode)
        self.layout.addWidget(self.encode_button)

        # Clear button
        self.clear_button = QPushButton("Clear")
        self.clear_button.clicked.connect(self.clear_fields)
        self.layout.addWidget(self.clear_button)

        # Result display
        self.result_field = QTextEdit()
        self.result_field.setReadOnly(True)
        self.layout.addWidget(self.result_field)

        self.setLayout(self.layout)

    def convert_and_encode(self):
        # Get inputs
        binary_input = self.binary_input.text().strip()
        hex_input = self.hex_input.text().strip()
        base10_input = self.base10_input.text().strip()

        # Determine which field is filled and convert
        try:
            if binary_input:
                binary = binary_input
                if len(binary) != 8 or not all(bit in '01' for bit in binary):
                    raise ValueError("Invalid binary input. Must be 8 bits.")
                decimal = int(binary, 2)
                hex_value = hex(decimal)[2:].upper()

            elif hex_input:
                decimal = int(hex_input, 16)
                if decimal > 255:
                    raise ValueError("Invalid hexadecimal input. Must fit in 8 bits.")
                binary = f"{decimal:08b}"
                hex_value = hex_input.upper()

            elif base10_input:
                decimal = int(base10_input)
                if decimal > 255:
                    raise ValueError("Invalid base 10 input. Must fit in 8 bits.")
                binary = f"{decimal:08b}"
                hex_value = hex(decimal)[2:].upper()

            else:
                raise ValueError("No input provided.")

            # Update all fields
            self.binary_input.setText(binary)
            self.hex_input.setText(hex_value)
            self.base10_input.setText(str(decimal))

            # Perform 8b10b encoding
            self.encode(binary)

        except ValueError as e:
            self.result_field.setText(str(e))

    def encode(self, binary_input):
        # Split into MSB (5 bits) and LSB (3 bits)
        five_bits = binary_input[:5]  # MSB
        three_bits = binary_input[5:]  # LSB

        # Encode using tables
        six_bit_encoded = five_to_six_table.get(five_bits)
        four_bit_encoded = three_to_four_table.get(three_bits)

        if not six_bit_encoded or not four_bit_encoded:
            self.result_field.setText("Encoding failed due to invalid input.")
            return

        # Choose encoding based on running disparity
        if self.running_disparity >= 0:
            six_bits = six_bit_encoded[1]  # Use negative disparity version
            four_bits = four_bit_encoded[1]
        else:
            six_bits = six_bit_encoded[0]  # Use positive disparity version
            four_bits = four_bit_encoded[0]

        # Combine to form 10-bit output
        ten_bit_encoded = six_bits + four_bits

        # Update running disparity
        self.running_disparity += ten_bit_encoded.count('1') - ten_bit_encoded.count('0')

        # Display results
        self.result_field.setText(
            f"Input (Binary): {binary_input}\n"
            f"Most Significant Bits (MSB, 5-bit): {five_bits} → 6-bit encoded: {six_bits}\n"
            f"Least Significant Bits (LSB, 3-bit): {three_bits} → 4-bit encoded: {four_bits}\n"
            f"10-bit output (Concatenated MSB+LSB): {ten_bit_encoded}\n"
            f"Running Disparity: {'+' if self.running_disparity >= 0 else ''}{self.running_disparity}"
        )

    def clear_fields(self):
        self.binary_input.clear()
        self.hex_input.clear()
        self.base10_input.clear()
        self.result_field.clear()
        self.running_disparity = 0

if __name__ == "__main__":
    app = QApplication(sys.argv)
    ex = EncoderApp()
    ex.show()
    sys.exit(app.exec_())
