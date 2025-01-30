document.addEventListener("DOMContentLoaded", function () {
    function switchPLCCode() {
        const selectedLang = document.getElementById("plcSelector").value;
        const codeBlocks = document.querySelectorAll(".plc-code");

        codeBlocks.forEach(block => {
            block.style.display = "none";
        });

        document.getElementById(selectedLang).style.display = "block";
    }

    window.simulateLogic = function () {
        const inputA = document.getElementById("inputA").checked;
        const inputB = document.getElementById("inputB").checked;

        document.getElementById("andResult").textContent = inputA && inputB ? "ON" : "OFF";
        document.getElementById("orResult").textContent = inputA || inputB ? "ON" : "OFF";
        document.getElementById("notAResult").textContent = !inputA ? "ON" : "OFF";
    };
});
