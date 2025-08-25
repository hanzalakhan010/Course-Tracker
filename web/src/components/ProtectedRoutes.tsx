import { useSelector } from "react-redux"
import { Navigate } from "react-router"
import type { Rootstate } from "@/app/store"
import type { JSX } from "react"

interface ProtectedRouteProps {
    children: JSX.Element
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const userId = useSelector((state: Rootstate) => state.Auth.user_id)

    if (!userId) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute
