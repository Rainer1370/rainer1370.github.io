/* General PLC Tool Styling */
.plc-tool {
    background: rgba(0, 0, 0, 0.8); /* Dark semi-transparent background */
    color: #FFD700; /* Golden text for contrast */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    text-align: center;
    margin: 20px auto;
    width: 75%;
    max-width: 1200px;
}

/* Header Styling for PLC Section */
.plc-tool h2 {
    color: #FFD700;
    font-size: 1.8rem;
    margin-bottom: 15px;
}

/* Code Container */
.plc-code-container {
    background: #222; /* Dark background for code */
    color: #00FF00; /* Green text to mimic a terminal */
    padding: 15px;
    border-radius: 8px;
    font-family: monospace;
    text-align: left;
    white-space: pre-wrap;
    overflow-x: auto;
    max-height: 400px; /* Prevents excessive scrolling */
    border: 1px solid #FFD700;
}

/* Buttons */
.plc-buttons {
    margin-top: 15px;
}

.plc-button {
    background: #FFD700;
    color: black;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease, transform 0.2s ease;
}

.plc-button:hover {
    background: #FF8C00;
    transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
    .plc-tool {
        width: 90%;
    }

    .plc-code-container {
        font-size: 0.9rem;
    }
}
