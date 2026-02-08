export const jsonToForm = (data: Record<string, unknown>): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (key === "images") {
        // Append all images under the same key without indexing
        value.forEach((item) => {
          if (item instanceof File) {
            formData.append(`${key}`, item);
          }
        });
      } else {
        value.forEach((item) => {
          formData.append(key, String(item));
        });
      }
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
};
