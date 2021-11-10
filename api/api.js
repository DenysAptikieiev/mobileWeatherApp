import axios from "axios";
const API_KEY = `854c24404ffc6cf717ba716250ec2064`;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?`;
export const getWeather = async (lat, lon) => {
  return await axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
}