const form = document.querySelector("#infoForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const birthday = new Date(document.querySelector("#birthday").value);
    const sex = document.querySelector("input[name='sex']:checked")?.value;

    const lifeExpectancy = (sex === "male") ? 76 : 81;

    const current = new Date();
    const deathDate = new Date(birthday);
    deathDate.setFullYear(deathDate.getFullYear() + lifeExpectancy);
    const diff = deathDate - current;
    const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
    const diffYears = diff / msPerYear;

    chrome.storage.local.set({ diffYears: diffYears }, function() {});

    const launchButton = document.querySelector("#launch");

    launchButton.addEventListener("click", function() {
        if (!birthday) {
            alert("Please enter your birthday!");
            return;
        }

        if (!sex) {
            alert("Please select your sex!");
            return;
        }

        window.location.href = chrome.runtime.getURL("newtab.html");
    });
});
