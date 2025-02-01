document.addEventListener("DOMContentLoaded", async function () {
    console.log("✅ AI Demo Loaded");

    const trainButton = document.getElementById("trainModel");
    const predictButton = document.getElementById("predictButton");
    const inputData = document.getElementById("inputData");
    const predictionResult = document.getElementById("predictionResult");

    let model;

    async function createModel() {
        model = tf.sequential();
        model.add(tf.layers.dense({ inputShape: [1], units: 8, activation: 'relu' }));
        model.add(tf.layers.dense({ units: 1 }));
        model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

        console.log("✅ Model Created");

        // Training Data (Simple Linear Regression Example)
        const xs = tf.tensor2d([-10, -5, 0, 5, 10], [5, 1]);
        const ys = tf.tensor2d([-20, -10, 0, 10, 20], [5, 1]);

        await model.fit(xs, ys, {
            epochs: 50,
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

        const output = model.predict(tf.tensor2d([inputValue], [1, 1]));
        output.data().then(value => {
            predictionResult.innerText = value[0].toFixed(2);
        });
    }

    trainButton.addEventListener("click", createModel);
    predictButton.addEventListener("click", makePrediction);
});
