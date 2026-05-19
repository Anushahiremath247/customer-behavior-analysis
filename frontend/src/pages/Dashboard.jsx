import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign, Star, BarChart3, Sparkles } from 'lucide-react'
import FilterSection from '../components/dashboard/FilterSection'
import KPICard from '../components/dashboard/KPICard'
import RevenueByGender from '../components/charts/RevenueByGender'
import RevenueByAge from '../components/charts/RevenueByAge'
import RevenueByCategory from '../components/charts/RevenueByCategory'
import SubscriptionAnalysis from '../components/charts/SubscriptionAnalysis'
import HeatmapCard from '../components/heatmaps/HeatmapCard'
import Skeleton from '../components/common/Skeleton'
import { kpiService, chartService, heatmapService } from '../services/api'

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
  const [filters, setFilters] = useState({})
  const [kpis, setKpis] = useState(null)
  const [revenueByGender, setRevenueByGender] = useState([])
  const [revenueByAge, setRevenueByAge] = useState([])
  const [revenueByCategory, setRevenueByCategory] = useState([])
  const [subscriptionAnalysis, setSubscriptionAnalysis] = useState([])
  const [ageCategoryHeatmap, setAgeCategoryHeatmap] = useState([])
  const [genderCategoryHeatmap, setGenderCategoryHeatmap] = useState([])
  const [discountBehaviorHeatmap, setDiscountBehaviorHeatmap] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const queryFilters = useMemo(() => ({
    gender: filters.gender,
    ageGroup: filters.ageGroup,
    category: filters.category,
    subscription: filters.subscription,
  }), [filters])

  const fetchDashboardData = async () => {
    setLoading(true)
    setError(null)

    try {
      const [kpiData, genderData, ageData, categoryData, subscriptionData, ageHeatmap, genderHeatmap, discountHeatmap] = await Promise.all([
        kpiService.getKPIs(queryFilters),
        chartService.getRevenueByGender(queryFilters),
        chartService.getRevenueByAge(queryFilters),
        chartService.getRevenueByCategory(queryFilters),
        chartService.getSubscriptionAnalysis(queryFilters),
        heatmapService.getAgeCategoryHeatmap(queryFilters),
        heatmapService.getGenderCategoryHeatmap(queryFilters),
        heatmapService.getDiscountBehaviorHeatmap(queryFilters),
      ])

      setKpis(kpiData)
      setRevenueByGender(genderData)
      setRevenueByAge(ageData)
      setRevenueByCategory(categoryData)
      setSubscriptionAnalysis(subscriptionData)
      setAgeCategoryHeatmap(ageHeatmap)
      setGenderCategoryHeatmap(genderHeatmap)
      setDiscountBehaviorHeatmap(discountHeatmap)
    } catch (err) {
      console.error('Dashboard load error:', err)
      setError('Unable to load dashboard data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const handleApplyFilters = (activeFilters) => {
    setFilters(activeFilters)
  }

  const cards = [
    {
      title: 'Total Revenue',
      value: kpis?.totalRevenue || '$0.00',
      icon: TrendingUp,
      trend: { value: '+12.4%', positive: true },
      color: 'primary',
    },
    {
      title: 'Total Customers',
      value: kpis?.totalCustomers || '0',
      icon: Users,
      color: 'accent',
    },
    {
      title: 'Avg Purchase',
      value: kpis?.avgPurchase || '$0.00',
      icon: DollarSign,
      color: 'cyan',
    },
    {
      title: 'Avg Rating',
      value: kpis?.avgRating || '0.00',
      icon: Star,
      color: 'green',
    },
    {
      title: 'Repeat Buyers',
      value: kpis?.repeatBuyers || '0%',
      icon: Sparkles,
      color: 'primary',
    },
    {
      title: 'Subscribers',
      value: kpis?.subscribers || '0%',
      icon: Users,
      color: 'accent',
    },
  ]

  return (
    <div className="space-y-8">
      <FilterSection onApply={handleApplyFilters} />

      {error && (
        <div className="glass-card p-6 text-red-200 bg-red-900/20 border-red-500/30">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-40" />
            ))}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-96" />
            ))}
          </div>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <h2 className="text-2xl font-bold text-text-primary">Key Performance Indicators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
              {cards.map((card) => (
                <KPICard key={card.title} {...card} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <RevenueByGender data={revenueByGender} />
              <RevenueByAge data={revenueByAge} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <RevenueByCategory data={revenueByCategory} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
          >
            <SubscriptionAnalysis data={subscriptionAnalysis} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-text-primary mb-6">Heatmap Overview</h2>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <HeatmapCard title="Age Group vs Category" data={ageCategoryHeatmap} labels={heatmapLabels.ageCategory} />
              <HeatmapCard title="Gender vs Category" data={genderCategoryHeatmap} labels={heatmapLabels.genderCategory} />
              <HeatmapCard title="Discount vs Subscription" data={discountBehaviorHeatmap} labels={heatmapLabels.discountBehavior} />
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}
