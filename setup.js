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
    const diffYears = diff/msPerYear;

    chrome.storage.local.set({diffYears : diffYears}, function() {
        //console.log(diffYears + " years");

    });

    const launchButton = document.querySelector("#launch");

    launchButton.addEventListener("click", function() {
        
        const name = document.querySelector("#name").value;
        const classSelected = document.querySelector("input[name='class']:checked");

        if (!name) {
            alert("Please enter your name!");
            return;
        }

        if (!classSelected) {
            alert("Please choose a class!");
            return;
        }

        localStorage.setItem("playerName", name);
        localStorage.setItem("playerClass", classSelected.value);

        window.location.href = "main.html";
    });

});