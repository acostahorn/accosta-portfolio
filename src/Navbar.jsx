import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="logo">Alberto C. Costa</a>
            </div>
            <div className="navbar-center">
                <ul className='nav-links'>
                    <li>
                        <a href="/apps">Apps</a>
                    </li>
                    <li>
                        <a href="/music">Music</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li><a href="/contact">Contact</a>
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default Navbar; 
