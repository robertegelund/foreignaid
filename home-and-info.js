const iconHome = document.querySelector("#icon-home");
const iconInfo = document.querySelector("#icon-info");
const chooseContinentParagrapgh = document.querySelector(".choose-continent-paragraph");
const whatAndHowTo = document.querySelector(".what-and-how-to");
const chooseContinentAfrica = document.querySelector(".choose-continent-africa");
const infoSectionContainer = document.querySelector("#info-section-container");

iconHome.onclick = () => {
    kart.flyTo({
        center: [41.657048, -6.813934],
        zoom: 3.55,
        pitch: 40
    });

    kart.setPaintProperty(aktiv, "fill-color", "transparent"); 

    infoSectionTitle.innerHTML = "Africa";
    totalAidAmount.innerHTML = "142,624 MNOK";
    aidPercentages.innerHTML = (142624 * 100 / 600813.8).toFixed(2) + " %";
    aidExplanation.innerHTML = "of the world's total aid from Norway"
    aidGraphUnspecified.style.display = "none";
    aidGraphTimeseries.style.display = "block";
    aidStatus.style.display = "none"
}

let open = true;
iconInfo.onclick = () => {
    if (open) {
        whatAndHowTo.style.display = "none";
        infoSectionContainer.style.display = "flex";
        iconInfo.style.color = "white";
    } else {whatAndHowTo.style.display = "block";
        infoSectionContainer.style.display = "none";
        iconInfo.style.color = "gold";
    }
    open = !open;
};

chooseContinentAfrica.onclick = () => {
    infoSectionContainer.style.display = "flex";
    whatAndHowTo.style.display = "none";
    iconInfo.style.color = "white";
}