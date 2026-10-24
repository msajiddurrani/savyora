"use client"

import Link from 'next/link'
import {AnimatePresence, motion, useReducedMotion} from 'motion/react'
import {useMemo, useState} from 'react'
import {useRouter} from 'next/navigation'

const facilityData=[
 {n:'01',cat:'TRAIN',key:'train',name:'Strength & conditioning',desc:'Professional machines, dumbbells, free weights and machine training.',image:'/assets/savyora-strength-floor.webp'},
 {n:'02',cat:'TRAIN',key:'train',name:'HYROX functional arena',desc:'Functional endurance and metabolic conditioning.',image:'/assets/savyora-functional-zone.webp'},
 {n:'03',cat:'TRAIN',key:'train',name:'Boxing & combat zone',desc:'Dedicated bags and striking setups for combat training.',image:'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1400&q=88'},
 {n:'04',cat:'TRAIN',key:'train',name:'Group fitness studio',desc:'Group workouts, HIIT and metabolic classes.',image:'/assets/savyora-group-training.webp'},
 {n:'05',cat:'RECOVER',key:'recover',name:'Post-workout massage chairs',desc:'A relaxation and recovery area after training.',image:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=88'},
 {n:'06',cat:'RECOVER',key:'recover',name:'Hot & cold modern showers',desc:'Temperature-controlled shower facilities.',image:'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1400&q=88'},
 {n:'07',cat:'RECOVER',key:'recover',name:'Washrooms & lockers',desc:'Hygienic washrooms, secure lockers and changing lounges.',image:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=88'},
 {n:'08',cat:'REFUEL',key:'refuel',name:'Savyora Fitness Café',desc:'Clean meals, fresh drinks, pre-workout shots and post-workout shakes.',image:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=88'},
 {n:'09',cat:'REFUEL',key:'refuel',name:'Protein & supplement store',desc:'Advertised verified whey isolate, creatine, vitamins and pre-workouts.',image:'https://images.unsplash.com/photo-1579722821273-0f6c1e9f5b2e?auto=format&fit=crop&w=1400&q=88'},
 {n:'10',cat:'REFUEL',key:'refuel',name:'Aesthetics studio & apparel',desc:'Savyora pump covers, compression wear and gym clothing.',image:'/assets/savyora-training.jpg'},
 {n:'11',cat:'COMMUNITY',key:'community',name:'Kids care & play area',desc:'A supervised children’s play area.',image:'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1400&q=88'},
 {n:'12',cat:'COMMUNITY',key:'community',name:'Clinical nutrition & coaching desk',desc:'Nutrition and fitness coaching, including Aiman Hamid.',image:'/assets/savyora-coaching-session.webp'},
]
const filters=[['all','ALL SPACES'],['train','TRAIN'],['recover','RECOVER'],['refuel','REFUEL'],['community','COMMUNITY']]

function SpaceCard({space,index,onSelect,active,reduced,disabled=false}:{space:typeof facilityData[number],index:number,onSelect?:()=>void,active?:boolean,reduced:boolean,disabled?:boolean}){
 return <motion.button type="button" className={`facility-card ${active?'facility-card-active':''}`} aria-pressed={active} aria-hidden={disabled||undefined} aria-label={`${space.name}. ${active?'Current selection.':'Select facility.'}`} disabled={disabled} onClick={onSelect}
  initial={reduced?false:{opacity:0,y:25,rotateX:8}}
  whileInView={{opacity:1,y:0,rotateX:0}}
  viewport={{once:true,amount:.1}}
  transition={{duration:.58,delay:index*.035,ease:[.22,1,.36,1]}}
  whileHover={reduced?undefined:{y:-12,z:34,rotateX:-5,rotateY:3,scale:1.035,boxShadow:'0 26px 70px rgba(136,31,198,.38)'}}>
  <span className="facility-image"><img src={space.image} alt="" loading="lazy"/><i className="facility-shine"/><span>{space.n} / {space.cat}</span><b aria-hidden="true">↗</b></span>
  <span className="facility-info"><strong>{space.name}</strong><span>{space.desc}</span></span>
 </motion.button>
}

export function FacilityBrowser({preview=false}:{preview?:boolean}){
 const router=useRouter()
 const [category,setCategory]=useState('all')
 const [selectedId,setSelectedId]=useState('01')
 const reduced=useReducedMotion()
 const visible=useMemo(()=>facilityData.filter(f=>category==='all'||f.key===category),[category])
 const selectedIndex=Math.max(0,visible.findIndex(f=>f.n===selectedId))
 const selected=visible[selectedIndex]||visible[0]
 const chooseCategory=(key:string)=>{setCategory(key);const first=facilityData.find(f=>key==='all'||f.key===key);if(first)setSelectedId(first.n)}
 const move=(direction:number)=>setSelectedId(visible[(selectedIndex+direction+visible.length)%visible.length].n)
 const relative=(index:number)=>{let delta=index-selectedIndex;const half=visible.length/2;if(delta>half)delta-=visible.length;if(delta< -half)delta+=visible.length;return delta}
 return <>
  {!preview&&<div className="facility-tabs" role="group" aria-label="Filter facilities by category">{filters.map(([id,label])=><button type="button" key={id} aria-pressed={category===id} className={category===id?'selected':''} onClick={()=>chooseCategory(id)}><span>{label}</span><i>{id==='all'?'12':facilityData.filter(f=>f.key===id).length.toString().padStart(2,'0')}</i></button>)}</div>}
  {preview?<div className="facility-grid facility-grid-preview" style={{perspective:1400}}>{facilityData.slice(0,4).map((f,i)=><SpaceCard key={f.n} space={f} index={i} reduced={!!reduced} onSelect={()=>router.push('/facilities')}/>)}</div>:<>
   <div className="facility-carousel" role="region" aria-roledescription="carousel" aria-label="Savyora facility collection">
    <div className="carousel-stage" tabIndex={0} onKeyDown={event=>{if(event.key==='ArrowRight')move(1);if(event.key==='ArrowLeft')move(-1)}}>{visible.map((space,index)=>{const delta=relative(index);return <motion.div key={space.n} className={`carousel-position ${delta===0?'is-current':''}`} drag={delta===0?'x':false} dragConstraints={{left:0,right:0}} dragElastic={.16} onDragEnd={(_,info)=>{if(info.offset.x<-70)move(1);if(info.offset.x>70)move(-1)}} animate={{x:`calc(-50% + ${delta*clampOffset()}px)`,scale:delta===0?1:Math.max(.61,.86-Math.abs(delta)*.095),rotateY:delta===0?0:delta>0?-27:27,rotateZ:delta===0?0:delta>0?1.7:-1.7,opacity:Math.abs(delta)>2?0:Math.abs(delta)===2?.48:Math.abs(delta)===1?.8:1,zIndex:20-Math.abs(delta)*3,filter:Math.abs(delta)>1?'brightness(.68) saturate(.75)':'brightness(1) saturate(1)'}} transition={{type:'spring',stiffness:145,damping:23,mass:.85}} style={{transformStyle:'preserve-3d',pointerEvents:Math.abs(delta)>1?'none':'auto'}}><SpaceCard space={space} index={index} active={delta===0} onSelect={()=>setSelectedId(space.n)} reduced={!!reduced} disabled={Math.abs(delta)>1}/></motion.div>})}</div>
    <button type="button" className="carousel-control carousel-previous" onClick={()=>move(-1)} aria-label="Previous facility">←</button><button type="button" className="carousel-control carousel-next" onClick={()=>move(1)} aria-label="Next facility">→</button>
    <div className="carousel-meta"><span>SPACE <b>{selected.n}</b> <i>/ {visible.length.toString().padStart(2,'0')}</i></span><span>SWIPE <b>·</b> USE ARROWS <b>·</b> SELECT A CARD</span></div>
   </div>
   <div className="carousel-progress" role="group" aria-label="Choose facility">{visible.map(space=><button key={space.n} type="button" aria-label={`Show ${space.name}`} aria-current={selectedId===space.n?'true':undefined} onClick={()=>setSelectedId(space.n)}><i/></button>)}</div>
   <div className="carousel-selected-copy" aria-live="polite"><AnimatePresence mode="wait"><motion.div key={selected.n} initial={reduced?false:{opacity:0,y:12,filter:'blur(5px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} exit={{opacity:0,y:-8}} transition={{duration:.3}}><span>{selected.cat} / THE SAVYORA EXPERIENCE</span><h2>{selected.name}</h2><p>{selected.desc}</p></motion.div></AnimatePresence><Link className="text-link" href="/contact">Ask about this space <b>↗</b></Link></div>
  </>}
  {preview&&<div className="section-action"><Link className="button button-outline" href="/facilities">Explore all 12 zones <span>↗</span></Link></div>}
 </>
}

function clampOffset(){if(typeof window==='undefined')return 230;return Math.min(260,Math.max(160,window.innerWidth*.235))}

