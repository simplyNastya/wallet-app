import { getPasswordStrength } from './passwordComplexity';
import './passwordBar.scss';
export const PaswordLineBar = ({stateRegistr}) => {
return (<div className='PasswordBar'>
            {stateRegistr.password && (
              <div
                className={`${getPasswordStrength(stateRegistr.password)} 'bar' `}
              ></div>
            )}
          </div>)
}