import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { Header } from 'components/Header/Header';
import Navigation from 'components/Navigation/Navigation';
import { Balance } from 'components/Balance/Balance';
import { Currency } from '../../components/Currency/Currency';
import { TransactionsList } from '../../components/TransactionsList/TransactionsList';
import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';
import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction';

import globalSelectors from '../../redux/modal/modal-selectors';

import css from './DashboardPage.module.scss';

const DashboardPage = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const showModal = useSelector(globalSelectors.getIsModalAddTransaction);
  return (
    <>
      <Header />
      <main className={css.section}>
        <div className={css.container}>
          <div className={css.commonWrapper}>
            <div className={css.wrapper}>
              <div>
                <Navigation />
                <Balance />
              </div>

              {!isDesktopOrLaptop && (
                <div className={css.val}>
                  <Currency />
                </div>
              )}
            </div>

            <div className={css.tab}>
              <TransactionsList />
            </div>
            <ButtonAddTransactions />
          </div>
        </div>
        {showModal && <ModalAddTransaction />}
      </main>
    </>
  );
};

export default DashboardPage
