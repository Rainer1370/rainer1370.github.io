document.addEventListener("DOMContentLoaded", async function () {
    console.log("✅ AI Demo Loaded");

    const trainButton = document.getElementById("trainModel");
    const predictButton = document.getElementById("predictButton");
    const inputData = document.getElementById("inputData");
    const predictionResult = document.getElementById("predictionResult");
    const failureReportElement = document.getElementById("failure-report");
    let model;
    let mode = 0; // Simulating mode change

    // Sample data for anomaly detection and prediction
    const MODE_TO_CSV = {
        0: "simulated_data_normal.csv",
        1: "simulated_data_predicted_failure.csv",
        2: "simulated_data_failure.csv",
    };

    async function createModel() {
        model = tf.sequential();
        model.add(tf.layers.dense({ inputShape: [3], units: 8, activation: 'relu' })); // Input layer (3 features)
        model.add(tf.layers.dense({ units: 1 })); // Output layer (1 prediction)
        model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

        console.log("✅ Model Created");

        // Example data (for simplicity, using mock data here)
        const xs = tf.tensor2d([
            [98, 25, 1e-6], // Water flow, Temperature, Pressure
            [100, 26, 1.1e-6],
            [95, 28, 1.2e-6],
            [80, 30, 2.0e-6],
            [85, 35, 2.5e-6]
        ]);
        const ys = tf.tensor2d([1, 0, 0, 1, 1], [5, 1]); // Labels for anomaly detection

        // Train the model
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

        // Make prediction based on input (e.g., water flow)
        const prediction = model.predict(tf.tensor2d([[inputValue, 30, 1.5e-6]], [1, 3])); // Mock values for temp and pressure
        prediction.data().then(value => {
            predictionResult.innerText = value[0].toFixed(2);
        });
    }

    // Update failure report based on mode and predictions
    function updateFailureReport() {
        let failureReport = "No significant issues detected.";
        const dataFile = MODE_TO_CSV[mode]; // Simulate fetching data based on the mode
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

    // Function to handle mode change
    function changeMode(newMode) {
        mode = newMode;
        updateFailureReport(); // Update the failure report when mode changes
        console.log(`Mode changed to: ${mode}`);
    }

    // Train the model on button click
    trainButton.addEventListener("click", createModel);

    // Predict based on user input on button click
    predictButton.addEventListener("click", makePrediction);

    // Simulate mode change (you can use a dropdown or other controls for this)
    setTimeout(() => changeMode(1), 5000); // Change mode after 5 seconds to simulate real-time update

    // Initialize the page
    changeMode(0); // Start with "Sim Normal" mode
});
