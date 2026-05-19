import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#061226' }}>
      <Sidebar isOpen={isMobile ? sidebarOpen : true} onClose={() => setSidebarOpen(false)} />
      
      <div style={isMobile ? {} : { marginLeft: '16rem' }}>
        <div className="lg:hidden flex items-center justify-between p-4" style={{ backgroundColor: '#0B1B33', borderBottom: '1px solid rgba(30, 58, 95, 0.5)' }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-border/30 transition-colors"
          >
            <Menu className="w-6 h-6" style={{ color: '#F8FAFC' }} />
          </button>
          <h1 className="text-lg font-semibold" style={{ background: 'linear-gradient(to right, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Analytics Suite</h1>
          <div style={{ width: '2.5rem' }} />
        </div>
        
        <main style={{ padding: '1rem' }}>
          <Outlet />
        </main>
      </div>

      {sidebarOpen && isMobile && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 40 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
