document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ plc.js loaded");

    // Ensure PLC code switching works
    window.switchPLCCode = function () {
        const selectedLang = document.getElementById("plcSelector").value;
        document.querySelectorAll(".plc-code").forEach(block => {
            block.style.display = "none"; // Hide all code blocks
        });

        document.getElementById(selectedLang).style.display = "block"; // Show selected one
        console.log(`✅ PLC display updated to: ${selectedLang}`);
    };

    // Ensure logic gate simulator works
    window.simulateLogic = function () {
        console.log("🔄 Running logic gate simulation...");

        const inputA = document.getElementById("inputA").checked;
        const inputB = document.getElementById("inputB").checked;

        document.getElementById("andResult").textContent = inputA && inputB ? "ON" : "OFF";
        document.getElementById("orResult").textContent = inputA || inputB ? "ON" : "OFF";
        document.getElementById("notAResult").textContent = !inputA ? "ON" : "OFF";

        console.log(`🟢 AND: ${inputA && inputB ? "ON" : "OFF"}`);
        console.log(`🟢 OR: ${inputA || inputB ? "ON" : "OFF"}`);
        console.log(`🟢 NOT A: ${!inputA ? "ON" : "OFF"}`);
    };

    console.log("✅ PLC functionality is now active.");
});
