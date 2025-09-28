// Can have two modes, one fractional years, the other split into years, days, hours, seconds
//prioritize fractional for a MVP


document.addEventListener("DOMContentLoaded", async function() {
    const timer = document.querySelector("#yearsLeft");
    if (!timer) return;

    const msYear = 365.25 * 24 * 60 * 60 * 1000;
    const intervalMs = 50;

    function getDiffYears() {
        return new Promise(resolve => {
            chrome.storage.local.get("diffYears", function(result) {
                resolve(result.diffYears);
            });
        });
    }

    const diffYears = await getDiffYears();
    if (!diffYears) {
        window.location.href = chrome.runtime.getURL("setup.html");
        return;
    }

    let untilDeath = diffYears;
    let last = Date.now();

    const intervalId = setInterval(function() {
        const now = Date.now();
        const elapsed = now - last;
        last = now;

        untilDeath -= elapsed / msYear;
        timer.textContent = untilDeath.toFixed(10);

        if (untilDeath <= 0) {
            clearInterval(intervalId);
            timer.textContent = "Rip";
        }
    }, intervalMs);
});





