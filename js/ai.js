document.addEventListener("DOMContentLoaded", async function () {
    console.log("✅ AI Demo Loaded");

    const trainButton = document.getElementById("trainModel");
    const predictButton = document.getElementById("predictButton");
    const inputData = document.getElementById("inputData");
    const predictionResult = document.getElementById("predictionResult");
    const failureReportElement = document.getElementById("failure-report");

    let model;
    let mode = 0; // Initial mode: Sim Normal

    // Simulate data paths for CSV files (you can adjust this to where your files are served)
    const MODE_TO_CSV = {
        0: "/data/simulated_data_normal.csv", // Normal data
        1: "/data/simulated_data_predicted_failure.csv", // Predicted failure data
        2: "/data/simulated_data_failure.csv" // Actual failure data
    };

    async function createModel() {
        model = tf.sequential();
        model.add(tf.layers.dense({ inputShape: [3], units: 8, activation: 'relu' })); // 3 features
        model.add(tf.layers.dense({ units: 1 })); // Output layer
        model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

        console.log("✅ Model Created");

        // Fetch data from CSV (simulating by using a preloaded mode)
        await loadDataAndTrain();
    }

    async function loadDataAndTrain() {
        const dataFile = MODE_TO_CSV[mode];
        const data = await fetchCSVData(dataFile);

        // Prepare features and labels (assuming columns: time, water_flow, temperature, vacuum_pressure)
        const xs = tf.tensor2d(data.map(row => [row.water_flow, row.temperature, row.vacuum_pressure]));
        const ys = tf.tensor2d(data.map(row => row.temperature)); // Predict temperature

        await model.fit(xs, ys, {
            epochs: 100,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    console.log(`Epoch ${epoch}: Loss = ${logs.loss.toFixed(4)}`);
                }
            }
        });

        console.log("🏆 Training Complete!");
        alert("Model Training Complete!");
    }

    async function fetchCSVData(url) {
        const response = await fetch(url);
        const text = await response.text();
        const rows = text.split("\n").slice(1); // Skip header
        return rows.map(row => {
            const cols = row.split(",");
            return {
                time: parseFloat(cols[0]),
                water_flow: parseFloat(cols[1]),
                temperature: parseFloat(cols[2]),
                vacuum_pressure: parseFloat(cols[3])
            };
        });
    }

    async function makePrediction() {
        if (!model) {
            alert("Please train the model first!");
            return;
        }

        const inputValue = parseFloat(inputData.value);
        if (isNaN(inputValue)) {
            alert("Enter a valid number for prediction.");
            return;
        }

        // Make prediction based on user input
        const prediction = model.predict(tf.tensor2d([[inputValue, 30, 1.5e-6]], [1, 3])); // Mock values for other features
        prediction.data().then(value => {
            predictionResult.innerText = value[0].toFixed(2);
        });
    }

    // Update failure report based on the mode
    function updateFailureReport() {
        let failureReport = "No significant issues detected.";
        const dataFile = MODE_TO_CSV[mode];
        const failureData = {
            "Simulated Failure": "❌ CRITICAL FAILURE DETECTED!",
            "Predicted Failure": "⚠️ Predicted anomalies detected.",
            "Normal": "✅ No significant issues detected."
        };

        if (dataFile) {
            failureReport = failureData[mode] || "No data available";
        }

        failureReportElement.innerText = failureReport;
    }

    // Handle mode change
    function changeMode(newMode) {
        mode = newMode;
        updateFailureReport();  // Update failure report when mode changes
        console.log(`Mode changed to: ${mode}`);
        loadDataAndTrain(); // Reload and train model for new mode
    }

    // Train the model on button click
    trainButton.addEventListener("click", createModel);

    // Predict based on user input on button click
    predictButton.addEventListener("click", makePrediction);

    // Set initial mode and start training with default mode
    setTimeout(() => changeMode(1), 5000); // Simulate mode change after 5 seconds

    // Initialize the page with the first mode
    changeMode(0); // Start with "Sim Normal"
});
