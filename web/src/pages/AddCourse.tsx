// src/pages/AddCoursePage.tsx
import { type AppDispatch } from "@/app/store";
import { addCourse } from "@/features/Courses";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const AddCoursePage = () => {
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const dispatch = useDispatch<AppDispatch>()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !code.trim()) {
            alert("Course title and code cannot be empty!");
            return;
        }

        dispatch(addCourse({ title, code }))
        // clear inputs after submit
        setTitle("");
        setCode("");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
                    Add a New Course
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Course Title */}
                    <div>
                        <label
                            htmlFor="course-title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Course Title
                        </label>
                        <input
                            id="course-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter course title..."
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    {/* Course Code */}
                    <div>
                        <label
                            htmlFor="course-code"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Course Code
                        </label>
                        <input
                            id="course-code"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter course code..."
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white transition hover:bg-indigo-700"
                    >
                        Add Course
                    </button>
                </form>
            </div>
        </div>
    );
};
