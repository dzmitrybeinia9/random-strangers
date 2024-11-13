import { Outlet, useLocation } from 'react-router-dom'
import Navigation from './Navigation'

function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen font-regular">
      <Navigation />
      
      {/* Main Content */}
      {location.pathname === '/' ? (
        <main className="min-h-[calc(100vh-64px)] w-full">
          <Outlet />
        </main>
      ) : (
        <main className="container mx-auto py-5 lg:mt-5">
          <Outlet />
        </main>
      )}
    </div>
  )
}

export default Layout 