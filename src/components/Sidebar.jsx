import { useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiCompass, FiClock, FiThumbsUp, FiPlayCircle, FiPieChart } from 'react-icons/fi'

function Sidebar({ isOpen }) {
  const navigate = useNavigate()
  const location = useLocation()
  
  const menuItems = [
    { icon: <FiHome size={20} />, text: 'Home', path: '/' },
    { icon: <FiCompass size={20} />, text: 'Explore', path: '/explore' },
    { icon: <FiPlayCircle size={20} />, text: 'Subscriptions', path: '/subscriptions' },
    { icon: <FiClock size={20} />, text: 'History', path: '/history' },
    { icon: <FiThumbsUp size={20} />, text: 'Liked Videos', path: '/liked' },
    { icon: <FiPieChart size={20} />, text: 'Dashboard', path: '/dashboard' },
  ]

  return (
    <aside className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-black transition-all duration-300 border-r border-neutral-900 z-40 ${
      isOpen ? 'w-60' : 'w-[5.5rem]'
    }`}>
      <div className="py-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-4 px-4 py-2 hover:bg-neutral-900 ${
              location.pathname === item.path ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
            }`}
          >
            <span className="min-w-[1.5rem]">{item.icon}</span>
            <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              {item.text}
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar