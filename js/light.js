document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Light Analysis Tool Loaded");

    const speedOfLight = 299792458; // m/s
    const plancksConstant = 6.626e-34; // J·s
    const electronCharge = 1.602e-19; // C

    const analyzeButton = document.getElementById("analyzeLight");
    const wavelengthInput = document.getElementById("wavelength");
    const intensityInput = document.getElementById("intensity");
    const pulseDurationInput = document.getElementById("pulseDuration");

    analyzeButton.addEventListener("click", function () {
        const wavelengthMeters = wavelengthInput.value * 1e-9;
        const frequencyHz = speedOfLight / wavelengthMeters;
        const photonEnergyJoules = plancksConstant * frequencyHz;
        const photonEnergyEV = photonEnergyJoules / electronCharge;

        document.getElementById("frequency").textContent = (frequencyHz / 1e12).toFixed(2);
        document.getElementById("photonEnergy").textContent = photonEnergyEV.toFixed(2);

        updateLightChart();
    });

    function updateLightChart() {
        const ctx = document.getElementById("lightChart").getContext("2d");

        if (window.lightChart) {
            window.lightChart.destroy();
        }

        window.lightChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: Array.from({ length: 20 }, (_, i) => i),
                datasets: [{
                    label: "Simulated Light Pulse",
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.2)",
                    data: Array.from({ length: 20 }, () => Math.random() * intensityInput.value),
                    fill: true
                }]
            },
            options: {
                animation: false,
                responsive: true,
                scales: {
                    x: { title: { display: true, text: "Time (ns)" } },
                    y: { title: { display: true, text: "Intensity (lux)" } }
                }
            }
        });
    }
});
