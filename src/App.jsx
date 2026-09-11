import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import WatchListPage from './pages/WatchListPage'
import WatchedPage from './pages/WatchedPage'
import StatsPage from './pages/StatsPage'
import './App.css'



function App() {
  return (
    <div className="app">
      <Navbar />
      <main className='pt-20'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/watchlist" element={<WatchListPage />} />
        <Route path="/watched" element={<WatchedPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
      </main>
     </div>
  )
}

export default App