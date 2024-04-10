import Style from "./text-field.module.scss";

const TextField = ({icon,label, ...props}) => {
    return (
        <div  className={Style.inputContainer}>
        <input {...props} />
        {icon}
        <label className={Style.label}>{label}</label>
        <div className={Style.underline}></div>
      </div>
    )
}

export default TextField;
