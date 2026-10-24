"use client"

import { FormEvent, useState } from 'react'

export default function WhatsAppForm({ kind='general', plan }: { kind?: 'general'|'membership'|'coaching'; plan?: string }) {
  const [status,setStatus]=useState('')
  const submit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    const form=event.currentTarget
    if(!form.reportValidity())return
    const data=new FormData(form)
    const lines=['Hello, I’d like to enquire with The Savyora Fitness.','Name: '+data.get('name'),'Phone: '+data.get('phone')]
    if(data.get('plan'))lines.push('Plan: '+data.get('plan'))
    if(data.get('topic'))lines.push('Topic: '+data.get('topic'))
    if(data.get('message'))lines.push('Message: '+data.get('message'))
    setStatus('Your WhatsApp draft is ready. Review the details and tap Send to contact Savyora.')
    const url='https://wa.me/923400636969?text='+encodeURIComponent(lines.join('\n'))
    const popup=window.open(url,'_blank')
    if(popup)popup.opener=null
    else window.location.assign(url)
  }
  return <form className="enquiry-form" onSubmit={submit}>
    <div className="form-intro"><span className="eyebrow"><i />DIRECT ENQUIRY</span><h2>{kind==='membership'?'Let’s find your plan':kind==='coaching'?'Talk with the coaching team':'Start a conversation'}</h2><p>No waiting form inbox. Your message opens in WhatsApp so you can check it before you send.</p></div>
    <div className="form-fields"><label>Name<input name="name" autoComplete="name" required maxLength={80} placeholder="Your name"/></label><label>Phone<input name="phone" type="tel" autoComplete="tel" required maxLength={30} placeholder="03XX XXXXXXX"/></label>
      {kind==='membership'?<label className="field-wide">Plan<select name="plan" defaultValue={plan||''} required><option value="" disabled>Select a plan</option><option>Cardio Only · PKR 2,000/month</option><option>Gym Only · PKR 6,000/month</option><option>Gym + Cardio · PKR 8,000/month</option><option>Student Full Access · PKR 6,000/month</option></select></label>:<label className="field-wide">I’d like to ask about<select name="topic" defaultValue={kind==='coaching'?'Personal Training & Nutrition':''} required><option value="" disabled>Choose a topic</option><option>Membership</option><option>Facilities</option><option>Training times</option><option>Personal Training & Nutrition</option><option>Location</option><option>Other</option></select></label>}
      <label className="field-wide">Message<textarea name="message" maxLength={500} rows={3} placeholder="What would you like to know?"/></label></div>
    <button type="submit" className="button button-primary">Open WhatsApp <span>↗</span></button><p className="form-privacy">Your details stay in the message you choose to send. This site does not store enquiry form data.</p><div className="form-status" aria-live="polite">{status}</div>
  </form>
}

