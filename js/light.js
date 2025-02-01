(function () {
    console.log("✅ Light Analysis Tool script loaded inside tools.html");

    function loadChartJs(callback) {
        if (typeof Chart === "undefined") {
            console.log("📥 Loading Chart.js dynamically...");
            let script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/chart.js";
            script.defer = true;
            script.onload = callback;
            document.body.appendChild(script);
        } else {
            console.log("⚡ Chart.js already loaded, initializing Light tool...");
            callback();
        }
    }

    function initializeLightTool() {
        console.log("✅ Initializing Light Analysis Tool");

        let ctx = document.getElementById("lightChart").getContext("2d");
        let lightChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: [],
                datasets: [{
                    label: "Light Intensity (Lux)",
                    borderColor: "gold",
                    backgroundColor: "rgba(255, 215, 0, 0.5)",
                    data: [],
                    fill: true
                }]
            },
            options: {
                animation: false,
                responsive: true,
                scales: {
                    x: { title: { display: true, text: "Time (s)" } },
                    y: { title: { display: true, text: "Lux Level" } }
                }
            }
        });

        function updateLightSimulation() {
            let brightness = parseInt(document.getElementById("light-brightness").value);
            let color = document.getElementById("light-color").value;
            document.getElementById("brightness-value").textContent = brightness + "%";

            // Simulate Lux Calculation (arbitrary scaling)
            let lux = Math.round((brightness / 100) * 500);
            document.getElementById("lux-value").textContent = lux + " lux";

            // Update Graph Data
            let currentTime = new Date().getSeconds();
            if (lightChart.data.labels.length > 20) {
                lightChart.data.labels.shift();
                lightChart.data.datasets[0].data.shift();
            }
            lightChart.data.labels.push(currentTime);
            lightChart.data.datasets[0].data.push(lux);
            lightChart.update();
        }

        // Attach event listeners
        document.getElementById("light-brightness").addEventListener("input", updateLightSimulation);
        document.getElementById("light-color").addEventListener("input", updateLightSimulation);

        // Start real-time updates
        setInterval(updateLightSimulation, 1000);
    }

    // Load Chart.js first, then initialize the Light Analysis Tool
    loadChartJs(initializeLightTool);
})();
