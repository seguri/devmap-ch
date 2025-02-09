import L from "leaflet";
import swissBorder from "../data/ch-2d-half.json";

const PANTONE_485C = "#dc241f";

function getSwissBorderBounds() {
  return L.geoJSON(swissBorder).getBounds();
}

function highlightedSwitzerlandLayer() {
  const highlightedSwitzerland = highlightFromWorldMask(swissBorder.features[0]);
  return L.geoJSON(highlightedSwitzerland, { style: highlightedSwitzerlandStyle });
}

function highlightFromWorldMask(feature) {
  const mask = createWorldMask();
  // Add the desired feature as "holes" to the world mask
  const outerRing = mask.geometry.coordinates;
  const innerRings = feature.geometry.coordinates;
  mask.geometry = { type: "MultiPolygon", coordinates: [outerRing, innerRings] };
  // Return the mask with holes and the desired feature
  return {
    type: "FeatureCollection",
    features: [mask, feature],
  };
}

function highlightedSwitzerlandStyle(feature) {
  switch (feature.properties.NAME) {
    case "Mask":
      return { fillColor: "black", fillOpacity: 0.7, weight: 0, clickable: false };
    default:
      return { color: PANTONE_485C, fillColor: PANTONE_485C, fillOpacity: 0.2 };
  }
}

function createWorldMask() {
  const coords = [
    [
      [-180, -90],
      [-180, 90],
      [180, 90],
      [180, -90],
      [-180, -90],
    ],
  ];
  return {
    type: "Feature",
    properties: { NAME: "Mask" },
    geometry: {
      type: "Polygon",
      coordinates: coords,
    },
  };
}

export { getSwissBorderBounds, highlightedSwitzerlandLayer };
