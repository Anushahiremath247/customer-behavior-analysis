import { Search, Filter } from 'lucide-react'
import { useFilters } from '../../hooks/useFilters'

const filterOptions = {
  gender: ['All', 'Female', 'Male'],
  ageGroup: ['All', 'Young Adult', 'Adult', 'Middle-aged', 'Senior'],
  category: ['All', 'Clothing', 'Accessories', 'Footwear', 'Outerwear'],
  subscription: ['All', 'Yes', 'No'],
  shipping: ['All', 'Express', 'Standard', 'Same Day'],
  discount: ['All', 'Yes', 'No'],
}

export default function FilterSection({ onApply }) {
  const { filters, updateFilter, applyFilters } = useFilters()

  const handleApply = () => {
    const activeFilters = applyFilters()
    onApply(activeFilters)
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(11, 27, 51, 0.8) 0%, rgba(6, 18, 38, 0.9) 100%)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(30, 58, 95, 0.5)',
      borderRadius: '1rem',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
      padding: '1.5rem',
      marginBottom: '2rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Filter style={{ width: '1.25rem', height: '1.25rem', color: '#3B82F6' }} />
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#F8FAFC' }}>Filters</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {Object.entries(filterOptions).map(([key, options]) => (
          <div key={key}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#94A3B8', marginBottom: '0.5rem' }}>
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <select
              value={filters[key]}
              onChange={(e) => updateFilter(key, e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                borderRadius: '0.75rem',
                backgroundColor: '#061226',
                border: '1px solid rgba(30, 58, 95, 0.5)',
                color: '#F8FAFC',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ flex: '1 1 280px', minWidth: 0, position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1.25rem', height: '1.25rem', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search by product, category, or location..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 3rem',
              borderRadius: '0.75rem',
              backgroundColor: '#061226',
              border: '1px solid rgba(30, 58, 95, 0.5)',
              color: '#F8FAFC',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
          />
        </div>
        <button
          onClick={handleApply}
          style={{
            flex: '0 1 200px',
            width: '100%',
            maxWidth: '220px',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.75rem',
            backgroundColor: '#3B82F6',
            color: 'white',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}
