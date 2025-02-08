import "leaflet/dist/leaflet.css";
import "./styles.css";
import L from "leaflet";
import swissBorderText from "bundle-text:../data/ch-2d-half.min.geojson";

const map = createMap();
addAttribution(map);
addSwissBorder(map);

function createMap() {
  return L.map("map").setView([46.8, 8.2], 8);
}

function addAttribution(map) {
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
      | <a href="https://www.swisstopo.admin.ch/en/geodata/landscape/boundaries3d.html">swisstopo</a>`,
  }).addTo(map);
}

function addSwissBorder(map) {
  const swissBorderData = JSON.parse(swissBorderText);
  const pantone485c = "#D20001";
  L.geoJSON(swissBorderData, {
    style: {
      color: pantone485c,
    },
  }).addTo(map);
}
