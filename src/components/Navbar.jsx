import { NavLink } from 'react-router-dom'

function Navbar() {

    const linkClasses = ({ isActive }) =>
        `px-4 py-2 rounded-md font-display text-lg tracking-wide transition-colors ${
        isActive
            ?  'text-cinema-accent'
            : 'text-white hover : text-cinema-cta'
        }`

    return(
        <nav className='flex items-center gap-2 bg-cinema-card px-6 py-1 shadow-lg bg-gray-600'>
           <span className='dont-display text-2xl text-cinema-accent tracking-wider mr-6'>
            CineTrack
           </span>
           <NavLink to="/" end className={linkClasses}>
           Search
           </NavLink>
           <NavLink to="/watchlist" end className={linkClasses}>
           Wachlist
           </NavLink>
           <NavLink to="/watched" end className={linkClasses}>
           Watched
           </NavLink>
           <NavLink to="/stats" end className={linkClasses}>
           Stats
           </NavLink>

        </nav>
    )
}
 
export default Navbar