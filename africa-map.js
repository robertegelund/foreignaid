const infoSectionTitle = document.querySelector(".info-section-title");
const totalAidAmount = document.querySelector(".total-aid-amount");
const aidPercentages = document.querySelector(".aid-percentages");

aidPercentages.innerHTML = (142624 * 100 / 600813.8).toFixed(2) + " %";

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iZXJ0ZWdlbHVuZCIsImEiOiJjazUzbHVlaHkwYTFoM2xwbmltNzgyazA0In0.Xc5srVX7uKCSLlVU1RdtCg';

const kart = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/robertegelund/ck58bcdnm1y811dquwb262n1v',
    center: [20.994772, 2.096299],
    zoom: 3.2,
    maxZoom: 4.3,
    minZoom: 3.5,
    pitch: 40
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
                "fill-color": "rgba(0,0,0,0.5)"
            },
            source: {
                type: "geojson",
                data: country.geometry
            }
        })

        kart.on("mouseover", country.properties.name, () => {
            kart.setPaintProperty(country.properties.name, "fill-color", "transparent");
        });
        kart.on("mouseleave", country.properties.name, () => {
            kart.setPaintProperty(country.properties.name, "fill-color", "rgba(0,0,0,0.5)")
        });

        kart.on("click", country.properties.name, (e) => {
            kart.setZoom(4.1);
            kart.setPaintProperty(country.properties.name, "fill-color", "transparent");
    
            if(first) {
                kart.jumpTo({
                    center: [e.lngLat.lng, e.lngLat.lat]
                })
                first = false;
            } else {
                kart.easeTo({
                    center: [e.lngLat.lng, e.lngLat.lat]
                })
            };
           
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

            const options = {
                chart: {
                    renderTo: "aid-graph",
                    type: "bar",
                    height: "250px",
                    backgroundColor: "transparent"
                },
                title: false,
                series: [{
                    color: "gold",
                    borderColor: "transparent",
                    data: 
                        [
                            {
                                name: "Unspecified/Unallocated",
                                y: country.properties.unspecified
                            },
                            {
                                name: "Specified/Allocated",
                                y: country.properties.aid
                            }
                        ]
                        }],
                yAxis: {
                    title: "",
                    labels: {
                        style: {
                            color: "white"
                        }
                    }
                },
                xAxis: {
                    categories: ["Unspecified", "Specified"],
                    labels: {
                        style: {
                            color: "white"
                        }
                    }
                }
            }
            new Highcharts.Chart(options);
    });
        })};

kart.on("load", () => {
    addLayer();
});
