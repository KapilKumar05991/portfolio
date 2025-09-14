import { lazy, Suspense, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from './Button';
import { ArrowRight, FileDown } from 'lucide-react';
import { Loading } from './Loading';
import { SplitText } from 'gsap/SplitText';
const RotatingEarth = lazy(() => import('../models/RotatingEarth'))



export default function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const para1Ref = useRef(null);
  const para2Ref = useRef(null);
  
  
  useEffect(() => {
    gsap.registerPlugin(SplitText)
    const segmenter = new Intl.Segmenter("zh", { granularity: "word" });
    document.fonts.ready.then(() => {
      [titleRef, subtitleRef, para1Ref, para2Ref].forEach(ref => {
        if (ref.current) {
          gsap.set(ref.current, { opacity: 1 });

          SplitText.create(ref.current, {
            type: "words",
            wordsClass: "word",
            prepareText: (text) => {
              return [...segmenter.segment(text)].map(s => s.segment).join(String.fromCharCode(8204));
            },
            wordDelimiter: { delimiter: /\u200c/, replaceWith: " " },
            autoSplit: true,
            onSplit: (self) => {
              return gsap.from(self.words, {
                y: 50,
                opacity: 0,
                delay: 0.05,
                duration: 1,
                stagger: {
                  each: 0.15,
                  from: "start"
                },
                ease: "power1.out"
              });
            }
          });
        }
      });
    });
  }, []);

  return (
    <section id="hero" className="lg:min-h-[90vh] flex items-center justify-center p-2 sm:p-4">
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row md:items-stretch items-center justify-between gap-4">
        {/* Left: Animated Text */}
        <div className="glass backdrop-blur-3xl p-4 px-8 py-4 lg:py-6 flex flex-col gap-4">
          <h1 ref={titleRef} className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Hi, I'm <span className="text-blue-400">Kapil Kumar</span>
          </h1>
          <h2 ref={subtitleRef} className="text-2xl lg:text-3xl font-semibold">
            Full Stack Developer & Tech Enthusiast
          </h2>
          <p ref={para1Ref} className="lg:text-xl max-w-xl">
            I build interactive, visually stunning web experiences with React, Next.js, and modern web technology.
          </p>
          <p ref={para2Ref} className="lg:text-xl max-w-xl">
            Whether it’s crafting sleek interfaces, optimizing performance, I bring creativity and precision to every challenge. Let’s build something great together!
          </p>
          <div className='flex gap-1.5'>
            <Button size='small'><a href="#about">Explore<ArrowRight className='inline' /></a></Button>
            <Button size='small'><a href='/kapilkumar.pdf' download={true}>Resume <FileDown className='inline' /></a></Button>
          </div>
        </div>
        {/* Right: 3D Rotating Earth */}
        <div className="md:w-2/5 h-80 md:h-[400px] border-4 rounded-lg border-gray-400 bg-gray-950 flex items-center justify-center w-full">
          <Suspense fallback={<Loading />}>
            <RotatingEarth />
          </Suspense>
        </div>
      </div>
    </section>
  );
} 