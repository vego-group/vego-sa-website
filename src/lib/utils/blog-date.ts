const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const displayDatePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;

const isValidDateParts = (year: number, month: number, day: number) => {
  const candidate = new Date(Date.UTC(year, month - 1, day));

  return (
    candidate.getUTCFullYear() === year &&
    candidate.getUTCMonth() === month - 1 &&
    candidate.getUTCDate() === day
  );
};

const formatBlogDateForDisplay = (value?: string | null) => {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return "";
  }

  if (displayDatePattern.test(normalizedValue)) {
    return normalizedValue;
  }

  if (!isoDatePattern.test(normalizedValue)) {
    return normalizedValue;
  }

  const [year, month, day] = normalizedValue.split("-");
  return `${day}/${month}/${year}`;
};

const normalizeBlogDateForApi = (value?: string | null) => {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return "";
  }

  if (isoDatePattern.test(normalizedValue)) {
    return normalizedValue;
  }

  const match = normalizedValue.match(displayDatePattern);
  if (!match) {
    return normalizedValue;
  }

  const [, day, month, year] = match;
  const dayNumber = Number(day);
  const monthNumber = Number(month);
  const yearNumber = Number(year);

  if (!isValidDateParts(yearNumber, monthNumber, dayNumber)) {
    return normalizedValue;
  }

  return `${year}-${month}-${day}`;
};

export { formatBlogDateForDisplay, normalizeBlogDateForApi };
