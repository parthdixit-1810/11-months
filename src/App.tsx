/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { 
  Heart, 
  Music, 
  Lock, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Volume2,
  Play,
  Star,
  Mic,
  Square,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Constants & Data ---

const DESTINATION_NAME = "Anshi";
const NICKNAME = "Anshi";
const SENDER_NAME = "Parth";

const MEMORIES = [
  {
    title: "Our Team Jersey",
    desc: "the way we both wore the same colors and felt like one team — in everything.",
    image: "/input_file_0.png",
    size: "large"
  },
  {
    title: "Pizza Hut Night",
    desc: "the thumbs up, the cheesy crust, and the way everything felt so right just being with you.",
    image: "/input_file_1.png",
    size: "small"
  },
  {
    title: "Blissful Selfie",
    desc: "blurry lights, messy hair, and a smile that I carry in my heart every single day.",
    image: "/input_file_2.png",
    size: "small"
  },
  {
    title: "Mirror Moment",
    desc: "capturing a piece of pure, quiet love that I wish I could live in forever.",
    image: "/input_file_3.png",
    size: "wide"
  },
  {
    title: "The Cable Bridge",
    desc: "riding through the lights of Hyderabad, feeling the wind and your presence beside me.",
    image: "/input_file_4.mp4",
    size: "small",
    isVideo: true
  }
];

const PROMISES = [
  {
    id: "01",
    title: "I will pause before I react.",
    desc: "Before any sharp word, before any cold silence — I will breathe, and I will choose you."
  },
  {
    id: "02",
    title: "I will match your effort.",
    desc: "You drive across cities for me. The least I can do is travel the distance in care, every single day."
  },
  {
    id: "03",
    title: "I will see what you do.",
    desc: "The cooking. The picking up. The planning. The little things. I'll thank you out loud, every time."
  },
  {
    id: "04",
    title: "I will fight for our time, not in it.",
    desc: "Days like that one are sacred. I won't waste another minute of them being anything less than yours."
  },
  {
    id: "05",
    title: "I will be soft with you.",
    desc: "You're brave with me. I want to be the safest place you ever land — not the place you have to defend yourself in."
  },
  {
    id: "06",
    title: "I will choose you, again and again.",
    desc: "On the easy days. On the hard ones. On days I'm tired, scared, or unsure. Always you, Anshi."
  }
];

const QUOTES = [
  {
    text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    author: "Maya Angelou"
  },
  {
    text: "I want you to be happy. I want you to be cared for. I want you to be loved by the version of me you deserve.",
    author: "Anonymous"
  },
  {
    text: "My heart is and always will be yours.",
    author: "Jane Austen"
  }
];

// --- Floating Hearts Background ---
function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            y: "110%", 
            x: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            opacity: [0, 0.2, 0], 
            y: "-10%" 
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute"
        >
          <Heart className="text-accent fill-accent opacity-20" size={Math.random() * 20 + 10} />
        </motion.div>
      ))}
    </div>
  );
}

// --- Background Magic Particles ---
function MagicParticles({ yRange = [-50, 50] }: { yRange?: [number, number] }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.2], yRange);

  return (
    <motion.div style={{ y }} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            scale: Math.random() * 0.4 + 0.2,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`
          }}
          animate={{ 
            opacity: [0, 0.4, 0],
            x: [
              `${Math.random() * 100}%`, 
              `${(Math.random() * 100) + (Math.random() * 20 - 10)}%`
            ],
            y: [
              `${Math.random() * 100}%`, 
              `${(Math.random() * 100) - 15}%`
            ]
          }}
          transition={{ 
            duration: Math.random() * 15 + 15, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
          className="absolute"
        >
          {Math.random() > 0.5 ? (
            <div className="w-1.5 h-1.5 bg-accent/40 rounded-full blur-[2px]" />
          ) : (
            <Heart className="text-accent/30 fill-accent/10" size={12} />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

// --- Interactive Flower ---
function BloomingFlower({ size = 100, className = "" }: { size?: number, className?: string }) {
  const [active, setActive] = useState(false);
  
  return (
    <div 
      className={`relative group cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive(!active)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
         {/* Inner Petal Layer (Lighter) */}
         {[...Array(8)].map((_, i) => (
           <motion.div
              key={`inner-${i}`}
              initial={{ scale: 0, rotate: i * 45 }}
              animate={{ 
                scale: active ? 1.1 : 0.3,
                rotate: active ? (i * 45) + 20 : (i * 45),
                rotateX: active ? 0 : 60,
                y: active ? -8 : 0,
                backgroundColor: active ? '#FDA4AF' : '#FECDD3',
                filter: active ? 'blur(0px)' : 'blur(1px)'
              }}
              transition={{ 
                type: "spring", 
                stiffness: active ? 120 : 60, 
                damping: 15,
                delay: i * 0.04
              }}
              className="absolute w-[45%] h-[60%] rounded-full origin-bottom border border-accent/20 z-10"
              style={{ 
                borderRadius: '50% 50% 20% 20%',
                bottom: '50%',
                opacity: 0.8
              }}
           />
         ))}

         {/* Outer Petal Layer (More Vibrant) */}
         {[...Array(8)].map((_, i) => (
           <motion.div
              key={`outer-${i}`}
              initial={{ scale: 0, rotate: i * 45 + 22.5 }}
              animate={{ 
                scale: active ? 1.4 : 0.5,
                rotate: active ? (i * 45 + 22.5) - 10 : (i * 45 + 22.5),
                rotateX: active ? 15 : 45,
                y: active ? -12 : -5,
                backgroundColor: active ? '#FB7185' : '#FDA4AF'
              }}
              transition={{ 
                type: "spring", 
                stiffness: active ? 100 : 50, 
                damping: 20,
                delay: i * 0.06
              }}
              className="absolute w-1/2 h-[75%] rounded-full origin-bottom border border-accent/30"
              style={{ 
                borderRadius: '50% 50% 30% 30%',
                bottom: '50%',
                opacity: active ? 0.7 : 0.4
              }}
           />
         ))}

         {/* Center/Stamen */}
         <motion.div 
           animate={{ 
             scale: active ? 1.3 : 0.7,
             backgroundColor: active ? '#F59E0B' : '#FBBF24',
             boxShadow: active 
               ? '0 0 25px 8px rgba(245, 158, 11, 0.5)' 
               : '0 0 10px 2px rgba(251, 191, 36, 0.2)'
           }}
           className="w-1/4 h-1/4 rounded-full z-20 transition-all duration-500"
         />
      </div>
    </div>
  );
}

