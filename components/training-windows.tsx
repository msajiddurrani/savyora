import { Reveal } from './motion-ui'

const windows=[
 {n:'01',name:'Morning prime',time:'6:00 AM — 11:00 AM',type:'CO-TRAINING',desc:'Start early, claim your space and build a steady rhythm before the day opens up.'},
 {n:'02',name:'Female-only privacy slot',time:'11:00 AM — 4:30 PM',type:'WOMEN ONLY',desc:'Dedicated women-only training hours with advertised privacy arrangements, dedicated security and female trainers.'},
 {n:'03',name:'Evening co-time',time:'4:30 PM — 11:30 PM',type:'CO-TRAINING',desc:'Make room for your workout after work, study or everything else the day brings.'},
]
export default function TrainingWindows(){return <div className="training-windows">{windows.map((w,i)=><Reveal className={`window-card ${i===1?'window-featured':''}`} delay={i*.08} key={w.n}><div className="window-top"><span>{w.n} / DAILY WINDOW</span><i>{w.type}</i></div><h3>{w.name}</h3><strong>{w.time}</strong><p>{w.desc}</p><div className="window-bottom"><span>MON — SUN</span><span>CONFIRM HOLIDAY HOURS WITH THE TEAM ↗</span></div></Reveal>)}</div>}
