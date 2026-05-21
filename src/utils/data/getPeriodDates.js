export const getPeriodDates = (period) => {
  const now = new Date();
  let start = new Date(now);
  let end = new Date(now);

  switch (period) {
    case "current_month":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      break;

    case "current_week": {
      const day = now.getDay() || 7;
      start = new Date(now);
      start.setDate(now.getDate() - day + 1);
      break;
    }

    case "last_7_days":
      start = new Date(now);
      start.setDate(now.getDate() - 7);
      break;

    case "six_months":
      start = new Date(now);
      start.setMonth(now.getMonth() - 6);
      break;

    case "one_year":
      start = new Date(now);
      start.setFullYear(now.getFullYear() - 1);
      break;

    case "all":
      start = new Date(0);
      break;

    default:
      start = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
};