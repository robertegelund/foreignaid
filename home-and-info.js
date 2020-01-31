const iconHome = document.querySelector("#icon-home");
const iconInfo = document.querySelector("#icon-info");

iconHome.onclick = () => {
    kart.flyTo({
        center: [41.657048, -6.813934],
        zoom: 3.55,
        pitch: 40
    });

    infoSectionTitle.innerHTML = "Africa";
    totalAidAmount.innerHTML = "142,624";
    aidPercentages.innerHTML = (142624 * 100 / 600813.8).toFixed(2) + " %";
    aidExplanation.innerHTML = "of the world's total aid from Norway"
    aidGraphUnspecified.style.display = "none";
    aidGraphTimeseries.style.display = "block";
    aidStatus.style.display = "none"
}