import { useState, useEffect, useCallback } from 'react'

export function useAutoRefresh(refreshCallback, interval = 30000) {
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(null)

  useEffect(() => {
    let intervalId = null

    if (autoRefresh) {
      intervalId = setInterval(() => {
        refreshCallback()
        setLastRefresh(new Date())
      }, interval)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [autoRefresh, interval, refreshCallback])

  const toggleAutoRefresh = useCallback(() => {
    setAutoRefresh(prev => !prev)
  }, [])

  return { autoRefresh, toggleAutoRefresh, lastRefresh }
}
