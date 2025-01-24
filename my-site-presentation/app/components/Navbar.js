import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbar}`}>
      <div className="container">
        <Link href="/" className="navbar-brand">Mon Portfolio</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link href="/portfolio" className="nav-link">Portfolio</Link></li>
            <li className="nav-item"><Link href="/creations3d" className="nav-link">Créations 3D</Link></li>
            <li className="nav-item"><Link href="/ia" className="nav-link">IA</Link></li>
            <li className="nav-item"><Link href="/contact" className="nav-link">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
