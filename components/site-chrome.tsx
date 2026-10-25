"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'

const links = [
  ['Home', '/'],
  ['Facilities', '/facilities'],
  ['Training', '/training'],
  ['Membership', '/membership'],
  ['Coaching', '/coaching'],
  ['About', '/about'],
  ['Contact', '/contact'],
] as const

function Brand() {
  return (
    <Link className="brand-lockup" href="/" aria-label="The Savyora Fitness home">
      <span className="brand-emblem">
        <img src="/assets/savyora-logo.svg" alt="The Savyora Fitness Official Logo" />
      </span>
      <span className="brand-word">
        THE SAVYORA
        <small>FITNESS</small>
      </span>
    </Link>
  )
}

function ProgressLine() {
  const { scrollYProgress } = useScroll()
  return <motion.div className="reading-line" style={{ scaleX: scrollYProgress }} />
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 20))
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', close)
    document.body.classList.toggle('nav-open', menuOpen)
    return () => {
      document.removeEventListener('keydown', close)
      document.body.classList.remove('nav-open')
    }
  }, [menuOpen])

  return (
    <>
      <ProgressLine />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {/* Sleek Sticky Glass Bar Navbar */}
      <header
        className={`masthead ${scrolled ? 'masthead-scrolled' : ''}`}
      >
        <div className="masthead-inner">
          <Brand />

          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([label, href]) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link-item ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          <div className="masthead-actions">
            <a
              className="nav-whatsapp"
              href="https://wa.me/923400636969"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ask the Savyora team on WhatsApp"
            >
              <span className="live-status-dot" aria-hidden="true">
                <span className="pulse" />
                <span className="core" />
              </span>
              <span>ASK THE TEAM</span>
              <b>↗</b>
            </a>

            <Link className="nav-cta" href="/membership">
              <span>Join Savyora</span>
              <i>↗</i>
            </Link>

            <button
              className={`menu-button ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-navigation"
              className="mobile-navigation"
              initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.7 }}
              animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
              exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.8 }}
              transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="mobile-menu-kicker">
                THE SAVYORA FITNESS <span>· PESHAWAR</span>
              </div>
              <nav aria-label="Mobile navigation">
                {links.map(([label, href], i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.04 }}
                  >
                    <Link
                      href={href}
                      className={pathname === href ? 'mobile-active' : ''}
                      aria-current={pathname === href ? 'page' : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>0{i + 1}</span>
                      {label}
                      <b>↗</b>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mobile-menu-bottom">
                <a href="tel:+923400636969">0340 0636969</a>
                <a href="https://www.instagram.com/savyora.pk/" target="_blank" rel="noopener noreferrer">
                  INSTAGRAM ↗
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content">{children}</main>

      <footer className="site-footer">
        <div className="footer-orbit" aria-hidden="true" />
        <div className="footer-topline">
          <span>YOUR NEXT CHAPTER STARTS HERE</span>
          <span>STRONGER · HEALTHIER · HAPPIER TOGETHER</span>
        </div>
        <div className="footer-main">
          <div className="footer-brand-column">
            <Brand />
            <h2>
              More than fitness.
              <br />
              <em>A lifestyle.</em>
            </h2>
            <a className="footer-join" href="/membership">
              Explore membership <span>↗</span>
            </a>
          </div>
          <div className="footer-links">
            <small>EXPLORE</small>
            {links.map(([label, href]) => (
              <Link href={href} key={href}>
                {label}
                <span>↗</span>
              </Link>
            ))}
          </div>
          <div className="footer-contact">
            <small>FIND THE CLUB</small>
            <p>
              Ground Floor, Rabbani Heights,
              <br />
              Nasir Bagh Road, Malakandher,
              <br />
              Peshawar, near Naseer Teaching Hospital.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Ground+Floor%2C+Rabbani+Heights%2C+Nasir+Bagh+Road%2C+Malakandher%2C+Peshawar%2C+near+Naseer+Teaching+Hospital"
              target="_blank"
              rel="noopener noreferrer"
            >
              GET DIRECTIONS ↗
            </a>
            <a href="tel:+923400636969">0340 0636969</a>
            <a href="tel:+923199004712">0319 9004712</a>
            <a href="https://www.instagram.com/savyora.pk/" target="_blank" rel="noopener noreferrer">
              @savyora.pk ↗
            </a>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} THE SAVYORA FITNESS</span>
          <span>BUILT NOT BORN. GO HEAVY OR GO HOME.</span>
        </div>
      </footer>

      <a
        className={`whatsapp-float ${pathname === '/' && !scrolled ? 'whatsapp-hidden-hero' : ''}`}
        href="https://wa.me/923400636969"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Savyora on WhatsApp"
      >
        <span className="wa-icon-bubble" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="wa-icon-svg" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.004 2C6.48 2 2 6.48 2 12c0 1.947.558 3.766 1.524 5.306L2 22l4.82-1.503A9.957 9.957 0 0 0 12.004 22C17.524 22 22 17.52 22 12s-4.476-10-9.996-10zm.006 18.25c-1.637 0-3.176-.446-4.508-1.226l-.323-.19-3.342 1.042 1.066-3.256-.208-.335A8.196 8.196 0 0 1 3.75 12c0-4.557 3.693-8.25 8.256-8.25 4.563 0 8.254 3.693 8.254 8.25 0 4.557-3.691 8.25-8.25 8.25zm4.81-6.136c-.264-.132-1.563-.77-1.805-.858-.242-.088-.418-.132-.594.132-.176.264-.682.858-.836 1.034-.154.176-.308.198-.572.066-.264-.132-1.115-.411-2.124-1.31-.785-.7-1.315-1.565-1.469-1.829-.154-.264-.016-.407.116-.538.119-.118.264-.308.396-.462.132-.154.176-.264.264-.44.088-.176.044-.33-.022-.462-.066-.132-.594-1.43-.814-1.958-.214-.515-.432-.445-.594-.453-.154-.008-.33-.01-.506-.01-.176 0-.462.066-.704.33-.242.264-.924.902-.924 2.2 0 1.298.946 2.552 1.078 2.728.132.176 1.862 2.842 4.51 3.987.63.272 1.122.435 1.505.557.633.202 1.21.173 1.665.105.508-.076 1.563-.638 1.783-1.254.22-.616.22-1.144.154-1.254-.066-.11-.242-.176-.506-.308z"/>
          </svg>
        </span>
      </a>
    </>
  )
}
