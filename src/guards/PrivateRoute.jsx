import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({children}) => {
    const tokenFromState = useSelector(state => state.auth.accessToken)
    const tokenFromLocalStorage = localStorage.getItem("accessToken")

    if(!tokenFromLocalStorage){//masih pakai localStorage
        return <Navigate to="/login" replace/>
    }

    return children
}

export default PrivateRoute