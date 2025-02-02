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

    let simulationInterval;
    let timeElapsed = 0;
    
    function pidController(setpoint, kp, ki, kd, output, integral, prevError, timeStep) {
        let error = setpoint - output;
        integral += error * timeStep;
        let derivative = (error - prevError) / timeStep;
        output += kp * error + ki * integral + kd * derivative;
        return { output, integral, error };
    }

    function startSimulation() {
        let kp = parseFloat(document.getElementById("pid-kp").value);
        let ki = parseFloat(document.getElementById("pid-ki").value);
        let kd = parseFloat(document.getElementById("pid-kd").value);
        let setpoint = parseFloat(document.getElementById("pid-setpoint").value);
        let timeStep = parseFloat(document.getElementById("time-interval").value); // Get selected time step

        document.getElementById("pid-start-btn").disabled = true;
        document.getElementById("pid-stop-btn").disabled = false;
        
        let output = 0, integral = 0, prevError = 0;
        timeElapsed = 0;

        function updateGraph() {
            let result = pidController(setpoint, kp, ki, kd, output, integral, prevError, timeStep);
            output = result.output;
            integral = result.integral;
            prevError = result.error;

            timeElapsed += timeStep;
            pidChart.data.labels.push(timeElapsed.toFixed(1));
            pidChart.data.datasets[0].data.push(output);
            
            if (pidChart.data.labels.length > 100) {
                pidChart.data.labels.shift();
                pidChart.data.datasets[0].data.shift();
            }

            pidChart.update();
        }

        updateGraph();
        simulationInterval = setInterval(updateGraph, timeStep * 1000);
    }

    function stopSimulation() {
        clearInterval(simulationInterval);
        document.getElementById("pid-start-btn").disabled = false;
        document.getElementById("pid-stop-btn").disabled = true;
    }

    function clearSimulation() {
        stopSimulation();

        // Reset input fields
        document.getElementById("pid-kp").value = 1;
        document.getElementById("pid-ki").value = 0;
        document.getElementById("pid-kd").value = 0;
        document.getElementById("pid-setpoint").value = 10;
        document.getElementById("time-interval").value = 0.5;

        // Clear graph
        pidChart.data.labels = [];
        pidChart.data.datasets[0].data = [];
        pidChart.update();
    }

    document.getElementById("pid-start-btn").addEventListener("click", startSimulation);
    document.getElementById("pid-stop-btn").addEventListener("click", stopSimulation);
    document.getElementById("clear-simulation-btn").addEventListener("click", clearSimulation);
});
