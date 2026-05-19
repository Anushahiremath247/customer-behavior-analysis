import { TrendingUp, Award, DollarSign, Target, Users, Zap } from 'lucide-react'

const iconMap = {
  'TrendingUp': TrendingUp,
  'Award': Award,
  'DollarSign': DollarSign,
  'Target': Target,
  'Users': Users,
  'Zap': Zap,
}

export default function InsightCard({ title, description, icon, color = 'primary' }) {
  const Icon = iconMap[icon] || TrendingUp

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
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{ 
          padding: '0.75rem', 
          borderRadius: '0.75rem', 
          backgroundColor: `${colorMap[color]}20`
        }}>
          <Icon style={{ width: '1.5rem', height: '1.5rem', color: colorMap[color] }} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ color: '#F8FAFC', fontWeight: '600', marginBottom: '0.5rem' }}>{title}</h4>
          <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: '1.5' }}>{description}</p>
        </div>
      </div>
    </div>
  )
}
