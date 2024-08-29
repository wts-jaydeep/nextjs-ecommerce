import Link from 'next/link';

export default function Header() {
    return (
        <header style={styles.header}>
            <nav style={styles.nav}>
                <Link href="/" style={styles.link}>
                    Home
                </Link>
                <Link href="/about" style={styles.link}>
                    About
                </Link>
                <Link href="/privacy" style={styles.link}>
                    Privacy Policy
                </Link>
                <Link href="/users" style={styles.link}>
                    Users
                </Link>
                <Link href="/cart" style={styles.link}>
                    Cart
                </Link>
            </nav>
        </header>
    );
}

const styles = {
    header: {
        backgroundColor: '#333',
        padding: '1rem',
        color: 'white',
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1.2rem',
    },
};
