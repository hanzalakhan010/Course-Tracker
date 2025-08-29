import { useSelector } from "react-redux"
import { Navigate } from "react-router"
import type { Rootstate } from "@/app/store"
import type { JSX } from "react"

interface RedirectIfAuthProps {
    children: JSX.Element
}

const RedirectIfAuth = ({ children }: RedirectIfAuthProps) => {
    const user_email = useSelector((state: Rootstate) => state.Auth.user_email)
    if (user_email) {
        return <Navigate to="/" replace />
    }

    return children
}

export default RedirectIfAuth
