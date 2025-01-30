document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ plc.js loaded!");

    // Ensure the function is available globally
    window.switchPLCCode = function () {
        const selectedLang = document.getElementById("plcSelector").value;
        const codeBlocks = document.querySelectorAll(".plc-code");

        codeBlocks.forEach(block => {
            block.style.display = "none";
        });

        document.getElementById(selectedLang).style.display = "block";
    };

    // Run switchPLCCode on page load to show the default selection
    if (document.getElementById("plcSelector")) {
        switchPLCCode();
        document.getElementById("plcSelector").addEventListener("change", switchPLCCode);
        console.log("✅ Event listener added to plcSelector.");
    } else {
        console.warn("⚠️ plcSelector not found!");
    }

    // Logic Gate Simulation
    window.simulateLogic = function () {
        const inputA = document.getElementById("inputA").checked;
        const inputB = document.getElementById("inputB").checked;

        document.getElementById("andResult").textContent = inputA && inputB ? "ON" : "OFF";
        document.getElementById("orResult").textContent = inputA || inputB ? "ON" : "OFF";
        document.getElementById("notAResult").textContent = !inputA ? "ON" : "OFF";
    };

    console.log("✅ Logic Gate Simulation initialized.");
});
