document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ PID Simulator Loaded");

    let ctx = document.getElementById("pidChart").getContext("2d");
    let pidChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    label: "System Response",
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.2)",
                    data: [],
                    fill: true,
                }
            ]
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

    let simulationRunning = false;
    let interval;

    function pidController(setpoint, kp, ki, kd) {
        let output = 0;
        let integral = 0;
        let prevError = 0;
        let timeStep = 0.1;
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

    function startSimulation() {
        if (simulationRunning) return;
        simulationRunning = true;
        document.getElementById("pid-start-btn").disabled = true;
        document.getElementById("pid-stop-btn").disabled = false;

        let time = 0;
        pidChart.data.labels = [];
        pidChart.data.datasets[0].data = [];

        interval = setInterval(() => {
            if (!simulationRunning) return;

            let kp = parseFloat(document.getElementById("pid-kp").value);
            let ki = parseFloat(document.getElementById("pid-ki").value);
            let kd = parseFloat(document.getElementById("pid-kd").value);
            let setpoint = parseFloat(document.getElementById("pid-setpoint").value);

            let data = pidController(setpoint, kp, ki, kd);
            let newValue = data[Math.min(time, data.length - 1)];

            pidChart.data.labels.push(time.toFixed(1));
            pidChart.data.datasets[0].data.push(newValue);
            if (pidChart.data.labels.length > 50) {
                pidChart.data.labels.shift();
                pidChart.data.datasets[0].data.shift();
            }

            pidChart.update();
            time += 0.1;
        }, 100);
    }

    function stopSimulation() {
        simulationRunning = false;
        clearInterval(interval);
        document.getElementById("pid-start-btn").disabled = false;
        document.getElementById("pid-stop-btn").disabled = true;
    }

    document.getElementById("pid-start-btn").addEventListener("click", startSimulation);
    document.getElementById("pid-stop-btn").addEventListener("click", stopSimulation);

    // Allow dynamic updates while running
    document.querySelectorAll("#pid-kp, #pid-ki, #pid-kd, #pid-setpoint").forEach(input => {
        input.addEventListener("input", () => {
            if (simulationRunning) {
                clearInterval(interval);
                startSimulation();
            }
        });
    });
});
