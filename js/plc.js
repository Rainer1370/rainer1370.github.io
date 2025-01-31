document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ plc.js loaded");

    // Ensure PLC code switching works immediately
    function switchPLCCode() {
        const selectedLang = document.getElementById("plcSelector").value;
        document.querySelectorAll(".plc-code").forEach(block => block.style.display = "none");
        document.getElementById(selectedLang).style.display = "block";
        console.log(`✅ PLC display updated to: ${selectedLang}`);
    }

    // Attach event listener for PLC selection
    const plcSelector = document.getElementById("plcSelector");
    if (plcSelector) {
        plcSelector.addEventListener("change", switchPLCCode);
        switchPLCCode(); // Ensure the correct selection is shown on load
    }

    // Logic Gate Simulator - Updates Live
    function simulateLogic() {
        console.log("🔄 Running logic gate simulation...");

        const inputA = document.getElementById("inputA").checked;
        const inputB = document.getElementById("inputB").checked;

        document.getElementById("andResult").textContent = inputA && inputB ? "ON" : "OFF";
        document.getElementById("orResult").textContent = inputA || inputB ? "ON" : "OFF";
        document.getElementById("notAResult").textContent = !inputA ? "ON" : "OFF";

        console.log(`🟢 AND: ${inputA && inputB ? "ON" : "OFF"}`);
        console.log(`🟢 OR: ${inputA || inputB ? "ON" : "OFF"}`);
        console.log(`🟢 NOT A: ${!inputA ? "ON" : "OFF"}`);
    }

    // Attach event listeners for live updates
    document.querySelectorAll(".logic-input").forEach(input => {
        input.addEventListener("change", simulateLogic);
    });

    // Run simulation on page load (in case checkboxes are preselected)
    simulateLogic();

    console.log("✅ PLC functionality is now fully active.");
});
