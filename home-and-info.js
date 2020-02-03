const iconHome = document.querySelector("#icon-home");
const iconInfo = document.querySelector("#icon-info");
const chooseContinentParagrapgh = document.querySelector(".choose-continent-paragraph");
const whatAndHowTo = document.querySelector(".what-and-how-to");
const chooseContinent = document.querySelector(".choose-continent");
const chooseContinentAfrica = document.querySelector(".choose-continent-africa");
const infoSectionContainer = document.querySelector("#info-section-container");

iconHome.onclick = () => {
    kart.flyTo({
        center: [17.525, 23.074],
        zoom: 1.5
    });

    kart.setPaintProperty(aktiv, "fill-color", "transparent");
    infoSectionTitle.innerHTML = "Africa";
    totalAidAmount.innerHTML = "142,624 MNOK";
    aidPercentages.innerHTML = (142624 * 100 / 600813.8).toFixed(2) + " %";
    aidExplanation.innerHTML = "of the world's total aid from Norway"

    infoSectionContainer.style.display = "none";
    whatAndHowTo.style.display = "flex";
    chooseContinent.style.display = "block";
}

let open = true;
iconInfo.onclick = () => {
    if (open) {
        whatAndHowTo.style.display = "none";
        infoSectionContainer.style.display = "flex";
        iconInfo.style.color = "white";
        iconInfo.style.animation = "none";
        iconInfo.style.animationPlayState = "paused";
    } else {whatAndHowTo.style.display = "block";
        infoSectionContainer.style.display = "none";
        iconInfo.style.color = "gold";
        iconInfo.style.animation = "pulsate 1.5s infinite"
    }
    chooseContinent.style.display = "none";
    open = !open;
};

chooseContinentAfrica.onclick = () => {
    kart.flyTo({
        center: [41.657048, -6.813934],
        zoom: 3.50,
        pitch: 40,
        minPitch: 40,
        maxPitch: 40
    });
    infoSectionContainer.style.display = "flex";
    whatAndHowTo.style.display = "none";
    iconInfo.style.color = "white";
    iconInfo.style.animationPlayState = "paused"; 
}