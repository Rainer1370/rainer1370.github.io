(function () {
    console.log("✅ PID Simulator script loaded inside tools.html");

    function loadChartJs(callback) {
        if (typeof Chart === "undefined") {
            console.log("📥 Loading Chart.js dynamically...");
            let script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/chart.js";
            script.defer = true;
            script.onload = callback;
            document.body.appendChild(script);
        } else {
            console.log("⚡ Chart.js already loaded, initializing PID tool...");
            callback();
        }
    }

    function initializePID() {
        console.log("✅ Initializing PID Controller");

        let ctx = document.getElementById("pidChart").getContext("2d");
        let pidChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: [],
                datasets: [{
                    label: "System Response",
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 123, 255, 0.3)",
                    data: [],
                    fill: false
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
            let kp = parseFloat(document.getElementById("pid-kp").value);
            let ki = parseFloat(document.getElementById("pid-ki").value);
            let kd = parseFloat(document.getElementById("pid-kd").value);
            let setpoint = parseFloat(document.getElementById("pid-setpoint").value);

            let data = pidController(setpoint, kp, ki, kd);
            pidChart.data.labels = [...Array(data.length).keys()];
            pidChart.data.datasets[0].data = data;
            pidChart.update();
        }

        document.getElementById("pid-start-btn").addEventListener("click", startSimulation);
    }

    // Load Chart.js first, then initialize PID
    loadChartJs(initializePID);
})();
