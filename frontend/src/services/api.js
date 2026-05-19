import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const kpiService = {
  getKPIs: async (filters = {}) => {
    const response = await api.get('/api/kpis', { params: filters })
    return response.data
  },
}

export const chartService = {
  getRevenueByGender: async (filters = {}) => {
    const response = await api.get('/api/revenue-by-gender', { params: filters })
    return response.data
  },
  getRevenueByAge: async (filters = {}) => {
    const response = await api.get('/api/revenue-by-age', { params: filters })
    return response.data
  },
  getRevenueByCategory: async (filters = {}) => {
    const response = await api.get('/api/revenue-by-category', { params: filters })
    return response.data
  },
  getSubscriptionAnalysis: async (filters = {}) => {
    const response = await api.get('/api/subscription-analysis', { params: filters })
    return response.data
  },
}

export const heatmapService = {
  getAgeCategoryHeatmap: async (filters = {}) => {
    const response = await api.get('/api/heatmap-age-category', { params: filters })
    return response.data
  },
  getGenderCategoryHeatmap: async (filters = {}) => {
    const response = await api.get('/api/heatmap-gender-category', { params: filters })
    return response.data
  },
  getDiscountBehaviorHeatmap: async (filters = {}) => {
    const response = await api.get('/api/discount-analysis', { params: filters })
    return response.data
  },
}

export const insightsService = {
  getBusinessInsights: async (filters = {}) => {
    const response = await api.get('/api/business-insights', { params: filters })
    return response.data
  },
}

export const exportService = {
  exportCSV: async (filters = {}) => {
    const response = await api.get('/api/export-csv', { 
      params: filters,
      responseType: 'blob'
    })
    return response.data
  },
}

export default api
