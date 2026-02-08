import { IFilters } from "@/types/general";

export const buildAdvertisementUrl = (
  filters: IFilters,
  basePath: string = "/advertisement",
  existingParams?: URLSearchParams,
) => {
  const params = existingParams
    ? new URLSearchParams(existingParams.toString())
    : new URLSearchParams();

  // Add sort if exists
  if (filters.sort) {
    params.set("sort", filters.sort);
  }

  // Add category if exists
  if (filters.category_ids) {
    params.set(
      "category_ids",
      Array.isArray(filters.category_ids)
        ? filters.category_ids.join(",")
        : filters.category_ids,
    );
  }

  // Add date range if exists
  if (filters.date_from) {
    const date = new Date(filters.date_from);
    if (!isNaN(date.getTime())) {
      params.set("date_from", date.toISOString().split("T")[0]);
    }
  }
  if (filters.date_to) {
    const date = new Date(filters.date_to);
    if (!isNaN(date.getTime())) {
      params.set("date_to", date.toISOString().split("T")[0]);
    }
  }

  // Add price range if exists
  if (filters.price_min) {
    params.set("price_min", filters.price_min.toString());
  }
  if (filters.price_max) {
    params.set("price_max", filters.price_max.toString());
  }

  // Add properties if exists
  if (filters.properties) {
    params.set("properties", JSON.stringify(filters.properties));
  }

  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
};

export const parseAdvertisementUrl = (
  searchParams: URLSearchParams,
): Partial<IFilters> => {
  const filters: Partial<IFilters> = {};

  // Parse sort
  const sort = searchParams.get("sort");
  if (sort) {
    filters.sort = sort;
  }

  // Parse category
  const categoryId = searchParams.get("category_id");
  if (categoryId) {
    filters.category_ids = categoryId;
  }

  // Parse date range
  const dateFrom = searchParams.get("date_from");
  if (dateFrom) {
    filters.date_from = new Date(dateFrom);
  }
  const dateTo = searchParams.get("date_to");
  if (dateTo) {
    filters.date_to = new Date(dateTo);
  }

  // Parse price range
  const priceMin = searchParams.get("price_min");
  if (priceMin) {
    filters.price_min = Number(priceMin);
  }
  const priceMax = searchParams.get("price_max");
  if (priceMax) {
    filters.price_max = Number(priceMax);
  }

  // Parse properties
  const properties = searchParams.get("properties");
  if (properties) {
    try {
      const parsedProperties = JSON.parse(properties);
      filters.properties = parsedProperties;
    } catch (e) {
      console.error("Error parsing properties from URL:", e);
    }
  }

  return filters;
};
