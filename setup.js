document.addEventListener("DOMContentLoaded", function() {
    
    const form = document.querySelector("#infoForm");

    if (!form) return;

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const birthdayInput = document.querySelector("#birthday").value;
        const sexInput = document.querySelector("input[name='sex']:checked")?.value;

        if (!birthdayInput) {
            alert("Please enter your birthday!");
            return;
        }
        if (!sexInput) {
            alert("Please select your sex!");
            return;
        }

        const birthday = new Date(birthdayInput);
        const lifeExpectancy = (sexInput === "male") ? 75.8 : 81.1;
        const current = new Date();
        const deathDate = new Date(birthday);
        deathDate.setFullYear(deathDate.getFullYear() + lifeExpectancy);

        const diff = deathDate - current;
        const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
        const diffYears = diff / msPerYear;

        chrome.storage.local.set({ diffYears: diffYears }, function() {
            window.location.href = chrome.runtime.getURL("newtab.html");
        });
    });
});
