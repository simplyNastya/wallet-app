import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import TextField from '../../shared/Component/textField/textField';
import fields from '../../shared/Component/textField/fields';
import { ButtonCurrent } from '../../shared/Component/ButtonFrom/ButtonFrom';
import { ButtonConversion } from '../../shared/Component/ButtonFrom/ButtonFrom';
import { Logo } from '../../shared/Component/LogoForm/logoForm';

import { getError } from '../../redux/auth/auth-selectors';
import { login } from '../../redux/auth/auth-operations';

import { MdEmail } from 'react-icons/md';
import { AiFillLock } from 'react-icons/ai';

import Style from '../../components/RegistrationForm/RegistrationForm.module.scss';

const LoginForm = () => {
  const [stateLogin, setSateLogin] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const hendleChange = e => {
    const { name, value } = e.target;
    setSateLogin(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const hendleSubmit = e => {
    e.preventDefault();
    dispatch(login(stateLogin));
    setSateLogin({ email: '', password: '' });
  };
  return (
    <>
      <Logo />
      {error && <p className={Style.errorText}>{error}</p>}
      <form className={Style.RegisterForm} onSubmit={hendleSubmit}>
        <TextField
          icon={<MdEmail className={Style.Icons} />}
          {...fields.email}
          value={stateLogin.email}
          onChange={hendleChange}
        />
        <TextField
          icon={<AiFillLock className={Style.Icons} />}
          {...fields.password}
          value={stateLogin.password}
          onChange={hendleChange}
        />

        <ButtonCurrent name={'LOG IN'} />
      </form>
      <NavLink to="/register">
        <ButtonConversion name={'REGISTER'} />
      </NavLink>
    </>
  );
};
export default LoginForm;
