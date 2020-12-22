import axios from "axios";
const URL = "http://";
const API_KEY = "";

export const cityName = async (query) => {
  const { data } = await axios.get(URL, {});

  return data;
};
