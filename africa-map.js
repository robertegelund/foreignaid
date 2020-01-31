const infoSectionTitle = document.querySelector(".info-section-title");
const totalAidAmount = document.querySelector(".total-aid-amount");
const aidPercentages = document.querySelector(".aid-percentages");
const aidExplanation = document.querySelector(".aid-explanation")
const aidGraphTimeseries = document.querySelector("#aid-graph-timeseries");
const aidGraphUnspecified = document.querySelector("#aid-graph-unspecified");
const aidStatus = document.querySelector(".aid-status");

let aktiv = "Namibia";
let first = true;

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iZXJ0ZWdlbHVuZCIsImEiOiJjazUzbHVlaHkwYTFoM2xwbmltNzgyazA0In0.Xc5srVX7uKCSLlVU1RdtCg';
const kart = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/robertegelund/ck60zv5y7086a1io3ahy6d9f2",
    center: [41.657048, -6.813934],
    zoom: 3.55,
    maxZoom: 4,
    minZoom: 3.55,
    pitch: 40,
    minPitch: 40,
    maxPitch: 40
});

kart.on("load", () => {
    collectAndUseData();
});

const options = {
    chart: {
        renderTo: "aid-graph-unspecified",
        type: "bar",
        backgroundColor: "transparent",
    },
    title: false,
    series: [{
        color: "gold",
        borderColor: "transparent",
        data: []
    }],
    legend: {
        enabled: false 
    },
    yAxis: {
        min: 0,
        max: 1,
        title: "",
        labels: {
            style: {color: "white"}, format: "{value}%"
        }
    },
    xAxis: {
        categories: ["Unalloc./Unspec."],
        labels: {
            style: {color: "white"}
        }
    }
}
const chart = new Highcharts.Chart(options);


aidPercentages.innerHTML = (142624 * 100 / 600813.8).toFixed(2) + " %";
aidExplanation.innerHTML = "of the world's total aid from Norway"

const collectAndUseData = async () => {
    const response = await fetch("./data/africa.geojson");
    const json = await response.json();
    const aidData = await json.features.map( country => {
   
    kart.addLayer({
        id: country.properties.name,
        type: "fill",
        paint: {
            "fill-color": "transparent"
        },
        source: {
            type: "geojson",
            data: country.geometry
        }
    });

    kart.on("mouseover", country.properties.name, () => {
        if(country.properties.name != aktiv) 
            kart.setPaintProperty(country.properties.name, "fill-color", "rgba(0,0,0,0.5)");
    });

    kart.on("mouseleave", country.properties.name, () => {
        if(country.properties.name != aktiv)
            kart.setPaintProperty(country.properties.name, "fill-color", "transparent")
    });

    kart.on("click", country.properties.name, (e) => {
        kart.setPaintProperty(aktiv, "fill-color", "transparent");    
        aktiv = country.properties.name;
        kart.setPaintProperty(aktiv, "fill-color", "rgba(230,0,0,0.3)");
        
        infoSectionTitle.innerHTML = country.properties.name;
        
        const aidString = String(country.properties.aid);
        const aidStringArray = [];
        kart.setZoom(4);
        if (aidString.length === 6) {
                for (let i=1; i <= aidString.length; i++) { 
                    aidStringArray.push(aidString[i]);
                    totalAidAmount.innerHTML = aidString[0] + "," + aidStringArray.join("") + " MNOK";
        }} else if (aidString.length === 7) {
                for (let i=2; i <= aidString.length; i++) {
                    aidStringArray.push(aidString[i]);
                    totalAidAmount.innerHTML = aidString[0] + aidString[1] + "," + aidStringArray.join("") + " MNOK";
            }} else {
                    totalAidAmount.innerHTML = aidString + " MNOK";
            };

        aidPercentages.innerHTML = (country.properties.aid * 100 / 142624).toFixed(2) + " %";
        aidExplanation.innerHTML = "of Africa's total aid from Norway";
        aidGraphTimeseries.style.display = "none";
        aidGraphUnspecified.style.display = "block";
        
        if(first) {
            kart.flyTo({
                center: [e.lngLat.lng, e.lngLat.lat]
            });
            first = false;
        } else {
            kart.easeTo({
                center: [e.lngLat.lng, e.lngLat.lat]
            });
        };

        chart.series[0].update({
            data:   [{
                        name: "Unallocated/Unspecified",
                        y: country.properties.unspecified * 100 / country.properties.aid
                    }]
            }) 

        if(country.properties.unspecified === 0) {
            aidStatus.style.display = "block";
            aidStatus.innerHTML = `All ${country.properties.name}'s Norwegian aid are allocated`;
        } else if (country.properties.unspecified === "NaN") {
            aidStatus.style.display = "block";
            aidStatus.innerHTML = `We are not sure whether any of ${country.properties.name}'s Norwegian aid is unalloc./unspec.`;
        } else {aidStatus.style.display = "none"}

    });
})};