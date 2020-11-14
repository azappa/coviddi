export const API_URL = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json`;

export const fetcher = async (...args) => {
  const res = await fetch(...args);
  return res.json();
};
