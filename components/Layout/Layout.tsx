import Image from 'next/image'
import healiosLogo from '../../public/Healios_logo_tag.webp'
import styles from '../../styles/Layout.module.css'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({children}: LayoutProps) {
  return (
    <div className="container">
      <header className={styles.header}>
        <Image src={healiosLogo} alt="Healios Logo" width={350} priority />
      </header>
      <main>{children}</main>
    </div>
  )
}
