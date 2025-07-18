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

function createPin([lat, lon, address, companyName, companyUrl]) {
  const street = address.split(",")[0];
  const city = address.split(",")[1];
  const popupHtmlLines = [
    `<a href="https://${companyUrl}" target="_blank">${companyName}</a>`,
    street,
    city,
  ];
  const altText = `${companyName} @ ${address}`;
  return L.marker([lat, lon], {
    title: altText,
    alt: altText,
  }).bindPopup(popupHtmlLines.join("<br>"));
}
