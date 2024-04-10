import loginImg from '../../assets/images/login-img.png';
import LoginForm from "../../components/LoginForm/LoginForm"

import styles from '../LoginPage/LoginPage.module.scss';

const LoginPage = () => {
 
  return (
    <>
      <section className={styles.section}>
        <div className="container">
          <div className={styles.commonWrapper}>
            <div className={styles.bigGroupWrapper}>
              <div className={styles.wrapper}>
                <img src={loginImg} alt="boy" className={styles.img} />
                <h2 className={styles.title}>Finance App</h2>
              </div>
            </div>
            <div className={styles.formWrapper}>
              <div className={styles.form}>
                <LoginForm/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default LoginPage
