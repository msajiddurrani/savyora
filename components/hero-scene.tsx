"use client"

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import type * as THREEType from 'three'

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return
    let renderer: THREEType.WebGLRenderer | undefined
    let frame = 0
    let observer: ResizeObserver | undefined
    let dispose: (() => void) | undefined
    let stopped = false

    import('three').then(THREE => {
      if (stopped) return
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(32, 1, .1, 50)
      camera.position.set(0, .05, 7.2)
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
      renderer.setSize(canvas.clientWidth || 500, canvas.clientHeight || 500, false)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.25

      scene.add(new THREE.HemisphereLight(0xe5c8ff, 0x170b23, 2.15))
      const key = new THREE.PointLight(0xff36e0, 46, 16); key.position.set(3, 2.5, 4); scene.add(key)
      const fill = new THREE.PointLight(0x772cff, 38, 14); fill.position.set(-3, -2, 2); scene.add(fill)
      const cool = new THREE.PointLight(0xb7d8ff, 20, 12); cool.position.set(0, 3, -2); scene.add(cool)

      const rig = new THREE.Group(); scene.add(rig)
      const darkSteel = new THREE.MeshPhysicalMaterial({ color: 0x25202c, metalness: .88, roughness: .2, clearcoat: .7 })
      const violet = new THREE.MeshPhysicalMaterial({ color: 0x7123d7, metalness: .72, roughness: .21, clearcoat: 1, emissive: 0x31065c, emissiveIntensity: .48 })
      const magenta = new THREE.MeshPhysicalMaterial({ color: 0xc027bb, metalness: .8, roughness: .19, clearcoat: 1, emissive: 0x4c073e, emissiveIntensity: .34 })
      const silver = new THREE.MeshPhysicalMaterial({ color: 0xc9c4d3, metalness: .94, roughness: .16, clearcoat: 1 })
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(.055, .055, 2.75, 32), silver); rod.rotation.z = Math.PI/2; rig.add(rod)
      for (const side of [-1,1]) {
        const plate = new THREE.Mesh(new THREE.CylinderGeometry(.48,.48,.2,64), violet); plate.rotation.z=Math.PI/2; plate.position.x=side*1.1; rig.add(plate)
        const outer = new THREE.Mesh(new THREE.CylinderGeometry(.36,.36,.2,64), magenta); outer.rotation.z=Math.PI/2; outer.position.x=side*1.31; rig.add(outer)
        const inner = new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.11,48), darkSteel); inner.rotation.z=Math.PI/2; inner.position.x=side*.94; rig.add(inner)
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.12,32), silver); collar.rotation.z=Math.PI/2; collar.position.x=side*.79; rig.add(collar)
      }
      const haloGroup = new THREE.Group(); rig.add(haloGroup)
      const halo1 = new THREE.Mesh(new THREE.TorusGeometry(1.9,.012,8,180), new THREE.MeshBasicMaterial({ color:0xdf59ff, transparent:true, opacity:.72 })); halo1.rotation.x=.83; halo1.rotation.y=.25; haloGroup.add(halo1)
      const halo2 = new THREE.Mesh(new THREE.TorusGeometry(2.15,.009,8,180), new THREE.MeshBasicMaterial({ color:0xf33bd3, transparent:true, opacity:.5 })); halo2.rotation.x=1.15; halo2.rotation.y=-.28; haloGroup.add(halo2)

      const positions = new Float32Array(420 * 3)
      for(let i=0;i<420;i++){const radius=2.15+Math.random()*.65,theta=Math.random()*Math.PI*2,phi=Math.acos(2*Math.random()-1);positions[i*3]=radius*Math.sin(phi)*Math.cos(theta);positions[i*3+1]=radius*Math.sin(phi)*Math.sin(theta);positions[i*3+2]=radius*Math.cos(phi)}
      const particleGeometry=new THREE.BufferGeometry();particleGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3))
      const particles=new THREE.Points(particleGeometry,new THREE.PointsMaterial({color:0xe7b4ff,size:.017,transparent:true,opacity:.78,sizeAttenuation:true}));rig.add(particles)
      const core = new THREE.Mesh(new THREE.SphereGeometry(.16,32,32),new THREE.MeshBasicMaterial({color:0xf0b9ff}));core.position.z=.08;rig.add(core)

      let pointerX=0,pointerY=0,targetX=0,targetY=0
      const onPointer=(e:PointerEvent)=>{const r=canvas.getBoundingClientRect();targetY=((e.clientX-r.left)/r.width-.5)*.3;targetX=((e.clientY-r.top)/r.height-.5)*.2}
      const onLeave=()=>{targetX=0;targetY=0}
      canvas.addEventListener('pointermove',onPointer);canvas.addEventListener('pointerleave',onLeave)
      observer=new ResizeObserver(()=>{if(!renderer)return;const w=Math.max(1,canvas.clientWidth),h=Math.max(1,canvas.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()})
      observer.observe(canvas)
      const tick=(time:number)=>{frame=requestAnimationFrame(tick);const t=time*.00028;pointerX+=(targetX-pointerX)*.035;pointerY+=(targetY-pointerY)*.035;rig.rotation.x=pointerX+Math.sin(t*.7)*.045;rig.rotation.y=pointerY+Math.sin(t)*.18;rig.rotation.z=Math.sin(t*.62)*.055;haloGroup.rotation.y=t*.42;particles.rotation.y=-t*.08;renderer?.render(scene,camera)}
      frame=requestAnimationFrame(tick)
      dispose=()=>{cancelAnimationFrame(frame);observer?.disconnect();canvas.removeEventListener('pointermove',onPointer);canvas.removeEventListener('pointerleave',onLeave);scene.traverse(obj=>{const mesh=obj as THREEType.Mesh;if(mesh.geometry)mesh.geometry.dispose();const material=mesh.material as THREEType.Material|THREEType.Material[]|undefined;if(Array.isArray(material))material.forEach(m=>m.dispose());else material?.dispose()});renderer?.dispose()}
    }).catch(()=>{canvas.dataset.fallback='true'})
    return ()=>{stopped=true;dispose?.();observer?.disconnect();cancelAnimationFrame(frame);renderer?.dispose()}
  }, [reduced])

  return <div className="hero-scene-wrap" aria-hidden="true"><div className="scene-aura"/><canvas ref={canvasRef} className="hero-scene" data-fallback="false"/><div className="scene-ring scene-ring-a"/><div className="scene-ring scene-ring-b"/></div>
}