// --- Petal Trail Interaction ---
function PetalTrail() {
  const [petals, setPetals] = useState<{ id: number, x: number, y: number, rotate: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.85) { // Throttle emissions
        const newPetal = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          rotate: Math.random() * 360
        };
        setPetals(prev => [...prev, newPetal].slice(-15));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {petals.map(petal => (
          <motion.div
            key={petal.id}
            initial={{ opacity: 0.6, scale: 0, x: petal.x, y: petal.y, rotate: petal.rotate }}
            animate={{ 
              opacity: 0, 
              scale: 1, 
              y: petal.y + 100, 
              x: petal.x + (Math.random() * 100 - 50),
              rotate: petal.rotate + 180 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute"
          >
             <div className="w-3 h-5 bg-accent/40 rounded-full blur-[1px]" style={{ borderRadius: '50% 50% 20% 20%' }} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// --- Memory Card Component with Parallax ---
function MemoryCard({ 
  index, 
  className = "", 
  yRange = [0, 0], 
  delay = 0, 
  isVideo = false 
}: { 
  index: number, 
  className?: string, 
  yRange?: [number, number], 
  delay?: number,
  isVideo?: boolean
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={`group relative rounded-[48px] overflow-hidden border border-primary/5 shadow-2xl ${className}`}
    >
      <motion.div style={{ y: scrollY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        {isVideo ? (
          <video 
            src={MEMORIES[index].image} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          />
        ) : (
          <img 
            src={MEMORIES[index].image} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          />
        )}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent p-12 flex flex-col justify-end">
         <h3 className="text-4xl md:text-6xl font-serif text-white mb-4 leading-none tracking-tighter">{MEMORIES[index].title}</h3>
         <div className="w-12 h-[1px] bg-accent mb-6 group-hover:w-24 transition-all duration-700" />
         <AnimatePresence>
            <p className="font-script text-2xl md:text-3xl text-accent leading-tight italic">{MEMORIES[index].desc}</p>
         </AnimatePresence>
      </div>
    </motion.div>
  );
}

// --- Voice Note Section ---
function VoiceNoteSection() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const transcript = "Hey Anshi... I've been trying to find the right words to say this, but I think hearing my voice might be better. I'm so sorry for everything that happened. That day was supposed to be about us, and I let my reactions get in the way. You did so much for me - the food, the ride, the planning - and I didn't appreciate it the way I should have. I love you more than words can say, and I promise to be better. For you, for us. Always.";

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };
      
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
      setShowTranscript(false);
    }
  };

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <section className="py-60 px-6 bg-white overflow-hidden border-t border-primary/5">
      <div className="max-w-4xl mx-auto text-center">
        <span className="font-script text-3xl text-accent mb-6 block">a voice for the silence</span>
        <h2 className="text-6xl md:text-8xl font-serif text-primary mb-16 tracking-tight">Personal <br/><span className="italic text-accent">Voice Apology.</span></h2>
        
        <div className="bg-bg-cream/40 p-12 md:p-20 rounded-[64px] border border-primary/5 shadow-xl relative overflow-hidden backdrop-blur-sm">
           {/* Visualizer simulation */}
           {isRecording && (
             <div className="absolute top-0 left-0 right-0 h-4 flex items-end gap-1 px-4 overflow-hidden opacity-30">
               {[...Array(60)].map((_, i) => (
                 <motion.div
                   key={i}
                   animate={{ height: [4, Math.random() * 40 + 10, 4] }}
                   transition={{ duration: 0.4 + Math.random() * 0.4, repeat: Infinity }}
                   className="flex-1 bg-accent rounded-full"
                 />
               ))}
             </div>
           )}

           <div className="flex flex-col items-center gap-12 relative z-10">
             {!audioUrl ? (
               <div className="flex flex-col items-center gap-10">
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={isRecording ? stopRecording : startRecording}
                   className={`w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-2xl relative ${isRecording ? 'bg-red-500' : 'bg-primary'}`}
                 >
                   {isRecording && (
                     <motion.div 
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 bg-red-500 rounded-full"
                     />
                   )}
                   {isRecording ? <Square className="text-white relative z-10" size={40} fill="currentColor" /> : <Mic className="text-white" size={42} />}
                 </motion.button>
                 <div className="space-y-4">
                    <p className="font-serif italic text-3xl text-primary">
                      {isRecording ? "I'm listening, Parth..." : "Click to record your heart's message."}
                    </p>
                    <p className="text-primary/30 font-sans text-sm tracking-widest uppercase font-bold">
                       {isRecording ? "Recording in progress" : "For Anshi to hear later"}
                    </p>
                 </div>
               </div>
             ) : (
               <div className="w-full flex flex-col items-center gap-12">
                 <div className="w-full max-w-2xl bg-white p-10 rounded-[48px] flex items-center gap-8 border border-primary/5 shadow-inner">
                   <motion.button 
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     onClick={playRecording}
                     className="w-24 h-24 bg-accent text-white rounded-full flex items-center justify-center shadow-lg pl-1"
                   >
                     <Play fill="currentColor" size={36} />
                   </motion.button>
                   
                   <div className="flex-1 flex flex-col gap-4">
                      <div className="h-3 bg-primary/5 rounded-full relative overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: "100%" }}
                           transition={{ duration: 12, ease: "linear" }}
                           className="absolute h-full bg-accent/60"
                         />
                      </div>
                      <div className="flex justify-between text-[10px] items-center uppercase tracking-widest text-primary/30 font-bold">
                         <span>0:00</span>
                         <span>Your Message</span>
                      </div>
                   </div>

                   <button 
                     onClick={deleteRecording}
                     className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center hover:bg-red-400 hover:text-white transition-all shadow-sm"
                   >
                     <Trash2 size={24} />
                   </button>
                 </div>
                 
                 <div className="flex flex-col items-center gap-8">
                    <button 
                      onClick={() => setShowTranscript(!showTranscript)}
                      className="text-primary/40 hover:text-accent font-sans text-xs uppercase tracking-[0.3em] font-bold transition-colors"
                    >
                      {showTranscript ? "Hide Transcript" : "Show Transcript"}
                    </button>

                    <AnimatePresence>
                      {showTranscript && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="max-w-xl overflow-hidden"
                        >
                           <p className="font-script text-3xl text-primary/60 leading-relaxed italic border-l-2 border-accent/20 pl-8 text-left">
                              "{transcript}"
                           </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="w-16 h-[1px] bg-primary/10" />
                 </div>
               </div>
             )}
           </div>
        </div>
      </div>
    </section>
  );
}

// --- Quotes Carousel ---
function QuotesSection({ currentQuote, setCurrentQuote }: { currentQuote: number, setCurrentQuote: React.Dispatch<React.SetStateAction<number>> }) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={containerRef} className="py-60 px-6 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <motion.span 
           style={{ x: bgX }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 md:-translate-x-[40%] -translate-y-1/2 text-[45vw] font-serif opacity-[0.05] text-white italic leading-none whitespace-nowrap select-none"
         >
           Archives
         </motion.span>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 px-8">
        <span className="text-[10px] tracking-[1em] uppercase text-accent font-bold mb-16 block">Borrowed Sentences</span>
        
        <div className="relative min-h-[400px] flex items-center justify-center">
           <AnimatePresence mode="wait">
             <motion.div
               key={currentQuote}
               initial={{ opacity: 0, scale: 0.95, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 1.05, y: -30 }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
               className="px-6 md:px-12 flex flex-col items-center"
             >
               <div className="flex justify-center gap-4 mb-20 opacity-30 scale-125">
                  <Star className="text-accent fill-accent" size={14} />
                  <Star className="text-accent fill-accent" size={14} />
                  <Star className="text-accent fill-accent" size={14} />
               </div>
               
               <motion.p 
                 className="text-4xl md:text-8xl font-serif text-white leading-[1.05] mb-16 italic tracking-tighter text-balance"
               >
                  “{QUOTES[currentQuote].text}”
               </motion.p>
               
               <div className="flex flex-col items-center gap-6">
                  <div className="w-16 h-[1px] bg-accent" />
                  <p className="font-script text-4xl text-accent italic opacity-80">— {QUOTES[currentQuote].author}</p>
               </div>
             </motion.div>
           </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-8 mt-24">
           <button 
              onClick={() => setCurrentQuote(prev => (prev - 1 + QUOTES.length) % QUOTES.length)}
              className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all group active:scale-90"
           >
             <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
           </button>
           
           <div className="flex gap-4 items-center">
             {QUOTES.map((_, i) => (
               <div 
                 key={i} 
                 className={`h-[2px] transition-all duration-700 ${currentQuote === i ? 'w-20 bg-accent' : 'w-4 bg-white/10'}`} 
               />
             ))}
           </div>

           <button 
              onClick={() => setCurrentQuote(prev => (prev + 1) % QUOTES.length)}
              className="w-16 h-16 rounded-full border border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all group active:scale-90 shadow-[0_0_30px_rgba(251,113,133,0.1)]"
           >
             <ChevronRight className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>
    </section>
  );
}

// --- Anniversary Tribute Section ---
function AnniversarySection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const videoY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const videoRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section ref={containerRef} className="py-60 px-6 bg-bg-cream overflow-hidden border-t border-primary/5 relative">
      {/* Decorative background text */}
      <motion.div 
        style={{ y: textY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] whitespace-nowrap"
      >
        <span className="text-[30vw] font-serif italic text-primary">Anniversary</span>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="lg:w-1/2"
          >
            <span className="font-script text-4xl text-accent mb-8 block">a year since that first walk...</span>
            <h2 className="text-7xl md:text-9xl font-serif text-primary leading-none mb-12 tracking-tight">Happy <br/><span className="italic text-accent underline decoration-accent/20 underline-offset-8">First Date</span> <br/>Anniversary.</h2>
            <div className="space-y-8 text-xl md:text-2xl font-serif text-primary/60 leading-relaxed max-w-xl italic">
              <p>
                Watching you throw this ball, hearing your laugh echoing in the alley — it's where my world started rotating differently. 
              </p>
              <p>
                From that first date to every single day after, being with you has been the greatest adventure of my life. I'm so lucky I get to be the one who cheers the loudest for you.
              </p>
            </div>
            <div className="mt-16 flex items-center gap-6">
              <div className="w-16 h-[1px] bg-accent" />
              <p className="font-script text-4xl text-primary/80">I love you, Anshi.</p>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: videoY, rotate: videoRotate }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2 w-full aspect-[9/16] max-w-md mx-auto relative group"
          >
             {/* Frame layers for a physical "scrapbook" feel */}
             <div className="absolute inset-0 bg-white shadow-2xl -rotate-2 scale-105 group-hover:-rotate-1 transition-transform duration-700" />
             <div className="absolute inset-0 bg-bg-cream/50 shadow-inner z-10 pointer-events-none border-4 border-white" />
             
             <div className="relative h-full overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.3)] border-8 border-white p-2">
                <video 
                  src="/input_file_6.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover" 
                />
                
                {/* Vintage overlay */}
                <div className="absolute inset-0 bg-accent/10 mix-blend-overlay pointer-events-none" />
                <div className="absolute top-8 left-8 z-20 flex flex-col gap-2 scale-75 origin-top-left opacity-60">
                   <div className="bg-red-500 w-4 h-4 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                   <span className="text-white font-mono text-xl tracking-widest uppercase">REC</span>
                </div>
             </div>

             {/* Sticker decoration */}
             <motion.div 
               animate={{ rotate: [0, 10, 0] }}
               transition={{ repeat: Infinity, duration: 4 }}
               className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FBBF24] rounded-full shadow-lg z-30 flex items-center justify-center -rotate-12 border-4 border-white hover:scale-110 transition-transform cursor-crosshair"
             >
                <div className="text-center font-bold font-serif text-primary leading-tight text-lg">
                   BEST <br/> DATE <br/> EVER
                </div>
             </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Password Gate ---
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    const p = password.toLowerCase().trim();
    if (p === 'pizza hut') {
      onUnlock();
    } else {
      setError(true);
      // Brief vibration or shake effect would be nice, but error state handles color
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6 z-50 overflow-hidden bg-primary">
      {/* Background with Dark Bokeh Blur */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[url('/input_file_2.png')] bg-cover bg-center blur-2xl scale-110" />
        <div className="absolute inset-0 bg-[#1a0508]/80" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl w-full bg-bg-cream p-10 md:p-20 shadow-[0_50px_100px_rgba(0,0,0,0.6)] relative border border-white/5 text-center overflow-hidden rounded-[20px] md:rounded-none"
      >
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex flex-col gap-6 p-10">
           {[...Array(15)].map((_, i) => (
             <div key={i} className="h-[1px] bg-primary w-full" />
           ))}
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-[#320a11] rounded-full flex items-center justify-center mb-10 md:mb-12 shadow-2xl">
            <Lock className="w-6 h-6 md:w-8 md:h-8 text-bg-cream" />
          </div>
          
          <span className="font-script text-3xl md:text-4xl text-accent mb-6 block">for Anshi only</span>
          <h1 className="text-3xl md:text-6xl font-serif text-primary mb-10 md:mb-12 leading-tight">
            A small key <br /> only you would know.
          </h1>

          <div className="mb-10 md:mb-14">
            <p className="text-[10px] md:text-[11px] tracking-[0.6em] md:tracking-[0.8em] uppercase text-primary/30 font-bold mb-4 md:mb-6">Hint</p>
            <p className="font-serif italic text-primary/60 text-lg md:text-2xl px-4">
              "What was the pizza place we first went to?"
            </p>
          </div>
          
          <div className="relative w-full px-4 md:px-12 mb-12 md:mb-16">
            <input 
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              placeholder="type your answer..."
              className={`w-full py-4 md:py-6 bg-transparent border-b ${error ? 'border-red-400' : 'border-primary/20'} focus:border-primary/50 outline-none transition-all text-center text-primary font-serif italic text-xl md:text-4xl placeholder:text-primary/10`}
            />
            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full left-0 right-0 mt-4 text-[10px] text-red-400 font-sans uppercase tracking-[0.2em]"
                >
                  That's not the place, try again my love...
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={handleUnlock}
            className="group flex items-center gap-4 bg-[#320a11] hover:bg-primary-light text-bg-cream px-10 py-5 md:px-12 md:py-6 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all active:scale-95 text-lg md:text-xl font-serif italic"
          >
            <Heart size={20} className="group-hover:fill-accent group-hover:text-accent transition-colors" />
            open my letter
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isForgiven, setIsForgiven] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleForgiveness = () => {
    setIsForgiven(true);
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#fb7185', '#ffffff', '#fda4af', '#fff1f2', '#f43f5e']
    });
  };

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="bg-bg-cream min-h-screen selection:bg-primary-light selection:text-white relative overflow-x-hidden">
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-noise z-[9999]" />
      
      <PetalTrail />
      <FloatingHearts />
      
      {/* --- TOP BRANDING --- */}
      <div className="fixed top-8 left-8 z-[100] mix-blend-difference">
         <span className="font-serif text-white/40 text-sm tracking-[0.5em] uppercase font-bold italic">P & A</span>
      </div>

      {/* --- SCROLL PROGRESS LINE --- */}
      <motion.div 
        className="fixed left-0 top-0 right-0 h-[2px] bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen bg-primary flex flex-col items-center justify-center text-center px-8 overflow-hidden">
        {/* Layered Atmospheric Background */}
        <div className="absolute inset-0">
           <MagicParticles />
           <motion.div 
             animate={{ 
               scale: [1, 1.15, 1],
               opacity: [0.2, 0.3, 0.2]
             }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="absolute top-1/4 left-1/4 w-[1000px] h-[1000px] bg-orange-200/10 rounded-full blur-[180px]" 
           />
           <motion.div 
             animate={{ 
               scale: [1.2, 1, 1.2],
               opacity: [0.15, 0.25, 0.15]
             }}
             transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
             className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-rose-300/10 rounded-full blur-[180px]" 
           />
        </div>

        <div className="z-10 max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-script text-3xl md:text-5xl text-accent mb-10 block italic"
          >
            for my {NICKNAME},
          </motion.span>
          
          <h1 className="overflow-hidden flex flex-wrap justify-center gap-x-6 md:gap-x-10 mb-6">
            {["I'm", "Sorry,"].map((word, i) => (
              <div key={i} className="overflow-hidden inline-block">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="text-8xl md:text-[12rem] font-serif text-white inline-block leading-[0.8] tracking-tighter"
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </h1>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="text-6xl md:text-9xl font-serif text-accent italic mb-20 tracking-tighter"
          >
            {DESTINATION_NAME}.
          </motion.h2>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, delay: 1.2 }}
            className="w-64 h-[1px] bg-white/10 mx-auto mb-16 origin-center" 
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="font-script text-3xl md:text-5xl text-white max-w-3xl mx-auto leading-tight italic px-4"
          >
            a small letter for the heart I hurt — written by the boy who can't stop thinking about you.
          </motion.p>
          
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20"
          >
            <p className="text-[10px] tracking-[1em] uppercase text-white font-bold whitespace-nowrap">Begin reading</p>
            <div className="h-12 w-[1px] bg-white mt-2" />
          </motion.div>
        </div>
      </section>

      {/* --- LETTER SECTION --- */}
      <section className="py-52 px-6 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-32 text-center"
          >
            <span className="font-script text-3xl text-accent mb-6 block">a letter from me to you</span>
            <h2 className="text-7xl md:text-9xl font-serif text-primary leading-[0.85] tracking-tightest">Forgive me, <br/><span className="italic">please.</span></h2>
          </motion.div>

          <div className="relative group">
            {/* Elegant Floating Element */}
            <motion.div 
              style={{ rotate: [0, 5, 0] }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-40 h-40 border border-primary/5 rounded-full pointer-events-none"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="bg-bg-cream/40 p-12 md:p-24 rounded-[60px] shadow-[0_60px_100px_rgba(50,10,17,0.03)] relative border border-primary/5 backdrop-blur-sm"
            >
              {/* Interactive Floral Border */}
              <div className="absolute -top-12 -left-12 flex flex-col gap-4">
                <BloomingFlower size={60} />
                <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4 }}><BloomingFlower size={40} /></motion.div>
              </div>
              <div className="absolute -bottom-12 -right-12 flex gap-4">
                <BloomingFlower size={80} />
                <BloomingFlower size={50} />
              </div>

              {/* Subtle line decoration */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex flex-col gap-10 p-24 overflow-hidden">
                 {[...Array(25)].map((_, i) => (
                   <div key={i} className="h-[1px] bg-primary w-full" />
                 ))}
              </div>

              <div className="relative z-10">
                <h3 className="font-script text-5xl text-primary mb-16">My dearest Anshi,</h3>
                
                <div className="space-y-12 text-xl md:text-2xl font-serif text-primary/70 leading-[1.7]">
                  {[
                    "I've been sitting with this for days now — turning it over in my head, in my chest, in my hands — and the only thing that keeps coming back is how much I let you down. You gave me one whole day, <span class='italic text-primary'>one rare, precious day</span>, and I didn't show up for it the way you deserved. I'm so sorry, my love.",
                    "You drove out to come <span class='italic text-primary'>pick me up</span>. You cooked for me with your own hands. You rented the scooty so we could ride together like old times. You took me back to all the places that hold pieces of us — and I, somewhere between all that love, reacted in a way that hurt the very person who was pouring herself into the day. That will haunt me for a while, and I think it should.",
                    "I'm sorry I made you feel small on a day you made enormous. I'm sorry I disappointed you, {NICKNAME}. I'm sorry I didn't hold your hand tighter when you held the world for me. You didn't deserve a single sharp word, a single careless silence, a single moment of me being anything less than the boy who is wildly, embarrassingly, unbearably in love with you.",
                    "I keep thinking about the way you laughed when we cuddled. The way you kissed me like the rest of the world had paused. The way every place we revisited became a little softer because <span class='italic text-accent animate-pulse'>you</span> were standing in it again. And I keep thinking — how did I, even for a second, make that day anything other than perfect for you?",
                    "I'm not writing this to be forgiven quickly. I'm writing this so you know that I <span class='italic'>see you</span>. I see everything you did. I see everything I missed. And I'm willing to do the work — quietly, patiently, every day — to be a softer, kinder, more present version of the boy you chose.",
                    "You are my favourite person in every version of this life. Please stay angry as long as you need. I'll be right here, holding the door open, with flowers in my hands and an apology in every sentence."
                  ].map((p, i) => (
                    <motion.p 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: i * 0.1, duration: 0.8 }}
                      dangerouslySetInnerHTML={{ __html: p.replace('{NICKNAME}', NICKNAME) }}
                    />
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-24 pt-12 border-t border-primary/5"
                >
                   <p className="font-script text-4xl text-primary/40 mb-4 italic">Yours, always —</p>
                   <p className="font-serif text-5xl text-primary tracking-widest uppercase font-bold">Parth</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MEMORIES BENTO SECTION --- */}
      <section className="py-60 px-6 bg-white overflow-hidden border-t border-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
            <div className="max-w-2xl">
              <span className="text-[10px] tracking-[0.6em] uppercase text-primary/30 font-bold mb-8 block">The Visual Diary</span>
              <h2 className="text-7xl md:text-9xl font-serif text-primary tracking-tighter leading-none">Moments that <br/><span className="italic">stay.</span></h2>
            </div>
            <div className="flex flex-col items-end text-right">
              <div className="border border-primary/20 p-8 rounded-full h-fit flex items-center justify-center animate-spin-slow mb-8">
                 <Heart className="text-accent" size={32} fill="currentColor" />
              </div>
              <p className="font-script text-3xl text-accent/60 max-w-xs italic leading-tight">
                "Every second with you is a frame I want to hang in my heart's hallway."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 auto-rows-[400px] md:auto-rows-[500px]">
             {/* Large Portrait - Memory 0: Jerseys */}
             <MemoryCard index={0} className="md:col-span-4 md:row-span-2" yRange={[-40, 40]} />

             {/* Small Square 1 - Memory 1: Pizza Hut */}
             <MemoryCard index={1} className="md:col-span-4" yRange={[20, -20]} delay={0.1} />

             {/* Small Square 2 - Memory 2: Selfie */}
             <MemoryCard index={2} className="md:col-span-4" yRange={[-30, 30]} delay={0.2} />

             {/* Small Square 3 - Memory 4: Cable Bridge */}
             <MemoryCard index={4} className="md:col-span-4" isVideo yRange={[40, -40]} delay={0.25} />

             {/* Ultra Wide Bottom - Memory 3: Mirror Kiss */}
             <MemoryCard index={3} className="md:col-span-8" yRange={[-50, 50]} delay={0.3} />
          </div>
        </div>
      </section>

      {/* --- PROMISES SECTION --- */}
      <section className="py-40 px-6 bg-bg-cream overflow-hidden">
        <div className="max-w-6xl mx-auto text-center mb-32">
          <span className="font-script text-3xl text-accent mb-4 block">the architecture of us</span>
          <h2 className="text-6xl md:text-9xl font-serif text-primary leading-[0.8] mb-12 tracking-tighter">Six things, <br/><span className="text-accent italic">sworn</span> quietly.</h2>
          <div className="w-32 h-[1px] bg-primary/10 mx-auto mt-16" />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {PROMISES.map((promise, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group relative"
            >
               <div className="bg-white border border-primary/5 p-12 rounded-[50px] transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_rgba(50,10,17,0.06)] group-hover:border-accent/10 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-10">
                       <span className="text-5xl font-serif text-primary/10 group-hover:text-accent/20 transition-colors italic leading-none">{promise.id}</span>
                       <div className="w-12 h-12 bg-bg-cream rounded-full flex items-center justify-center">
                          <Heart className="text-primary/10 group-hover:text-accent transition-colors group-hover:fill-accent" size={20} />
                       </div>
                    </div>
                    
                    <h4 className="text-2xl md:text-3xl font-serif text-primary mb-6 leading-tight group-hover:text-accent transition-colors">{promise.title}</h4>
                    <p className="text-primary/50 font-sans leading-relaxed text-lg">{promise.desc}</p>
                  </div>
                  
                  <div className="mt-12 h-[1px] w-0 bg-accent group-hover:w-full transition-all duration-700" />
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      <QuotesSection currentQuote={currentQuote} setCurrentQuote={setCurrentQuote} />

      <VoiceNoteSection />

      <AnniversarySection />

      {/* --- MUSIC SECTION --- */}
      <section className="py-40 px-6 bg-white overflow-hidden relative">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-32">
           <div className="lg:w-1/2 text-center lg:text-left">
              <span className="font-script text-3xl text-accent mb-6 block">press play, my love</span>
              <h2 className="text-6xl md:text-8xl font-serif text-primary mb-12 tracking-tight leading-[0.9]">A song for <br/><span className="italic">every version</span> of you.</h2>
              <div className="flex flex-col gap-8">
                 <p className="font-sans text-xl text-primary/40 leading-relaxed max-w-xl">
                    There are moments when words fail me, and that's when I turn to these melodies. They hold the weight of everything I want to say to you.
                 </p>
                 <div className="flex items-center justify-center lg:justify-start gap-4">
                    <Music className="text-accent h animate-pulse" size={32} />
                    <span className="font-script text-3xl text-primary/80">Listening is like hearing my own heart speak.</span>
                 </div>
              </div>
           </div>

           <div className="lg:w-1/2 w-full">
              <div className="relative group">
                 <div className="absolute inset-0 bg-accent/20 blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                 
                 <div className="bg-bg-cream/40 p-12 md:p-16 rounded-[64px] border border-primary/5 shadow-[0_40px_100px_rgba(50,10,17,0.05)] relative z-10 backdrop-blur-xl">
                    <div className="aspect-square bg-primary-light rounded-[48px] overflow-hidden relative mb-12 group cursor-pointer shadow-inner">
                       <img src="/input_file_0.png" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-28 h-28 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl pl-2 ring-12 ring-accent/10"
                          >
                             <Play size={44} fill="currentColor" />
                          </motion.button>
                       </div>
                       
                       {/* Animated Waveform Wrapper */}
                       <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-end gap-1 h-12">
                          {[...Array(12)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ height: [12, 48, 12] }}
                              transition={{ duration: 1 + Math.random(), repeat: Infinity, ease: "easeInOut", delay: Math.random() }}
                              className="w-1 bg-white/30 rounded-full"
                            />
                          ))}
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h3 className="text-3xl font-serif text-primary text-center mb-8">Tujhe Kitna Chahne Lage</h3>
                       <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-6 p-8 rounded-[32px] bg-white border border-primary/5 group/track hover:border-accent transition-all hover:shadow-lg hover:-translate-y-1">
                             <div className="w-14 h-14 bg-bg-cream rounded-2xl flex items-center justify-center text-accent group-hover/track:bg-accent group-hover/track:text-white transition-colors">
                                <Music size={24} />
                             </div>
                             <div className="flex-1">
                                <p className="text-xl font-serif text-primary group-hover/track:translate-x-1 transition-transform">Raabta</p>
                                <p className="text-primary/30 text-[10px] uppercase tracking-widest font-bold mt-1">Arijit Singh</p>
                             </div>
                             <button className="w-10 h-10 rounded-full border border-primary/5 flex items-center justify-center opacity-0 group-hover/track:opacity-100 transition-opacity">
                                <ChevronRight size={16} />
                             </button>
                          </div>
                          <div className="flex items-center gap-6 p-8 rounded-[32px] bg-white border border-primary/5 group/track hover:border-accent transition-all hover:shadow-lg hover:-translate-y-1 opacity-60 hover:opacity-100">
                             <div className="w-14 h-14 bg-bg-cream rounded-2xl flex items-center justify-center text-accent group-hover/track:bg-accent group-hover/track:text-white transition-colors">
                                <Volume2 size={24} />
                             </div>
                             <div className="flex-1">
                                <p className="text-xl font-serif text-primary">Tum Se Hi</p>
                                <p className="text-primary/30 text-[10px] uppercase tracking-widest font-bold mt-1">Mohit Chauhan</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- FORGIVENESS BUTTON --- */}
      <section className="py-60 px-6 text-center bg-bg-cream relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
        
        {!isForgiven ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-3xl mx-auto"
          >
            <span className="font-script text-3xl text-accent mb-8 block">a final request</span>
            <h2 className="text-6xl md:text-9xl font-serif text-primary mb-16 leading-tight italic tracking-tighter">Can you ever <br/>forgive me?</h2>
            
            <button 
              onClick={handleForgiveness}
              className="group relative inline-flex items-center gap-8 bg-primary text-white px-16 py-8 rounded-full text-3xl font-serif italic border border-white/10 transition-all hover:scale-105 active:scale-95 hover:bg-primary-light shadow-[0_30px_70px_rgba(50,10,17,0.3)]"
            >
              I Forgive You
              <div className="relative">
                 <Heart className="w-10 h-10 group-hover:fill-accent group-hover:text-accent transition-all duration-500 scale-100 group-hover:scale-125" />
                 <motion.div 
                   animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
                   transition={{ duration: 1.5, repeat: Infinity }}
                   className="absolute inset-0 bg-accent rounded-full -z-10"
                 />
              </div>
            </button>
            
            <p className="mt-16 text-primary/30 font-script text-3xl italic">...only if your heart says so.</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-40 h-40 bg-primary rounded-full flex items-center justify-center mx-auto mb-16 text-accent shadow-2xl relative"
            >
               <Heart size={80} fill="currentColor" />
               <div className="absolute inset-0 border border-accent/20 rounded-full animate-ping" />
            </motion.div>
            
            <h2 className="text-6xl md:text-9xl font-serif text-primary mb-12 leading-tight italic tracking-tight">Thank You, <br/><span className="text-accent underline decoration-accent/20 underline-offset-16">My Love.</span></h2>
            
            <p className="text-3xl font-serif text-primary/60 max-w-xl mx-auto leading-relaxed italic">
              I promise to never let you down again. I can't wait to see you and hold you again.
            </p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-24 flex justify-center gap-12"
            >
               {[...Array(3)].map((_, i) => (
                 <motion.div
                   key={i}
                   animate={{ 
                     y: [0, -20, 0],
                     opacity: [0.2, 1, 0.2],
                     rotate: [0, 15, -15, 0]
                   }}
                   transition={{ 
                     duration: 3, 
                     repeat: Infinity, 
                     delay: i * 0.5 
                   }}
                 >
                   <Heart className="text-accent fill-accent" size={32} />
                 </motion.div>
               ))}
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-32 bg-primary relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-bg-cream/20 to-transparent" />
        
        <div className="relative mb-16 group">
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 border-2 border-dashed border-accent/20 rounded-full scale-150"
           />
           <div className="w-28 h-28 bg-accent rounded-full flex items-center justify-center text-primary font-serif text-4xl italic border-x-8 border-primary-light shadow-[0_20px_50px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform">
              P&A
           </div>
        </div>
        
        <div className="text-center space-y-6 relative z-10">
          <p className="text-[12px] tracking-[1em] uppercase text-white font-bold opacity-30">The story continues</p>
          <div className="h-20 w-[1px] bg-gradient-to-b from-accent to-transparent mx-auto" />
          <p className="font-script text-white/50 text-4xl italic px-4 leading-relaxed">
            "You are my favourite person <br/> in every version of this life."
          </p>
        </div>
        
        <div className="mt-32 pt-12 border-t border-white/5 w-full flex flex-col items-center gap-4">
           <span className="text-[10px] tracking-[0.5em] uppercase text-white/20 font-bold">Made with Love by Parth for Anshi</span>
           <Sparkles className="text-accent/20 h-4 w-4" />
        </div>
      </footer>
    </div>
  );
}

