import { defaultCountries, parseCountry } from "react-international-phone";

export const Countries = defaultCountries.filter((country) => {
  const { iso2 } = parseCountry(country);
  return ["us", "ua", "gb", "de", "fa", "ir", "en"].includes(iso2);
});
