import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    const [visible, setVisible] = useState(true)
    const lastScrollY = useRef(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
                setVisible(false)
            } else {
                setVisible(true)
            }

            lastScrollY.current = currentScrollY
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const linkClasses = ({ isActive }) =>
        `px-4 py-2 rounded-md font-display-oswald text-lg tracking-wide transition-colors ${
        isActive
            ? 'text-cinema-accent'
            : 'text-white hover:text-cinema-accent'
        }`

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between px-10 py-5
                         bg-gradient-to-b from-black/80 via-black/40 to-transparent
                         transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
           <span className='font-display-bebas text-3xl text-cinema-accent tracking-wider'>
            CineTrack
           </span>

           <div className='flex items-center gap-2'>
               <NavLink to="/" end className={linkClasses}>
               Search
               </NavLink>
               <NavLink to="/watchlist" end className={linkClasses}>
               Watchlist
               </NavLink>
               <NavLink to="/watched" end className={linkClasses}>
               Watched
               </NavLink>
               <NavLink to="/stats" end className={linkClasses}>
               Stats
               </NavLink>
           </div>
        </nav>
    )
}
 
export default Navbar
