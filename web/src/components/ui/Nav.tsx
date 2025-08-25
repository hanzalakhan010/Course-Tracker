import type { Rootstate } from '../app/store'
import { CircleFadingPlus, MenuIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/features/Auth'

const publicNavLinks = [
  { title: 'Sign Up', link: '/signup' },
  { title: 'Login', link: '/login' },
]

const protectedNavLinks = [
  { title: 'All Courses', link: '/' },
  { title: 'My Notes', link: '/notes' },
  { title: 'Analytics', link: '/analytics' },
]

const Navbar = () => {
  const [showNav, setShowNav] = useState(false)
  const dispatch = useDispatch()
  const userId = useSelector((state: Rootstate) => state.Auth.user_id)

  const handleShowNav = () => {
    setShowNav(!showNav)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="relative z-20 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between bg-white px-2 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-10">
          {/* hamburger menu or cross icon */}
          <button
            onClick={handleShowNav}
            aria-label="Toggle Menu"
            className="md:hidden"
          >
            {showNav ? (
              <XIcon color="#202020" strokeWidth={3} size={25} />
            ) : (
              <MenuIcon color="#202020" strokeWidth={3} size={25} />
            )}
          </button>

          {/* logo */}
          <a href="/" className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/dyvkdwzcj/image/upload/v1709055594/logo-1_vo1dni.png"
              className="h-8"
              alt="Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-stone-900 md:text-2xl">
              CT++
            </span>
          </a>

          {/* nav links */}
          <div className={`${showNav ? "flex-col" : 'hidden flex-row'} w-full md:block md:w-auto`} id="navbar-default">

            {(userId ? protectedNavLinks : publicNavLinks).map(
              ({ title, link }, index) => (
                <a
                  key={index}
                  href={link}
                  className="rounded-md px-3 py-2 text-slate-500 transition-colors duration-100 ease-linear hover:bg-gray-700 hover:text-white"
                >
                  {title}
                </a>
              )
            )}
            {userId && (
              <button
                onClick={handleLogout}
                className="rounded-md px-3 py-2 text-red-500 transition-colors duration-100 ease-linear hover:bg-red-600 hover:text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
