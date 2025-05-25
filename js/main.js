const API_KEY = "at_gZB8emPBwTzIrBfGI021LzzVisu7N";
const geolocationURL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;
const map = L.map("map");
const input = document.querySelector("input");
const submitBtn = document.querySelector("button[type='submit']");
const ipaValue = document.querySelector(".ipa__value");
const locValue = document.querySelector(".location__value");
const timezoneValue = document.querySelector(".timezone__value");
const ispValue = document.querySelector(".isp__value");

const ipInfo = (ip, city, country, zipCode, timezone, isp) => {
  ipaValue.innerText = ip;
  locValue.innerText = `${city}, ${country} ${!zipCode ? "-" : zipCode}`;
  timezoneValue.innerText = `UTC${timezone}`;
  ispValue.innerText = !isp ? "Unknown" : isp;
};

const getLocCor = async (ipAddress) => {
  const response = await fetch(
    ipAddress ? `${geolocationURL}&ipAddress=${ipAddress}` : geolocationURL
  );
  const data = await response.json();

  const {
    ip,
    location: { city, country, geonameId, timezone, lat, lng },
    isp,
  } = data;

  ipInfo(ip, city, country, geonameId, timezone, isp);
  return [lat, lng];
};

const findLoc = (locCoordinates) => {
  map.setView(locCoordinates, 19);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  L.marker(locCoordinates).addTo(map);
};

getLocCor().then((locCoordinates) => {
  findLoc(locCoordinates);
});

submitBtn.addEventListener("click", () => {
  console.log("clicked");

  if (input.value) {
    getLocCor().then((locCoordinates) => {
      findLoc(locCoordinates);
    });
  }
  input.value = "";
});
