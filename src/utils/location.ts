export const normalizeCityName = (cityName: string): string => {
  return cityName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
};

export const getZipApiUrl = (countryCode: string, zipCode: string): string => {
  return `https://api.zippopotam.us/${countryCode.toLowerCase()}/${zipCode}`;
};
