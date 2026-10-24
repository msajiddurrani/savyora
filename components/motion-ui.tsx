"use client"

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 32, filter: 'blur(5px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: .16 }} transition={{ duration: .76, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>
}

export function ScrollImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={`scroll-image ${className}`} initial={false} whileInView={{ scale: 1 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .9, ease: [.22, 1, .36, 1] }}>
    <motion.img src={src} alt={alt} loading="lazy" initial={reduced ? false : { scale: 1.12, y: 22 }} whileInView={{ scale: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: 1.1, ease: [.22, 1, .36, 1] }} />
  </motion.div>
}

export function DisplayTitle({ eyebrow, children, className = '' }: { eyebrow: string; children: ReactNode; className?: string }) {
  return <div className={`display-title ${className}`}><span className="eyebrow"><i />{eyebrow}</span><h2>{children}</h2></div>
}
