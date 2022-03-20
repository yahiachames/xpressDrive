import axios from "axios";

export const geocodeLoc = (lat, long) => {
  return axios.get(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
  );
};

export const autoCompleteLoc = (value) =>
  axios.get(`https://photon.komoot.io/api/?q=tunisie + ${value}`);
