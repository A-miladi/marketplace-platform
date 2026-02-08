export const formatDateToYYYYMMDD = (date: Date | null | undefined): string | null => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) return null;
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };