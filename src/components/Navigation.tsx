import { Link } from 'react-router-dom'
import mzgbLogo from '../assets/mzgb.jpeg'

export function Navigation() {
  return (
    <nav className="bg-white/80 backdrop-blur shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img 
              src={mzgbLogo} 
              alt="MZGB Logo" 
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-4 flex space-x-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link 
                to="/photos" 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Photos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 