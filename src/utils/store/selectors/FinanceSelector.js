export const getFinance = (state) => state.finance;

export const getFinanceLoading = (state) => state.finance.loading;

export const getFinanceCompanies = (state) => state.finance.companies;

export const getFinanceCompaniesFilters = (start,end) => (state) => state.finance.companies.reduce((acc,companie) => {
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
})