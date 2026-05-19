import { useState, useCallback } from 'react'

export function useFilters() {
  const [filters, setFilters] = useState({
    gender: 'All',
    ageGroup: 'All',
    category: 'All',
    subscription: 'All',
    shipping: 'All',
    discount: 'All',
    search: '',
  })

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({
      gender: 'All',
      ageGroup: 'All',
      category: 'All',
      subscription: 'All',
      shipping: 'All',
      discount: 'All',
      search: '',
    })
  }, [])

  const applyFilters = useCallback(() => {
    const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== 'All' && value !== '') {
        acc[key] = value
      }
      return acc
    }, {})
    return activeFilters
  }, [filters])

  return { filters, updateFilter, resetFilters, applyFilters }
}
