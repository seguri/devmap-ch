import "./styles.css";
import L from "leaflet";
import { createMapInside } from "./leaflet-config";
import { highlightedSwitzerlandLayer, getSwissBorderBounds } from "./swiss-border";
import companies from "../data/companies";

const map = createMapInside(getSwissBorderBounds());

map.addLayer(highlightedSwitzerlandLayer());
map.fitBounds(getSwissBorderBounds());
for (const company of companies) {
  createPin(company).addTo(map);
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
