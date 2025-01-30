document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ plc.js loaded!");

    window.switchPLCCode = function () {
        console.log("🔄 Switching PLC Code...");

        const selectedLang = document.getElementById("plcSelector")?.value;
        if (!selectedLang) {
            console.error("❌ plcSelector not found!");
            return;
        }

        const codeBlocks = document.querySelectorAll(".plc-code");
        codeBlocks.forEach(block => {
            block.style.display = "none"; // Hide all code blocks
        });

        const selectedCodeBlock = document.getElementById(selectedLang);
        if (selectedCodeBlock) {
            selectedCodeBlock.style.display = "block"; // Show selected code block
            console.log(`✅ Displaying ${selectedLang} code`);
        } else {
            console.error(`❌ No matching code block found for ${selectedLang}`);
        }
    };

    // Bind event listener after dropdown is loaded
    function attachDropdownListener() {
        const plcSelector = document.getElementById("plcSelector");
        if (plcSelector) {
            plcSelector.addEventListener("change", switchPLCCode);
            console.log("✅ Event listener added to plcSelector.");
        } else {
            console.warn("⚠️ plcSelector not found on initial load.");
        }
    }

    // Ensure function runs after tools.html loads
    if (document.getElementById("plcSelector")) {
        attachDropdownListener();
        switchPLCCode(); // Initialize with the default selection
    } else {
        setTimeout(attachDropdownListener, 1000); // Delay to wait for tools.html loading
    }

    // Logic Gate Simulation
    window.simulateLogic = function () {
        console.log("🔄 Running Logic Simulation...");
        
        const inputA = document.getElementById("inputA")?.checked;
        const inputB = document.getElementById("inputB")?.checked;

        if (inputA === undefined || inputB === undefined) {
            console.error("❌ Logic inputs not found!");
            return;
        }

        document.getElementById("andResult").textContent = inputA && inputB ? "ON" : "OFF";
        document.getElementById("orResult").textContent = inputA || inputB ? "ON" : "OFF";
        document.getElementById("notAResult").textContent = !inputA ? "ON" : "OFF";
        console.log("✅ Logic Simulation Updated!");
    };
});
