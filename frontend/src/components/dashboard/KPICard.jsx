import { cn } from '../../utils/cn'

export default function KPICard({ title, value, icon: Icon, trend, color = 'primary' }) {
  const colorMap = {
    primary: '#3B82F6',
    accent: '#8B5CF6',
    cyan: '#06B6D4',
    green: '#22C55E',
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(11, 27, 51, 0.8) 0%, rgba(6, 18, 38, 0.9) 100%)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(30, 58, 95, 0.5)',
      borderRadius: '1rem',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
      padding: '1.5rem',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ padding: '0.75rem', borderRadius: '0.75rem', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
          {Icon && <Icon style={{ width: '1.5rem', height: '1.5rem', color: colorMap[color] || colorMap.primary }} />}
        </div>
        {trend && (
          <span style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: trend.positive ? '#22C55E' : '#EF4444'
          }}>
            {trend.value}
          </span>
        )}
      </div>
      <h3 style={{ color: '#94A3B8', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>{title}</h3>
      <p style={{ color: '#F8FAFC', fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</p>
    </div>
  )
}
