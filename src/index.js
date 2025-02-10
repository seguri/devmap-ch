import "./styles.css";
import L from "leaflet";
import { createMapInside } from "./leaflet-config";
import { highlightedSwitzerlandLayer, getSwissBorderBounds } from "./swiss-border";
import companies from "../data/companies";

const map = createMapInside(getSwissBorderBounds());

highlightSwitzerland(map);
fitBoundsToSwissBorder(map);
markCompanies(map);

function highlightSwitzerland(map) {
  map.addLayer(highlightedSwitzerlandLayer());
}

function fitBoundsToSwissBorder(map) {
  map.fitBounds(getSwissBorderBounds());
}

function markCompanies(map) {
  const markers = L.markerClusterGroup({ showCoverageOnHover: false });
  for (const company of companies) {
    markers.addLayer(createPin(company));
  }
  map.addLayer(markers);
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
