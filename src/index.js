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

function createPin([lat, lon, address, ...companyInfo]) {
  const lines = [];
  const companyNames = [];
  for (let i = 0; i < companyInfo.length; i += 2) {
    const name = companyInfo[i];
    const url = companyInfo[i + 1];
    lines.push(`<a href="https://${url}" target="_blank">${name}</a>`);
    companyNames.push(name);
  }
  lines.push(address.split(",")[0]);
  lines.push(address.split(",")[1]);
  const title = `${companyNames.join(", ")} @ ${address}`;
  return L.marker([lat, lon], {
    title: title,
    alt: title,
  }).bindPopup(lines.join("<br>"));
}
