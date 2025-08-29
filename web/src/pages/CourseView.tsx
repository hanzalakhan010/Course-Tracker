import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type Rootstate } from "@/app/store";
import { fetchCourseById, clearCourse } from "@/features/courseSlice";

const CourseView = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { course, loading, error } = useSelector(
        (state: Rootstate) => state.Course
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchCourseById(id));
        }

        // cleanup: clear course when leaving page
        return () => {
            dispatch(clearCourse());
        };
    }, [id, dispatch]);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!course) return <p>No course found</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-700 mb-6">{course.description}</p>

            <h2 className="text-xl font-semibold">Lectures</h2>
            <ul className="list-disc list-inside mb-6">
                {course?.lectures?.map((lec) => (
                    <li key={lec._id}>{lec.title}</li>
                ))}
            </ul>

            <h2 className="text-xl font-semibold">Resources</h2>
            <ul className="list-disc list-inside">
                {course?.resources?.map((res) => (
                    <li key={res._id}>{res.name}</li>
                ))}
            </ul>
        </div>
    );
};
export default CourseView;