import { useSelector } from 'react-redux'; 
import financeSelectors from "../../redux/finances/financial-selectors"

import styles from '../Balance/Balance.module.scss';

export const Balance = () => {
    const totalBalance = useSelector(financeSelectors.getBalance);


  return (
    <div className={styles.balance}>
      <p className={styles.title}>Your balance</p>
      <p className={styles.sum}>
        <span>&#8372;</span> {totalBalance}
      </p>
    </div>
  );
};
