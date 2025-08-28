import { Outlet } from "react-router"
import Footer from "./Footer"
import Navbar from "./Nav"
import { useDispatch } from "react-redux"
import { authUser } from "@/features/Auth"
import { useEffect } from "react"
import { type AppDispatch } from "@/app/store"
export const Layout = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(authUser())
    }, [])
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
