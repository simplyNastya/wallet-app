import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth} from "redux/auth/auth-selectors";
import { getCategories } from "redux/finances/finances-operations";
import { current } from "../../redux/auth/auth-operations";

const AuthLayout = ({children}) => {
    const dispatch = useDispatch();
    const {token} = useSelector(getAuth);

    useEffect(()=> {
        if(token !== ''){
            dispatch(getCategories())
        }
        
    }, [dispatch,token])

    useEffect(()=> {
        dispatch(current())
    }, [dispatch])

    return children;
}

export default AuthLayout;