interface QueryParams {
  [key: string]: string | number | boolean | undefined | null;
}

/**
 * Builds a query string from an object of parameters
 * @param params Object containing query parameters
 * @param options Configuration options
 * @param options.includeEmptyValues Whether to include empty values in the query string (default: false)
 * @param options.minSearchLength Minimum length for search parameters to be included (default: 2)
 * @returns Query string without the leading '?'
 */
export const buildQueryString = (
  params: QueryParams,
  options: {
    includeEmptyValues?: boolean;
    minSearchLength?: number;
  } = {},
): string => {
  const { includeEmptyValues = false, minSearchLength = 2 } = options;
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // Special handling for search parameters
    if (
      key === "search" &&
      typeof value === "string" &&
      value.length < minSearchLength
    )
      return;

    // Convert value to string
    const stringValue = String(value);

    // Skip empty values unless includeEmptyValues is true
    if (!includeEmptyValues && stringValue === "") return;

    searchParams.append(key, stringValue);
  });

  return searchParams.toString();
};
