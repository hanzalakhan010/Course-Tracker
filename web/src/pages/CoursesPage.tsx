import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type Rootstate, type AppDispatch } from "@/app/store";
import { fetchCourses } from "@/features/Courses";

export const CoursesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { courses, loading, error } = useSelector((state: Rootstate) => state.Courses);

    // Fetch courses on mount
    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <p>Loading courses...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-full text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">My Courses</h1>
            {courses.length === 0 ? (
                <p>No courses available. Enroll in some to get started!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                        >
                            <h2 className="text-xl font-bold mb-2">{course.name}</h2>
                            <p className="text-sm text-gray-600 mb-2">{course.code}</p>
                            <p className="text-xs text-gray-500">
                                Resources: {course.resources?.length || 0}
                            </p>
                            <p className="text-xs text-gray-500">
                                Lectures: {course.lectures?.length || 0}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
