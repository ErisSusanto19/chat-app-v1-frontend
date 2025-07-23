import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


const PublicRoute = ({children}) => {
    const tokenFromState = useSelector(state => state.auth.accessToken)
    const tokenFromLocalStorage = localStorage.getItem("accessToken")

    // if(tokenFromState && tokenFromLocalStorage){
    //     return <Navigate to="/" replace/>
    // }
    if(tokenFromLocalStorage){ //sementara pakai localStorage dulu
        return <Navigate to="/" replace/>
    }

    return children
}

export default PublicRoute