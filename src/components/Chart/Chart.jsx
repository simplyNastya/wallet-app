import React from 'react';
import { useSelector } from 'react-redux';
import financeSelectors from '../../redux/finances/financial-selectors';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import scss from './Chart.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);
 
const dataNull = {
  labels: [],
  datasets: [
    {
      label: '# of Votes',
      data: [0.001],
      backgroundColor: ['#ff6596'],
      hoverOffset: 0,
      borderColor: [],
      borderWidth: 0,
    },
  ],
};

const Chart = ({ data, expenseSummaryChart, show }) => {
  const totalBalance = useSelector(financeSelectors.getBalance);
  const isLoading = useSelector(financeSelectors.getLoading);
  return (
    <div className={scss.wrapper__chart}>
      <h2 className={scss.title}>Statistics</h2>

      {show ? (
        <div className={scss.wrapper__doughnut}>
          {!isLoading && (
            <>
              <Doughnut
                data={data}
                options={{
                  maintainAspectRatio: false,
                  cutoutPercentage: 90,
                  plugins: {
                    legend: { display: false },
                  },
                }}
              />
              <div className={scss.balance__wrapper}>
                <span className={scss.symbol}>&#8372;</span>
                {totalBalance}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={scss.wrapper__doughnut}>
          {!isLoading && (
            <>
              <Doughnut
                data={dataNull}
                options={{
                  maintainAspectRatio: false,
                  cutoutPercentage: 90,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      enabled: false,
                    },
                  },
                }}
              />
              <div className={scss.balance__wrapper}>
                <span className={scss.symbol}>&#8372;</span>
                {totalBalance}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default Chart;
