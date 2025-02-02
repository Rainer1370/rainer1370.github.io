document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ PID Simulator Loaded");

    let ctx = document.getElementById("pidChart").getContext("2d");
    let pidChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "System Response",
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                data: [],
                fill: false,
            }]
        },
        options: {
            animation: false,
            responsive: true,
            scales: {
                x: { title: { display: true, text: "Time (s)" } },
                y: { title: { display: true, text: "Output Value" } }
            }
        }
    });

    let simulationInterval = null;
    let timeStep = parseFloat(document.getElementById("time-interval").value);

    function pidController(setpoint, kp, ki, kd, timeStep) {
        let output = 0;
        let integral = 0;
        let prevError = 0;
        let history = [];

        for (let t = 0; t <= 10; t += timeStep) {
            let error = setpoint - output;
            integral += error * timeStep;
            let derivative = (error - prevError) / timeStep;
            output += kp * error + ki * integral + kd * derivative;
            prevError = error;
            history.push(output);
        }

        return history;
    }

    function updateGraph() {
        let kp = parseFloat(document.getElementById("pid-kp").value);
        let ki = parseFloat(document.getElementById("pid-ki").value);
        let kd = parseFloat(document.getElementById("pid-kd").value);
        let setpoint = parseFloat(document.getElementById("pid-setpoint").value);
        timeStep = parseFloat(document.getElementById("time-interval").value);

        let data = pidController(setpoint, kp, ki, kd, timeStep);
        pidChart.data.labels = [...Array(data.length).keys()].map(i => (i * timeStep).toFixed(1));
        pidChart.data.datasets[0].data = data;
        pidChart.update();
    }

    function startSimulation() {
        if (simulationInterval) clearInterval(simulationInterval);

        document.getElementById("pid-start-btn").disabled = true;
        document.getElementById("pid-stop-btn").disabled = false;
        document.getElementById("clear-plot-btn").disabled = false;

        updateGraph();
        simulationInterval = setInterval(updateGraph, timeStep * 1000);
    }

    function stopSimulation() {
        clearInterval(simulationInterval);
        simulationInterval = null;

        document.getElementById("pid-start-btn").disabled = false;
        document.getElementById("pid-stop-btn").disabled = true;
    }

    function clearPlot() {
        pidChart.data.labels = [];
        pidChart.data.datasets[0].data = [];
        pidChart.update();
    }

    document.getElementById("pid-start-btn").addEventListener("click", startSimulation);
    document.getElementById("pid-stop-btn").addEventListener("click", stopSimulation);
    document.getElementById("clear-plot-btn").addEventListener("click", clearPlot);

    document.getElementById("time-interval").addEventListener("change", function () {
        if (simulationInterval) {
            clearInterval(simulationInterval);
            startSimulation();
        }
    });

    document.querySelectorAll("#pid-kp, #pid-ki, #pid-kd, #pid-setpoint").forEach(input => {
        input.addEventListener("input", function () {
            if (simulationInterval) {
                updateGraph();
            }
        });
    });
});
