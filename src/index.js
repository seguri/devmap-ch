import "leaflet/dist/leaflet.css";
import "./styles.css";
import L from "leaflet";
import "./leaflet-config";
import swissBorder from "../data/ch-2d-half.json";
import companies from "../data/companies";

const swissBorderLayer = L.geoJSON(swissBorder);
const swissBorderBounds = swissBorderLayer.getBounds();
const map = createMapInside(swissBorderBounds);

map.addLayer(createAttribution());
map.addLayer(createSwissBorder(swissBorder));
map.fitBounds(swissBorderBounds);
for (const company of companies) {
  createPin(company).addTo(map);
}

function createMapInside(maxBounds) {
  return L.map("map", {
    minZoom: 7,
    zoom: 8,
    maxBounds: maxBounds,
  });
}

function createAttribution() {
  return L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
      | <a href="https://www.swisstopo.admin.ch/en/geodata/landscape/boundaries3d.html">swisstopo</a>`,
  });
}

function createSwissBorder(geoJson) {
  const pantone485c = "#DC241F";
  return createMaskAround(geoJson.features[0], {
    color: pantone485c,
    fillColor: pantone485c,
    fillOpacity: 0.2,
  });
}

function createMaskAround(feature, featureStyle) {
  const worldCoords = [
    [
      [-180, -90],
      [-180, 90],
      [180, 90],
      [180, -90],
      [-180, -90],
    ],
  ];
  const maskAroundFeature = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          NAME: "Mask",
        },
        geometry: {
          type: "MultiPolygon",
          // This should be an array of rings; L tolerates also arrays of arrays of rings
          coordinates: [worldCoords, feature.geometry.coordinates],
        },
      },
      feature,
    ],
  };
  return L.geoJSON(maskAroundFeature, {
    style: (feature) => {
      switch (feature.properties.NAME) {
        case "Mask":
          return { fillColor: "black", fillOpacity: 0.7, weight: 0, clickable: false };
        default:
          return featureStyle;
      }
    },
  });
}

function createPin([lat, lon, address, name, url]) {
  const lines = [
    `<a href="https://${url}" target="_blank">${name}</a>`,
    `${address.split(",")[0]}`,
    `${address.split(",")[1]}`,
  ];
  return L.marker([lat, lon], {
    title: name,
    alt: name,
  }).bindPopup(lines.join("<br>"));
}
