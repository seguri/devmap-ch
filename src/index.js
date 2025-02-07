import 'leaflet/dist/leaflet.css';
import './styles.css'
import L from 'leaflet';

const map = createMap();
addAttribution(map);

function createMap() {
    return L.map('map').fitWorld();
}

function addAttribution(map) {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}