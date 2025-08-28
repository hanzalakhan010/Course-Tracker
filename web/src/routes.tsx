import { Layout } from "@/components/ui/Layout"
import { createRoutesFromElements, Route } from "react-router"

// Pages
import LoginPage from "@/pages/Login"
import SignUpPage from "./pages/Signup"
import ProtectedRoute from "./components/ProtectedRoutes"
import { CoursesPage } from "./pages/CoursesPage"
// import SignupPage from "@/pages/Signup"
// import CoursesPage from "@/pages/Courses"
// import TodosPage from "@/pages/Todos"

export const routes = createRoutesFromElements(
    <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />

        {/* Protected Routes */}
        <Route
            path=""
            element={
                <ProtectedRoute>
                    <CoursesPage />
                </ProtectedRoute>
            }
        />
        {/*
        <Route
            path="todos"
            element={
                <ProtectedRoute>
                    <TodosPage />
                </ProtectedRoute>
            }
        /> */}
    </Route>
)
