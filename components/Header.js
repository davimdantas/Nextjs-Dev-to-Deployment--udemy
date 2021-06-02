import Link from 'next/link'
import styles from '../styles/Header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}></div>
            <Link href='/'>
                <a>DJ Events</a>
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link href="/events">
                            <a >Events</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
