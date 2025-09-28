// Can have two modes, one fractional years, the other split into years, days, hours, seconds
//prioritize fractional for a MVP

const msYear = 365.25 * 24 * 60 * 60 * 1000;
const intervalMs = 50

chrome.storage.local.get(["diffYears"], function(result) {

    if (!result.diffYears) {
        window.location.href = "setup.html";
    }


    //console.log(result.diffYears);

    untilDeath = result.diffYears;


    const timer = document.querySelector("#yearsLeft");

    const intervalId = setInterval(function() {

    untilDeath -= intervalMs/msYear;
    timer.textContent = untilDeath;

    if (untilDeath <= 0) {
        clearInterval(intervalId);
        timer.textContent = "Rip";
    }   


    }, intervalMs);
});

