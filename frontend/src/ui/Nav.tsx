export const Nav = () => {
  return (
    <nav style={{ width: '100%', height: '60px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div>
            <img src='/vite.svg' alt="logo" style={{ width: '32px', height: '32px' }} />
        </div>

        <ul style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', padding: 0, margin: 0, gap: '8px' }}>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
    </nav>
  )
}