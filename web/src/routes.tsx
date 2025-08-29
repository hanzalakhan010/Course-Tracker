import { Layout } from "@/components/ui/Layout"
import { createRoutesFromElements, Route } from "react-router"

// Pages
import LoginPage from "@/pages/Login"
import SignUpPage from "./pages/Signup"
import ProtectedRoute from "./components/ProtectedRoutes"
import { CoursesPage } from "./pages/CoursesPage"
import { AddCoursePage } from "./pages/AddCourse"
import RedirectIfAuth from "./components/RedirectIfAuth"
import NotFoundPage from "./pages/404"
import CourseView from "./pages/CourseView"
// import SignupPage from "@/pages/Signup"
// import CoursesPage from "@/pages/Courses"
// import TodosPage from "@/pages/Todos"

export const routes = createRoutesFromElements(
    <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={
            <RedirectIfAuth>
                <LoginPage />
            </RedirectIfAuth>
        } />
        <Route path="signup" element={
            <RedirectIfAuth>
                <SignUpPage />
            </RedirectIfAuth>
        } />

        {/* Protected Routes */}
        <Route
            path=""
            element={
                <ProtectedRoute>
                    <CoursesPage />
                </ProtectedRoute>
            }
        />
        <Route
            path="/addcourse"
            element={
                <ProtectedRoute>
                    <AddCoursePage />
                </ProtectedRoute>
            }
        />
        <Route
            path="/course/:id"
            element={
                <ProtectedRoute>
                    <CourseView />
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
        <Route path="*" element={<NotFoundPage />} />

    </Route>
)
