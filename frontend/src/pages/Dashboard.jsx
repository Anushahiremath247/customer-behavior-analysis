import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import KPICard from '../components/dashboard/KPICard'
import FilterSection from '../components/dashboard/FilterSection'
import RevenueByGender from '../components/charts/RevenueByGender'
import RevenueByAge from '../components/charts/RevenueByAge'
import RevenueByCategory from '../components/charts/RevenueByCategory'
import SubscriptionAnalysis from '../components/charts/SubscriptionAnalysis'
import HeatmapCard from '../components/heatmaps/HeatmapCard'
import { kpiService, chartService, heatmapService, exportService } from '../services/api'
import { useAutoRefresh } from '../hooks/useAutoRefresh'
import { Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react'

const heatmapLabels = {
  ageCategory: {
    columns: ['Accessories', 'Clothing', 'Footwear', 'Outerwear'],
    rows: ['Young Adult', 'Adult', 'Middle-aged', 'Senior'],
  },
  genderCategory: {
    columns: ['Accessories', 'Clothing', 'Footwear', 'Outerwear'],
    rows: ['Female', 'Male'],
  },
  discountBehavior: {
    columns: ['No', 'Yes'],
    rows: ['No', 'Yes'],
  },
}

export default function Dashboard() {
  const [kpis, setKpis] = useState(null)
  const [revenueByGender, setRevenueByGender] = useState([])
  const [revenueByAge, setRevenueByAge] = useState([])
  const [revenueByCategory, setRevenueByCategory] = useState([])
  const [subscriptionAnalysis, setSubscriptionAnalysis] = useState([])
  const [ageCategoryHeatmap, setAgeCategoryHeatmap] = useState([])
  const [genderCategoryHeatmap, setGenderCategoryHeatmap] = useState([])
  const [discountBehaviorHeatmap, setDiscountBehaviorHeatmap] = useState([])
  const [loading, setLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [filters, setFilters] = useState({})

  const fetchDashboardData = async (activeFilters = {}) => {
    try {
      setLoading(true)
      const queryFilters = {
        gender: activeFilters.gender,
        ageGroup: activeFilters.ageGroup,
        category: activeFilters.category,
        subscription: activeFilters.subscription,
      }

      const [kpiData, genderData, ageData, categoryData, subscriptionData, ageHeatmap, genderHeatmap, discountHeatmap] = await Promise.all([
        kpiService.getKPIs(queryFilters).catch(() => null),
        chartService.getRevenueByGender(queryFilters).catch(() => []),
        chartService.getRevenueByAge(queryFilters).catch(() => []),
        chartService.getRevenueByCategory(queryFilters).catch(() => []),
        chartService.getSubscriptionAnalysis(queryFilters).catch(() => []),
        heatmapService.getAgeCategoryHeatmap(queryFilters).catch(() => []),
        heatmapService.getGenderCategoryHeatmap(queryFilters).catch(() => []),
        heatmapService.getDiscountBehaviorHeatmap(queryFilters).catch(() => []),
      ])

      setKpis(kpiData)
      setRevenueByGender(genderData)
      setRevenueByAge(ageData)
      setRevenueByCategory(categoryData)
      setSubscriptionAnalysis(subscriptionData)
      setAgeCategoryHeatmap(ageHeatmap)
      setGenderCategoryHeatmap(genderHeatmap)
      setDiscountBehaviorHeatmap(discountHeatmap)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const handleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh)
  }

  useAutoRefresh(() => fetchDashboardData(filters), autoRefresh ? 30000 : null)

  const handleApplyFilters = (activeFilters) => {
    setFilters(activeFilters)
    fetchDashboardData(activeFilters)
  }

  const handleExport = async () => {
    try {
      const blob = await exportService.exportCSV(filters)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'analytics-export.csv'
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting CSV:', error)
    }
  }

  const defaultKPIs = [
    { title: 'Total Customers', value: '3,900', icon: Users, color: 'primary', trend: { value: '+12%', positive: true } },
    { title: 'Total Revenue', value: '$233,081', icon: DollarSign, color: 'accent', trend: { value: '+15%', positive: true } },
    { title: 'Total Purchases', value: '3,900', icon: ShoppingCart, color: 'cyan', trend: { value: '+8%', positive: true } },
    { title: 'Avg Order Value', value: '$59.76', icon: TrendingUp, color: 'green', trend: { value: '+5%', positive: true } },
  ]

  const displayKPIs = kpis ? [
    { title: 'Total Revenue', value: kpis.totalRevenue || '$0', icon: TrendingUp, color: 'primary', trend: { value: '+12%', positive: true } },
    { title: 'Total Customers', value: kpis.totalCustomers || '0', icon: Users, color: 'accent' },
    { title: 'Avg Purchase', value: kpis.avgPurchase || '$0', icon: DollarSign, color: 'cyan' },
    { title: 'Avg Rating', value: kpis.avgRating || '0', icon: TrendingUp, color: 'green' },
  ] : defaultKPIs

  if (loading) {
    return (
      <div className="space-y-6">
        <Header onAutoRefresh={handleAutoRefresh} autoRefresh={autoRefresh} onExport={handleExport} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card p-6 h-32 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Header onAutoRefresh={handleAutoRefresh} autoRefresh={autoRefresh} onExport={handleExport} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FilterSection onApply={handleApplyFilters} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayKPIs.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">Revenue Analysis</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueByGender data={revenueByGender} />
          <RevenueByAge data={revenueByAge} />
          <RevenueByCategory data={revenueByCategory} />
          <SubscriptionAnalysis data={subscriptionAnalysis} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">Behavioral Heatmaps</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <HeatmapCard title="Age Group vs Category" data={ageCategoryHeatmap} labels={heatmapLabels.ageCategory} />
          <HeatmapCard title="Gender vs Category" data={genderCategoryHeatmap} labels={heatmapLabels.genderCategory} />
          <HeatmapCard title="Discount vs Subscription" data={discountBehaviorHeatmap} labels={heatmapLabels.discountBehavior} />
        </div>
      </motion.div>
    </div>
  )
}
