import { useState, useEffect, useCallback } from 'react';
import { currencyFetch } from 'shared/Api/fetchСurrency';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Circles } from 'react-loader-spinner';
import { nanoid } from '@reduxjs/toolkit';

import scss from '../Currency/Currency.module.scss';

export const Currency = () => {
  const [request, setRequest] = useLocalStorage('data', {
    currency: [],
    time: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const correctData = data => {
    const filteredData = data.filter(
      item =>
        (item.currencyCodeA === 840 && item.currencyCodeB === 980) ||
        (item.currencyCodeA === 978 && item.currencyCodeB === 980)
    );
    return filteredData;
  };

  const lazyRequest = useCallback(() => {
    const time = new Date(Date.now() - request.time);
    return time / (1000 * 60);
  }, [request.time]);

  useEffect(() => {
    async function getCurrency() {
      try {
        if (lazyRequest() < 60) {
          return;
        }

        const { data } = await currencyFetch();
        const normalData = correctData(data);
        setRequest({ currency: normalData, time: Date.now() });
        setLoading(true);
        setError(null);
      } catch (error) {
        setError('Currency exchange is not available, please try again later');
      } finally {
        setLoading(false);
      }
    }
    getCurrency();
  }, [setRequest, lazyRequest]);

  return (
    <div className={scss.wrapper}>
      {loading ? (
        <div className={scss.loader}>
          <Circles color="4A56E2" height={50} width={50} />
        </div>
      ) : null}
      {!error && !loading ? (
        <>
          <div className={scss.head}>
            <p className={scss.header}>Currency</p>
            <p className={scss.header}>Purchase</p>
            <p className={scss.header}>Sale</p>
          </div>
          <ul className={scss.list}>
            {request.currency?.map(({ currencyCodeA, rateSell, rateBuy }) => (
              <li key={nanoid()} className={scss.item}>
                <span className={scss.Data}>
                  {currencyCodeA === 840 ? 'USD' : 'EUR'}
                </span>
                <span className={scss.Data}>{rateSell.toFixed(2)}</span>
                <span className={scss.Data}> {rateBuy.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className={scss.error}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};
