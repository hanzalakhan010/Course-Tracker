import { useSelector } from "react-redux"
import { Navigate } from "react-router"
import type { Rootstate } from "@/app/store"
import type { JSX } from "react"

interface ProtectedRouteProps {
    children: JSX.Element
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const user_email = useSelector((state: Rootstate) => state.Auth.user_email)
    console.log(user_email)
    if (!user_email) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute
