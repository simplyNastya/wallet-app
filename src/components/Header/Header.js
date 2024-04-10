import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';

import { Logo } from './Logo';
import { RxExit } from 'react-icons/rx';
import { IconContext } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import {getUser} from '../../redux/auth/auth-selectors'

import ModalLogout from '../ModalLogout/ModalLogout';
import { toggleModalLogout } from '../../redux/modal/modalSlice';
import  globalSelectors  from '../../redux/modal/modal-selectors';

import css from './Header.module.scss';

export const Header = () => {
  const {username} = useSelector(getUser)
  const modalOpen = useSelector(globalSelectors.getIsModalLogout);
  const dispatch = useDispatch();
  const isOpenModal = () => {
    dispatch(toggleModalLogout());
  };

  return (
    <header className={css.container}>
      <section className={css.header}>
        <Link to="/" className={css.link}>
          <Logo svg={css.link__logo} />
          <p className={css.link__title}>Wallet</p>
        </Link>
        <div className={css.wrapper}>
          <div className={css.user}>
            <IconContext.Provider
              value={{
                color: '#bdbdbd',
                className: 'global-class-name',
                size: '18px',
              }}
            >
              <div className={css.icon}>
                <FaUser
                  value={{
                    color: '#bdbdbd',
                    className: 'global-class-name',
                    size: '24px',
                  }}
                />
              </div>
              <span className={css.user__name}>{username}</span>
            </IconContext.Provider>
          </div>
          <IconContext.Provider
            value={{ className: 'global-class-name', size: '18px' }}
          >
            <button className={css.logout__button} type="button" onClick={isOpenModal}>
              <RxExit />
              <span className={css.logout__text}>Exit</span>
            </button>
          </IconContext.Provider>
        </div>
        {modalOpen && <ModalLogout />}
      </section>
    </header>
  );
};
