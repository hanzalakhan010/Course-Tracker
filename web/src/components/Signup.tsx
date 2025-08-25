import Button from '@/components//ui/Button'
import DummyLogo from '@/components/Logo'
import Input from '@/components/ui/Input'
import { LoaderCircle, Lock, Mail, User } from 'lucide-react'
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { Link } from 'react-router'
import { signupUser } from '@/features/Auth'
import { type Rootstate, type AppDispatch } from '@/app/store'
import { useDispatch, useSelector, } from 'react-redux'

function Signup() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: Rootstate) => state.Auth);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })


    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        setErrors({ ...errors, [name]: '' })
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault()

        let newErrors = { name: '', email: '', password: '', confirmPassword: '' }

        if (!user.name.trim()) {
            newErrors.name = 'Name is required.'
        }
        if (!user.email.trim()) {
            newErrors.email = 'Please enter a valid email.'
        }
        if (!user.password.trim()) {
            newErrors.password = 'Password cannot be empty.'
        }
        if (user.password !== user.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.'
        }

        if (newErrors.name || newErrors.email || newErrors.password || newErrors.confirmPassword) {
            setErrors(newErrors)
            return
        }


        // Mimic API request
        // setTimeout(() => {
        //     setShowLoader(false)
        //     console.log('Signup successful:', user)
        //     alert('Signup successful! Please login.')
        // }, 2000)
        dispatch(signupUser({ ...user }))
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
                <DummyLogo />
                <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">
                    Create your Course Tracker ++ account
                </h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        label="Name"
                        name="name"
                        placeholder="Enter your name"
                        value={user.name}
                        onChange={handleChange}
                        error={errors.name}
                        icon={<User size={20} />}
                    />
                    <Input
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="Enter your email"
                        value={user.email}
                        onChange={handleChange}
                        error={errors.email}
                        icon={<Mail size={20} />}
                    />
                    <Input
                        type="password"
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        value={user.password}
                        onChange={handleChange}
                        error={errors.password}
                        icon={<Lock size={20} />}
                    />
                    <Input
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        placeholder="Re-enter your password"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        icon={<Lock size={20} />}
                    />

                    <Button
                        className="mt-2 h-10 w-full bg-neutral-800 hover:bg-neutral-700"
                        disabled={loading}
                        loading={loading}
                        type="submit"
                    >
                        {loading ? <LoaderCircle className="animate-spin" color="#fff" /> : 'Sign up'}
                    </Button>
                    {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

                </form>

                {/* Login link */}
                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">Already have an account? </span>
                    <Link
                        to="/login"
                        className="text-sm font-medium text-blue-600 hover:underline"
                    >
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
