import Button from '@/components/ui/Button'
import DummyLogo from '@/components/Logo'
import Input from '@/components/ui/Input'
import { LoaderCircle, Lock, Mail } from 'lucide-react'
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { Link } from 'react-router'
import { loginUser } from '@/features/Auth'
import { type Rootstate, type AppDispatch } from '@/app/store'
import { useDispatch, useSelector, } from 'react-redux'

function Login() {
    const [user, setUser] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({ email: '', password: '' })
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: Rootstate) => state.Auth);
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        setErrors({ ...errors, [name]: '' })
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault()

        let newErrors = { email: '', password: '' }

        if (!user.email.trim()) {
            newErrors.email = 'Please enter a valid email.'
        }

        if (!user.password.trim()) {
            newErrors.password = 'Password cannot be empty.'
        }

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors)
            return
        }

        dispatch(loginUser({ ...user }))
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
                <DummyLogo />
                <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">Login to Course Tracker ++</h2>
                <form onSubmit={handleSubmit} className="">
                    <Input
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="Please enter your email"
                        value={user.email}
                        onChange={handleChange}
                        error={errors.email}
                        icon={<Mail size={20} />}
                    />
                    <div>
                        <Input
                            type="password"
                            label="Password"
                            name="password"
                            placeholder="Please enter your password"
                            value={user.password}
                            onChange={handleChange}
                            error={errors.password}
                            icon={<Lock size={20} />}
                        />
                        {/* Forgot Password Link */}
                        <div className="mb-4 text-right">
                            <a href="javascript:void(0)" className="text-sm text-blue-600 hover:underline">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    <Button
                        className="h-10 w-full bg-neutral-800 hover:bg-neutral-700"
                        disabled={loading}
                        loading={loading}
                        type="submit"
                    >
                        {loading ? <LoaderCircle className="animate-spin" color="#fff" /> : 'Sign in'}
                    </Button>
                    {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

                </form>
                {/* Sign-up Link */}
                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">New here? </span>
                    <Link
                        to="/signup"
                        className="text-sm font-medium text-blue-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login