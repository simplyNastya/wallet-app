import Style from "./ButtonForm.module.scss"
export const ButtonCurrent = ({name}) => {

    return (
    <button type="submit" className={Style.btnRegister}>
           {name}
        </button>
        )
}
export const ButtonConversion = ({name}) => {

    return (
    <button className={Style.btnLogin}>
          {name}
        </button>
        )
}