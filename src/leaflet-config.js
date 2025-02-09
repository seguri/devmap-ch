import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import L from "leaflet";
import "leaflet.fullscreen";
import "leaflet.markercluster";
import markerIcon from "./images/marker-icon.png";
import markerIcon2x from "./images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

function createMapInside(maxBounds) {
  const map = L.map("map", {
    minZoom: 7,
    zoom: 9,
    maxBounds: maxBounds,
    fullscreenControl: true,
  });
  map.addLayer(createAttribution());
  return map;
}

function createAttribution() {
  return L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
      | <a href="https://www.swisstopo.admin.ch/en/geodata/landscape/boundaries3d.html">swisstopo</a>`,
  });
}

export { createMapInside };
