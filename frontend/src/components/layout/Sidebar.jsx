import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Lightbulb, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../utils/cn'

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, end: true },
  { name: 'Insights', path: '/insights', icon: Lightbulb, end: true },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border/50 p-6 z-50 lg:static lg:z-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gradient">Analytics Suite</h1>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-border/30 transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6 text-text-primary" />
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex min-w-0 items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                      isActive
                        ? 'bg-primary/20 text-primary border border-primary/50'
                        : 'text-text-secondary hover:bg-border/30 hover:text-text-primary'
                    )
                  }
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium truncate">{item.name}</span>
                </NavLink>
              )
            })}
          </nav>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
