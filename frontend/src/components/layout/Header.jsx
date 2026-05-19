import { motion } from 'framer-motion'
import { RefreshCw, Download } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function Header({ onAutoRefresh, autoRefresh, onExport }) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 md:flex-row md:items-center justify-between px-4 sm:px-6 py-4 bg-card/50 backdrop-blur-md border-b border-border/50"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <h2 className="text-xl font-semibold text-text-primary">
          Consumer Shopping Behavior Analytics
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-3 justify-end">
        <button
          onClick={onAutoRefresh}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 min-w-[10rem]',
            autoRefresh
              ? 'bg-primary/20 border-primary text-primary'
              : 'bg-card border-border text-text-secondary hover:border-primary/50'
          )}
        >
          <RefreshCw className={cn('w-4 h-4', autoRefresh && 'animate-spin')} />
          <span className="text-sm font-medium">Auto Refresh</span>
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/50 text-primary hover:bg-primary/20 transition-all duration-300 min-w-[10rem]"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Export CSV</span>
        </button>
      </div>
    </motion.header>
  )
}
