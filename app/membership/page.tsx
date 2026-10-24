import type { Metadata } from 'next'
import Link from 'next/link'
import { PricingGrid } from '@/components/pricing-grid'
import WhatsAppForm from '@/components/whatsapp-form'
import { DisplayTitle } from '@/components/motion-ui'

export const metadata: Metadata = {
  title: 'Membership & Pricing | The Savyora Fitness',
  description: 'Compare monthly membership at The Savyora Fitness in Peshawar and enquire directly with our team.',
  alternates: { canonical: '/membership' },
}

export default async function Page({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams
  const planKey = (plan || '').toLowerCase()
  const selected = planKey.includes('student')
    ? 'Student Full Access · PKR 6,000/month'
    : planKey.includes('gym +') || planKey.includes('gym%20+')
      ? 'Gym + Cardio · PKR 8,000/month'
      : planKey.includes('gym only')
        ? 'Gym Only · PKR 6,000/month'
        : planKey.includes('cardio')
          ? 'Cardio Only · PKR 2,000/month'
          : undefined

  return <>
    <section className="membership-intro" aria-labelledby="membership-title">
      <div className="membership-intro-grid">
        <div className="membership-photo-stack">
          <figure className="membership-photo-main">
            <img src="/assets/savyora-community.webp" alt="Savyora members sharing a moment after training" />
            <figcaption><span>THE SAVYORA FITNESS</span><b>01 / YOUR NEW ROUTINE</b></figcaption>
          </figure>
          <figure className="membership-photo-detail"><img src="/assets/savyora-women-training.webp" alt="A dedicated women-only training session" /></figure>
          <span className="membership-photo-index">PESHAWAR · 34°01′ N</span>
        </div>
        <div className="membership-intro-copy">
          <span className="eyebrow"><i/>MEMBERSHIP, WITH ROOM TO MOVE</span>
          <h1 id="membership-title">Your training.<br/><em>Your own rhythm.</em></h1>
          <p>Some people come for the strength floor. Some for the cardio. Find the way in that fits your life, then build from there.</p>
          <div className="membership-intro-actions">
            <Link className="button button-primary" href="#plans">Explore your options <span>↘</span></Link>
            <Link className="button button-outline" href="#enquire">Talk to our team <span>↗</span></Link>
          </div></div></div><div className="membership-intro-ghost" aria-hidden="true">YOUR MOVE</div>
    </section>

    <section className="membership-plans interior-section section-shell" id="plans">
      <div className="section-heading-row"><DisplayTitle eyebrow="FOUR WAYS TO BEGIN">Choose your<br/><em>training mode.</em></DisplayTitle><div className="heading-aside"><p>All listed prices are monthly. Choose the access that suits you, then ask the team to confirm current availability and terms.</p><a className="text-link" href="https://wa.me/923400636969" target="_blank" rel="noreferrer">Questions? We’re one message away <span>↗</span></a></div></div>
      <PricingGrid/>
      <div className="offer-panel" id="offer"><div className="offer-panel-index">FIRST MONTH<br/><b>OFFER</b></div><div><span className="eyebrow"><i/>A LITTLE SOMETHING TO GET STARTED</span><h2>Admission on us.<br/><em>Your membership still applies.</em></h2><p>The PKR 10,000 admission fee is advertised as waived for your first month. Monthly membership charges still apply. Please confirm current offer terms with the team.</p></div><Link className="button button-primary" href="#enquire">Ask about the offer <span>↘</span></Link></div>
    </section>

    <section className="membership-contact section-shell" id="enquire"><div className="membership-contact-copy"><span className="eyebrow"><i/>LET’S GET YOU MOVING</span><h2>Tell us what<br/><em>you’re looking for.</em></h2><p>We’ll prepare a WhatsApp message with your enquiry details so you can review it and send it directly to Savyora.</p><a className="text-link" href="tel:+923400636969">Prefer to call? 0340 0636969 <span>↗</span></a></div><WhatsAppForm kind="membership" plan={selected}/></section>
  </>
}
