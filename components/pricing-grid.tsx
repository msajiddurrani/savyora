import Link from 'next/link'

export const plans=[
  {name:'Cardio only',price:'2,000',tag:'CARDIO',description:'A focused start for endurance.',items:['Treadmill','Cycling','Elliptical'],excluded:'Gym strength-training access is excluded.'},
  {name:'Gym only',price:'6,000',tag:'STRENGTH',description:'Make the strength floor yours.',items:['Strength area','Dumbbells','Machine area'],excluded:'Cardio access is excluded.'},
  {name:'Gym + cardio',price:'8,000',tag:'FULL ACCESS',description:'Gym and cardio, all month.',items:['Full gym','Cardio access'],highlight:true},
  {name:'Student full access',price:'6,000',tag:'STUDENT OFFER',description:'Full gym and cardio for eligible students.',items:['Full gym','Cardio access'],saving:'Save PKR 2,000/month vs regular full access'},
]

export function PricingGrid({compact=false}:{compact?:boolean}){
  const data=compact?plans.slice(1):plans
  return <div className={`pricing-grid ${compact?'pricing-grid-compact':''}`}>
    {data.map((plan,index)=><article className={`pricing-card ${plan.highlight?'pricing-card-featured':''} ${plan.saving?'pricing-card-student':''}`} key={plan.name}>
      <div className="pricing-card-head"><span>{plan.tag}</span><span>0{index+1} / 0{data.length}</span></div><h3>{plan.name}</h3><div className="price-line"><span className="price-currency">PKR</span><strong>{plan.price}</strong><span className="price-period">/ month</span></div><p>{plan.description}</p><ul>{plan.items.map(i=><li key={i}><span>+</span>{i}</li>)}</ul>{plan.excluded&&<p className="plan-exclusion">{plan.excluded}</p>}{plan.saving&&<p className="student-saving">{plan.saving}</p>}
      <Link className="plan-link" href={`/membership?plan=${encodeURIComponent(plan.name)}`}>Enquire about this plan <span>↗</span></Link>
    </article>)}
  </div>
}
