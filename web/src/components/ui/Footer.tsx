import { LinkedinIcon, TwitterIcon, GithubIcon } from 'lucide-react'

const socialLinks = [
  { name: 'LinkedIn', link: '/', icon: <LinkedinIcon size={20} /> },
  { name: 'Twitter', link: '/', icon: <TwitterIcon size={20} /> },
  { name: 'GitHub', link: '/', icon: <GithubIcon size={20} /> },
]

const Footer = () => {
  return (
    <footer className="bg-[#191F33] text-white">
      <div className="flex flex-col items-center px-4 py-3">
        {/* Logo + App name */}
        <a href="/" className="mb-4 flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/dyvkdwzcj/image/upload/v1709055594/logo-1_vo1dni.png"
            className="h-8"
            alt="Logo"
          />
          <span className="text-2xl font-semibold">CourseTracker ++</span>
        </a>

        {/* Social links */}
        <ul className="mb-4 flex items-center gap-10">
          {socialLinks.map(({ name, icon, link }) => (
            <li key={name}>
              <a
                href={link}
                title={name}
                className="text-gray-300 hover:text-white transition"
                target="_blank"
              >
                {icon}
              </a>
              <span className="sr-only">{name}</span>
            </li>
          ))}
        </ul>

        {/* Copyright */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} CourseTracker ++ . Built with ❤️ in Karachi.
        </p>
      </div>
    </footer>
  )
}

export default Footer
