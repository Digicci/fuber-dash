export const getFinance = (state) => state.finance;

export const getFinanceCompaniesFilters =
  (start, end, period) =>
    (state) => {
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

            if (!dateValue) return false;

            const courseTime = new Date(dateValue).getTime();

            return courseTime >= startTime && courseTime <= endTime;
          });

          const totalRevenue =
            courses.reduce((acc, cur) => acc + Number(cur.total ?? 0), 0) / 100;

          const siteRevenue =
            courses.reduce((acc, cur) => acc + Number(cur.commissionPrice ?? 0), 0) / 100;

          return {
            ...company,
            courses,
            racesCount: courses.length,
            totalRevenue,
            siteRevenue,
            totalReversed: totalRevenue - siteRevenue,
          };
        })
        .filter((company) => company.courses.length > 0);
    };