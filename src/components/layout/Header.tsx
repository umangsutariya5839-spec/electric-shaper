export default function Header() {
  return (
    <header style={{
      height: '70px',
      backgroundColor: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 var(--spacing-xl)',
      justifyContent: 'space-between'
    }}>
      <div style={{ fontWeight: '600', fontSize: '1.1rem', color: 'var(--color-text-main)' }}>
        Electric & Rewinding Works
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Admin User
        </div>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          color: 'var(--color-secondary)'
        }}>
          A
        </div>
      </div>
    </header>
  )
}
