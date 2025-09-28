// Can have two modes, one fractional years, the other split into years, days, hours, seconds
//prioritize fractional for a MVP


document.addEventListener("DOMContentLoaded", async function() {
    const timer = document.querySelector("#yearsLeft");
    if (!timer) return;

    const msYear = 365.25 * 24 * 60 * 60 * 1000;
    const intervalMs = 50;

    function getFromStorage(keys) {
        return new Promise(resolve => {
            chrome.storage.local.get(keys, resolve);
        });
    }

    function setToStorage(obj) {
        return new Promise(resolve => {
            chrome.storage.local.set(obj, resolve);
        });
    }

    const stored = await getFromStorage(["deathTimestamp", "diffYears"]);
    let deathTs = stored.deathTimestamp;

    if (!deathTs) {
        const legacyDiffYears = stored.diffYears;
        if (!legacyDiffYears) {
            window.location.href = chrome.runtime.getURL("setup.html");
            return;
        }
        deathTs = Date.now() + legacyDiffYears * msYear;
        await setToStorage({ deathTimestamp: deathTs });
    }

    if (typeof deathTs !== "number") {
        deathTs = Number(deathTs);
    }

    function render(msLeft) {
        const yearsLeft = msLeft / msYear;
        timer.textContent = yearsLeft.toFixed(12);
    }

    let last = Date.now();

    const intervalId = setInterval(function() {
        const now = Date.now();
        const msLeft = deathTs - now;

        if (msLeft <= 0) {
            clearInterval(intervalId);
            timer.textContent = "Rip";
            return;
        }

        render(msLeft);
        last = now;
    }, intervalMs);
});





