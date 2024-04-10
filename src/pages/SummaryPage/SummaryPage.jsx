import { useSelector } from 'react-redux';
import { Header } from 'components/Header/Header';
import Navigation from 'components/Navigation/Navigation';
import { Balance } from 'components/Balance/Balance';
import { Currency } from '../../components/Currency/Currency';

import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction';
import globalSelectors from '../../redux/modal/modal-selectors';
import DiagramTab from 'components/DiagramTab/DiagramTab';

import css from './SummaryPage.module.scss';

const SummaryPage = () => {
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
                {window.innerWidth > 767 ? <Balance /> : null }
              </div>

              <div className={css.val}>
                <Currency />
              </div>
            </div>
            <DiagramTab />
            {/* <ButtonAddTransactions/> */}
          </div>
        </div>
        {showModal && <ModalAddTransaction />}
      </main>
    </>
  );
};
export default SummaryPage
