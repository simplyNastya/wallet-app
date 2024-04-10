import { Header } from 'components/Header/Header';
import { Currency } from '../../components/Currency/Currency';
import Navigation from 'components/Navigation/Navigation';

import registrationImg from '../../assets/images/registration-img.png';
import styled from '../CurrencyPage/CurrencyPage.module.scss';

const CurrencyPage = () => {
  return (
    <>
      <Header />
      <main className={styled.section}>
        <div className={styled.container}>
          <div className={styled.commonWrapper}>
            <div className={styled.wrapper}>
              <Navigation />
              <div className={styled.val}>
                <Currency />
              </div>
              <img src={registrationImg} alt="girl" className={styled.img} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default CurrencyPage;
