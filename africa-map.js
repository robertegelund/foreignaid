const infoSectionTitle = document.querySelector(".info-section-title");
const totalAidAmount = document.querySelector(".total-aid-amount");
const aidPercentages = document.querySelector(".aid-percentages");

aidPercentages.innerHTML = (142624 * 100 / 600813.8).toFixed(2) + " %";

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iZXJ0ZWdlbHVuZCIsImEiOiJjazUzbHVlaHkwYTFoM2xwbmltNzgyazA0In0.Xc5srVX7uKCSLlVU1RdtCg';

const kart = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/robertegelund/ck58bcdnm1y811dquwb262n1v',
    center: [35.042631, -6.467285],
    zoom: 3.2,
    maxZoom: 3.6,
    minZoom: 3.2,
    pitch: 40,
    maxPitch: 40
});

let first = true;

const addLayer = async () => {
    const response = await fetch("./data/africa.geojson");
    const json = await response.json();

    await json.features.map(country => {
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
        })

        kart.on("mouseover", country.properties.name, () => {
            kart.setPaintProperty(country.properties.name, "fill-color", "rgba(0,0,0,0.5)");
        });
        kart.on("mouseleave", country.properties.name, () => {
            kart.setPaintProperty(country.properties.name, "fill-color", "transparent")
        });

        kart.on("click", country.properties.name, (e) => {
            infoSectionTitle.innerHTML = country.properties.name;

            const aidString = String(country.properties.aid);
            const aidStringArray = [];
            
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
            kart.setZoom(3.6);

            const unallocatedGraphOptions = {
                chart: {
                    renderTo: "aid-graph",
                    type: "bar",
                    backgroundColor: "transparent",
                },
                title: false,
                series: [{
                    color: "gold",
                    borderColor: "transparent",
                    data: 
                            [{
                                name: "Unallocated/Unspecified",
                                y: country.properties.unspecified * 100 / country.properties.aid
                            }]
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

            const chart = new Highcharts.Chart(unallocatedGraphOptions);
            
            if(first) {
                kart.flyTo({
                    center: [e.lngLat.lng, e.lngLat.lat]
                });
                first = false;
            } else {
                kart.easeTo({
                    center: [e.lngLat.lng, e.lngLat.lat]
                });
                /* chart.series[0].update({data: [{
                    name: "Unallocated/Unspecified",
                    y: country.properties.unspecified * 100 / country.properties.aid
                }]}); */
                console.log(chart)
            };


            
    });
        })};

kart.on("load", () => {
    addLayer();
});
