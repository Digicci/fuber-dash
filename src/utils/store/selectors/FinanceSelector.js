export const getFinance = (state) => state.finance;

export const getFinanceLoading = (state) => state.finance.loading;

export const getFinanceCompanies = (state) => state.finance.companies;

/*export const getFinanceCompaniesFilters = (start,end) => (state) => state.finance.companies.reduce((acc,companie) => {
  return [
    ...acc,
    {
      ...companie,
      courses: companie.courses.filter(c => c.createdAt > start && c.createdAt < end),
      employes: companie.employes.map(e => {
        return {
          ...e,
          courses: e.courses.filter(c => c.createdAt > start && c.createdAt < end)
        }
      })
    }
  ]
}) */


export const getFinanceCompaniesFilters = (start, end, period) => (state) => {
  const companies = state.finance.companies ?? [];

  if (period === "all") {
    return companies;
  }

  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  return companies
    .map((company) => {
      const courses = (company.courses ?? []).filter((course) => {
        const dateValue =
          course.createdAt ||
          course.updatedAt ||
          course.date ||
          course.created_at;

        if (!dateValue) {
          console.log("course sans date:", course);
          return false;
        }

        const courseTime = new Date(dateValue).getTime();

        console.log({
          dateValue,
          courseTime,
          startTime,
          endTime,
          isValid: courseTime >= startTime && courseTime <= endTime,
        });

        return courseTime >= startTime && courseTime <= endTime;
      });

      return {
        ...company,
        courses,
      };
    })
    .filter((company) => company.courses.length > 0);
};