import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import Chart from 'components/Chart/Chart';
import Table from 'components/Table/Table';

import financesSelector from '../../redux/finances/financial-selectors';
import { getSummary } from '../../redux/finances/finances-operations';
import { current } from '../../redux/auth/auth-operations';

import { allMonths } from '../../assets/const';

import scss from './DiagramTab.module.scss';

const DiagramTab = () => {
  const [monthForState, setMonthForState] = useState('Month');
  const [yearForState, setYearForState] = useState('Year');
  const [period, setPeriod] = useState('');

  useEffect(() => {
    if (monthForState === 'Month' || yearForState === 'Year') {
      return;
    }
    const index = allMonths.findIndex(month => month === monthForState) + 1;
    if (new Date() < new Date(`${monthForState} ${yearForState}`)) {
      toast.error('Please select a past period');
      return;
    }
    setPeriod(`?month=${index}&year=${yearForState}`);
  }, [monthForState, yearForState]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSummary(period));
  }, [dispatch, period]);

  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  const dataAllSummaryForTabl = useSelector(
    financesSelector.getAllTransactionsForStat
  );

  const expenseSummaryChart = dataAllSummaryForTabl.newExpenseSummary;

  const dataAllSummaryForChart = useSelector(
    financesSelector.getDataAllSummaryForChart
  );

  const showChart = dataAllSummaryForChart?.datasets[0]?.data?.length ?? true;




  return (
    <>
      <section className={scss.section}>
      <h2 className={scss.title}>Statistics</h2>
        <div className={scss.wrapper}>
          <Chart
            data={dataAllSummaryForChart}
            expenseSummaryChart={expenseSummaryChart}
            show={showChart}
          />
          <Table
            data={dataAllSummaryForTabl}
            monthForState={monthForState}
            setMonthForState={setMonthForState}
            yearForState={yearForState}
            setYearForState={setYearForState}
            show={showChart}
          />
        </div>
      </section>
    </>
  );
};
export default DiagramTab;
