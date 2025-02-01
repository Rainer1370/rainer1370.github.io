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
                    backgroundColor: "rgba(0, 123, 255, 0.1)",
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

    let pidInterval = null; // Stores the interval ID
    let timeStep = 0.1;
    let timeElapsed = 0;

    function pidController(setpoint, kp, ki, kd) {
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

    function updateSimulation() {
        let kp = parseFloat(document.getElementById("pid-kp").value);
        let ki = parseFloat(document.getElementById("pid-ki").value);
        let kd = parseFloat(document.getElementById("pid-kd").value);
        let setpoint = parseFloat(document.getElementById("pid-setpoint").value);

        let data = pidController(setpoint, kp, ki, kd);
        pidChart.data.labels = [...Array(data.length).keys()].map(i => (i * timeStep).toFixed(1));
        pidChart.data.datasets[0].data = data;
        pidChart.update();
    }

    function startSimulation() {
        document.getElementById("pid-start-btn").disabled = true;
        document.getElementById("pid-stop-btn").disabled = false;
        
        let kp = parseFloat(document.getElementById("pid-kp").value);
        let ki = parseFloat(document.getElementById("pid-ki").value);
        let kd = parseFloat(document.getElementById("pid-kd").value);
        let setpoint = parseFloat(document.getElementById("pid-setpoint").value);

        pidInterval = setInterval(() => {
            let error = setpoint - pidChart.data.datasets[0].data.slice(-1)[0] || 0;
            let integral = (pidChart.data.datasets[0].data.reduce((sum, val) => sum + val, 0) || 0) * timeStep;
            let derivative = (error - (pidChart.data.datasets[0].data.slice(-2)[0] || 0)) / timeStep;
            
            let output = kp * error + ki * integral + kd * derivative;
            timeElapsed += timeStep;

            if (pidChart.data.labels.length > 50) {
                pidChart.data.labels.shift();
                pidChart.data.datasets[0].data.shift();
            }

            pidChart.data.labels.push(timeElapsed.toFixed(1));
            pidChart.data.datasets[0].data.push(output);
            pidChart.update();
        }, 100);
    }

    function stopSimulation() {
        clearInterval(pidInterval);
        document.getElementById("pid-start-btn").disabled = false;
        document.getElementById("pid-stop-btn").disabled = true;
    }

    // Attach event listeners
    document.getElementById("pid-start-btn").addEventListener("click", startSimulation);
    document.getElementById("pid-stop-btn").addEventListener("click", stopSimulation);

    // Ensure real-time update when changing gain values
    document.getElementById("pid-kp").addEventListener("input", updateSimulation);
    document.getElementById("pid-ki").addEventListener("input", updateSimulation);
    document.getElementById("pid-kd").addEventListener("input", updateSimulation);
    document.getElementById("pid-setpoint").addEventListener("input", updateSimulation);
});
