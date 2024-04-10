///REACT
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

///COMPONENT
import { Logo } from '../../shared/Component/LogoForm/logoForm';
import { PaswordLineBar } from './PasswordVerification/PasswordLineBar';
import { register } from '../../redux/auth/auth-operations';
import { ButtonCurrent } from '../../shared/Component/ButtonFrom/ButtonFrom';
import { ButtonConversion } from '../../shared/Component/ButtonFrom/ButtonFrom';
import { initialState } from './Initial/initialState';
import TextField from '../../shared/Component/textField/textField';
import fields from '../../shared/Component/textField/fields';
import { getError } from '../../redux/auth/auth-selectors';

///ICON
import { MdEmail } from 'react-icons/md';
import { AiFillLock } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';

///STYLE
import Style from './RegistrationForm.module.scss';


const RegistrationForm = () => {
  const [stateRegistr, setStateRegistr] = useState(initialState);
  const [dublicat, setDublicat] = useState(false);

  const [passwordLength, setPasswordLength] = useState(false);

  const dispatch = useDispatch();
  const error = useSelector(getError);

  const hendleChange = e => {
    const { name, value } = e.target;
    setStateRegistr(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const hendlSubmit = e => {
    
    setPasswordLength(false);
    setDublicat(false);
    e.preventDefault();
    if (stateRegistr.password !== stateRegistr.confirmPassword) {
      setDublicat(prevState => !prevState);
      return;
    } else if (stateRegistr.password.length < 5) {
      setPasswordLength(prevState => !prevState);
      return;
    } else {
      const payload = {
        username: stateRegistr.username,
        email: stateRegistr.email,
        password: stateRegistr.password,
      };
      dispatch(register(payload));
      setStateRegistr(initialState);
    }
  };

  return (
    <>
      <Logo />
      {passwordLength && (
        <p className={Style.errorText}>Password must be 5 or more characters</p>
      )}
      {error && !dublicat && !passwordLength && <p className={Style.errorText}>{error}</p>}
      {dublicat && <p className={Style.errorText}>Enter the same password</p>}
      <form className={Style.RegisterForm} onSubmit={hendlSubmit}>
        <TextField
          icon={<MdEmail className={Style.Icons} />}
          value={stateRegistr.email}
          onChange={hendleChange}
          {...fields.email}
        />

        <TextField
          icon={<AiFillLock className={Style.Icons} />}
          value={stateRegistr.password}
          onChange={hendleChange}
          {...fields.password}
        />
        <div className={Style.containerPasswordBar}>
          <TextField
            icon={<AiFillLock className={Style.Icons} />}
            value={stateRegistr.confirmPassword}
            onChange={hendleChange}
            {...fields.confirmPassword}
          />
          <PaswordLineBar stateRegistr={stateRegistr} />
        </div>
        <TextField
          icon={<FaUser className={Style.Icons} />}
          value={stateRegistr.username}
          onChange={hendleChange}
          {...fields.username}
        />

        <ButtonCurrent name={`REGISTER`} />
      </form>
      <NavLink to="/">
        <ButtonConversion name={`LOG IN`} />
      </NavLink>
    </>
  );
};
export default RegistrationForm;
