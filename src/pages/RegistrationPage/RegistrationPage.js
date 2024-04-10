import RegistrationForm from "../../components/RegistrationForm/RegistrationForm"

import registrationImg from '../../assets/images/registration-img.png'
import styles from './RegistrationPage.module.scss'

const RegistrationPage = () => {
    return (
        <>
            <section className={styles.section}>
                <div className='container'>
                    <div className={styles.commonWrapper}>
                        <div className={styles.bigGroupWrapper}>
                            <div className={styles.wrapper}>
                                <img src={registrationImg} alt='girl' className={styles.img} />
                                <h2 className={styles.title}>Finance App</h2>
                            </div>
                        </div>
                        <div className={styles.formWrapper}>
                            <div className={styles.form}>
                                 <RegistrationForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RegistrationPage;