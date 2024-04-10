import normalizedSate from 'servises/normalizedState';
import { allMonths } from 'assets/const';


export const getTotalBalance = state => state.finance.totalBalance;
export const getTransactionsData = state => state.finance.data;
const getCategories = state => state.finance.categories;
const getSummary = state => state.finance.summary;
const getError = state => state.finance.error;
const getLoading = state => state.finance.loading;

export const getBalance = state => normalizedSate(getTotalBalance(state));

const getFilteredData = state => {
  const sortedData = getTransactionsData(state)
  ?.map(data => ({
    ...data,
    transactionDate: new Date(data.transactionDate),
  }))
  .sort((a, b) => b.transactionDate - a.transactionDate);

  const categories = getCategories(state)?.reduce((acc, cur) => {
    return { ...acc, [cur.id]: cur.name };
  }, {});
  
  return normalizeData(sortedData, categories);
};

function normalizeData(data, categories) {
  return data?.map(data => {
    const day = data.transactionDate.getDate().toString().padStart(2, '0');
    const month = (data.transactionDate.getMonth() + 1)
    .toString()
    .padStart(2, '0');
    const year = data.transactionDate.getFullYear();
    const amount = data.amount < 0 ? -data.amount : data.amount;
    const updatedData = {
      ...data,
      transactionDate: `${day}.${month}.${year}`,
      amount: normalizedSate(amount),
      balanceAfter: normalizedSate(data.balanceAfter),
    };
    return categories
    ? {
      ...updatedData,
      category: categories[data.categoryId],
    }
    : updatedData;
  });
}

const getPeriodForStatistic = state => {
  const uniqueYears =
  getTransactionsData(state)
  ?.map(obj => obj.transactionDate?.slice(0, 4))
  .reduce(
    (acc, year) => (!acc.includes(year) ? [...acc, year] : acc),
    []
    ) || [];
    const sortYears = uniqueYears
    ?.map(string => Number(string))
    ?.sort((a, b) => a - b);
    const period = { months: allMonths, years: sortYears };
    return period;
  };
  
  const getAllTransactionsForStat = state => {
    const categoryNew = getCategories(state);
    const objectSummary = getSummary(state) || {};
    const { categoriesSummary, expenseSummary, incomeSummary } = objectSummary;
    const newExpenseSummary = String(normalizedSate(expenseSummary * -1));
    const newIncomeSummary = normalizedSate(incomeSummary);
    const arrayCategoriesSummary = categoriesSummary
    ?.filter(category => category.type === 'EXPENSE')
    .map(category => {
      const color = categoryNew?.find(
        object => object.name === category.name
        ).backgroundColor;
        const number = normalizedSate(category.total * -1);
        const object = {
          ...category,
          total: String(number),
          backgroundColor: color,
        };
        return object;
      });
      return {
        arrayCategoriesSummary,
        newExpenseSummary,
        newIncomeSummary,
      };
    };
    
    const getDataAllSummaryForChart = state => {
      const dataAllSummaryForChart = {
        labels: [],
        datasets: [
          {
            label: '# of Votes',
            data: [],
            backgroundColor: [],
            hoverOffset: 0,
            borderColor: [],
            borderWidth: 0,
          },
        ],
      };
      const categoryNew = getCategories(state);
      const objectSummary = getSummary(state) || {};
      
      const { categoriesSummary } = objectSummary;
      categoriesSummary
      ?.filter(category => category.type === 'EXPENSE')
      .forEach(category => {
        const color = categoryNew?.find(
          object => object.name === category.name
          ).backgroundColor;
          const number = category.total * -1;
          dataAllSummaryForChart.labels.push(category.name);
          dataAllSummaryForChart.datasets[0].backgroundColor.push(color);
          dataAllSummaryForChart.datasets[0].data.push(number);
        });
        return dataAllSummaryForChart;
      };
      
      const financeSelectors = {
        getPeriodForStatistic,
        getAllTransactionsForStat,
        getDataAllSummaryForChart,
        getTotalBalance,
        getBalance,
        getTransactionsData,
        getCategories,
        getFilteredData,
        getSummary,
        getError,
        getLoading,
      };
      
      export default financeSelectors;