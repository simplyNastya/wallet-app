import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Select from '../SelectOptions/SelectOptions';
import financesSelector from '../../redux/finances/financial-selectors';
import { getSummary } from 'redux/finances/finances-operations';

import scss from './Table.module.scss';

const Table = ({
  data,
  monthForState,
  setMonthForState,
  yearForState,
  setYearForState,
  show,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSummary());
  }, [dispatch]);


  const { arrayCategoriesSummary, newExpenseSummary, newIncomeSummary } = data;

  const periodForSelects = useSelector(financesSelector.getPeriodForStatistic);

  return (
    <div className={scss.expenses__wrapper}>
      <div className={scss.select__wrapper}>
        <Select
          className={scss.year}
          options={periodForSelects.months}
          selected={monthForState}
          setSelected={setMonthForState}
          positioncss
          key={'1'}
        />
        <Select
          options={periodForSelects.years}
          selected={yearForState}
          setSelected={setYearForState}
          key={'2'}
        />
      </div>

      <div className={scss.table__wrapper}>
        <div className={scss.table__title}>
          <span>Category</span>
          <span>Amount</span>
        </div>
        <div className={scss.tableScrollBox}>
          <ul className={scss.table__list}>
            {arrayCategoriesSummary?.map(category => {
              return (
                <li key={category.name} className={scss.table__item}>
                  <div
                    style={{

                      backgroundColor: `${category.backgroundColor}`,
                    }}
                    className={scss.table__color}
                  ></div>
                  <div className={scss.table__name}>{category.name}</div>
                  <div className={scss.table__total}>{category.total}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <ul className={scss.table__foot}>
        <li className={scss.table__bottom}>
          <span className={scss.first}>Expenses:</span>
          <span className={scss.second__expense}>{newExpenseSummary}</span>
        </li>
        <li className={scss.table__bottom}>
          <span className={scss.first}>Incomes:</span>
          <span className={scss.second__income}>{newIncomeSummary}</span>
        </li>
      </ul>
    </div>
  );
};

export default Table;
