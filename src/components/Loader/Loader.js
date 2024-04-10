import { RotatingLines } from "react-loader-spinner";

import styles from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.loader}>
            <RotatingLines
                strokeColor="#24CCA7"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
  );
}

export default Loader;