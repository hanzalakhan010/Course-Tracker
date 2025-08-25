import { Outlet } from "react-router"
import Footer from "./Footer"
import Navbar from "./Nav"

export const Layout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>)
}
