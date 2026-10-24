"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SiteMarkupProps { html: string }

declare global { interface Window { initSavyoraSite?: () => void } }

export default function SiteMarkup({ html }: SiteMarkupProps) {
  const router = useRouter()

  useEffect(() => {
    let script = document.querySelector<HTMLScriptElement>('script[data-savyora-site]')
    const initialize = () => window.initSavyoraSite?.()
    if (!script) {
      script = document.createElement('script')
      script.src = '/assets/site.js'
      script.dataset.savyoraSite = 'true'
      script.onload = initialize
      document.body.appendChild(script)
    } else if (window.initSavyoraSite) initialize()
    else script.addEventListener('load', initialize, { once: true })

    const navigate = (event: MouseEvent) => {
      const target = event.target as Element | null
      const link = target?.closest<HTMLAnchorElement>('a[href]')
      if (!link || link.target === '_blank' || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin) return
      event.preventDefault()
      router.push(url.pathname + url.search + url.hash)
    }
    document.addEventListener('click', navigate)
    return () => document.removeEventListener('click', navigate)
  }, [html, router])

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
