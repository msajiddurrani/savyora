import Link from 'next/link'
import { Reveal } from './motion-ui'

export function PageHero({eyebrow,title,accent,description,image='/assets/savyora-floor.jpg',number='01'}:{eyebrow:string,title:string,accent:string,description:string,image?:string,number?:string}){
 return <section className="page-hero"><div className="page-hero-image" style={{backgroundImage:`url("${image}")`}}/><div className="page-hero-shade"/><Reveal className="page-hero-copy"><span className="eyebrow"><i/>{eyebrow}</span><h1>{title}<br/><em>{accent}</em></h1><p>{description}</p><div className="page-hero-meta"><Link href="/membership">Find your way in <b>↗</b></Link><span>THE SAVYORA FITNESS · PESHAWAR</span></div></Reveal><span className="page-hero-index">{number} <i>— 06</i></span></section>
}
