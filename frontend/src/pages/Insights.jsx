import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import InsightCard from '../components/insights/InsightCard'
import { insightsService, exportService } from '../services/api'
import { useAutoRefresh } from '../hooks/useAutoRefresh'

export default function Insights() {
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchInsights = useCallback(async () => {
    try {
      setLoading(true)
      const data = await insightsService.getBusinessInsights()
      setInsights(data)
    } catch (error) {
      console.error('Error fetching insights:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const { autoRefresh, toggleAutoRefresh } = useAutoRefresh(fetchInsights, 30000)

  useEffect(() => {
    fetchInsights()
  }, [fetchInsights])

  const handleExport = async () => {
    try {
      const blob = await exportService.exportCSV()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'insights-export.csv'
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting CSV:', error)
    }
  }

  const defaultInsights = [
    {
      title: 'Top Spending Gender',
      description: 'Male customers generate the highest revenue ($157,890).',
      icon: 'TrendingUp',
      color: 'primary'
    },
    {
      title: 'High Performing Product',
      description: 'Gloves leads with strong rating (3.86) and demand.',
      icon: 'Award',
      color: 'accent'
    },
    {
      title: 'Most Profitable Segment',
      description: 'Loyal customers contribute the highest segment revenue ($185,517).',
      icon: 'DollarSign',
      color: 'cyan'
    },
    {
      title: 'Discount Effectiveness',
      description: 'Discounted purchases reduce average spend ($59.28 vs $60.13).',
      icon: 'Target',
      color: 'primary'
    },
    {
      title: 'Retention and Subscription Trend',
      description: 'Overall repeat buyers: 89.1%. Among subscribers: 91.0%.',
      icon: 'Users',
      color: 'green'
    },
    {
      title: 'Revenue Growth',
      description: 'Monthly revenue increased by 12.5% compared to last quarter.',
      icon: 'Zap',
      color: 'accent'
    },
  ]

  const displayInsights = insights.length > 0 ? insights : defaultInsights

  if (loading) {
    return (
      <div className="space-y-6">
        <Header onAutoRefresh={toggleAutoRefresh} autoRefresh={autoRefresh} onExport={handleExport} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card p-6 h-40 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Header onAutoRefresh={toggleAutoRefresh} autoRefresh={autoRefresh} onExport={handleExport} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">Business Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayInsights.map((insight, index) => (
            <InsightCard key={index} {...insight} />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">Customer Behavior Analysis</h2>
        <div className="glass-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Purchase Patterns</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2"></span>
                  <span>Peak shopping hours: 2 PM - 6 PM on weekdays</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2"></span>
                  <span>Weekend purchases show 23% higher cart values</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan mt-2"></span>
                  <span>Mobile users convert 15% faster than desktop</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Subscription Impact</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                  <span>Subscribers spend 18% more per transaction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2"></span>
                  <span>Subscription retention rate: 94.2%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2"></span>
                  <span>Free trial conversion: 34%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">Revenue Insights</h2>
        <div className="glass-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-xl bg-primary/10">
              <div className="text-3xl font-bold text-primary mb-2">$233K</div>
              <div className="text-text-secondary text-sm">Total Revenue</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-accent/10">
              <div className="text-3xl font-bold text-accent mb-2">+12.5%</div>
              <div className="text-text-secondary text-sm">Growth Rate</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-cyan/10">
              <div className="text-3xl font-bold text-cyan mb-2">$59.76</div>
              <div className="text-text-secondary text-sm">Avg Order Value</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
