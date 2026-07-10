import React, {useRef} from 'react'
import AnimatedTitle from './AnimatedTitle'
import {gsap} from 'gsap'

const Story = () => {
  const frameRef = useRef(null)
  const handleMouseLeave = () => {
    const element = frameRef.current;
    if (!element) return;
    gsap.to(element, {
      rotationY: 0,
      rotationX: 0,
      ease: 'power1.out',
      duration: 0.3,
      transformPerspective: 500,
    });
  };
  const handleMouseMove = (e) => {
    const {clientX,clientY} = e;
    const element = frameRef.current;

    if(!element) return;
    const rect= element.getBoundingClientRect();
    const x=clientX-rect.left;
    const y=clientY-rect.top;
    const centerX=rect.width/2;
    const centerY=rect.height/2;

    const rotateX=((y-centerY)/centerY)*-10;
    const rotateY=((x-centerX)/centerX)*10;
    gsap.to(element,{
      rotationY:rotateY,
      rotationX:rotateX,
      ease:'power1.out',
      duration:0.3,
      transformPerspective:500,
    })
  }
  return (
    <section id='story' className=' w-screen min-h-dvh bg-black text-blue-50'>
     <div className='flex size-full flex-col items-center py-10 pb-24'>
      <p className='font-general text-sm uppercase md:text-[10px]'>the multiversal ip world</p>
      <div className='relative size-full'>
       <AnimatedTitle title='The Story of hidden rem' sectionID='#story'
       containerClass='mt-5 pointer-events-none mix-blend-difference relative z-10' />
       <div className='story-img-container'>
        <div className='story-img-mask'>
          <div className='story-img-content'>
            <img ref={frameRef} onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseLeave}
            onMouseMove={handleMouseMove}
            src="/img/entrance.webp" alt="entrance"
            className='object-contain'/>
          </div>
        </div>
       </div>
      </div>
     </div>
     <svg className="absolute" style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
      <defs>
       <filter id="flt_tag">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
       </filter>
      </defs>
     </svg>
    </section>
  )
}

export default Story