import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Square, Play } from 'lucide-react';

// --- Voice Note Section ---
function VoiceNoteSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  
  const songs = [
    {
      file: '/apology.mp3',
      title: 'Apology Message',
      artist: 'Parth'
    },
    {
      file: '/Raabta Agent Vinod 320 Kbps.mp3',
      title: 'Raabta Agent',
      artist: 'Vinod'
    },
    {
      file: '/Tujhe Kitna Chahne Lage Kabir Singh 320 Kbps.mp3',
      title: 'Tujhe Kitna',
      artist: 'Kabir Singh'
    }
  ];
  
  const [audio, setAudio] = useState(() => new Audio(songs[0].file));
  const audioRef = useRef<HTMLAudioElement>(null);

  const transcript = "Hey Anshi... I've been trying to find the right words to say this, but I think hearing my voice might be better. I'm so sorry for everything that happened. That day was supposed to be about us, and I let my reactions get in the way. You did so much for me - the food, the ride, the planning - and I didn't appreciate it the way I should have. I love you more than words can say, and I promise to be better. For you, for us. Always.";

  useEffect(() => {
    const audioElement = audio;
    
    const handleEnded = () => {
      setIsPlaying(false);
    };

    const switchSong = (index: number) => {
      const newAudio = new Audio(songs[index].file);
      if (audio) {
        audio.pause();
        audio.removeEventListener('ended', handleEnded);
      }
      setAudio(newAudio);
      setCurrentSongIndex(index);
      setIsPlaying(false);
    };

    const nextSong = () => {
      const nextIndex = (currentSongIndex + 1) % songs.length;
      switchSong(nextIndex);
    };

    const prevSong = () => {
      const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
      switchSong(prevIndex);
    };

    const playRecording = () => {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    };

    audioElement.addEventListener('ended', handleEnded);
    
    return () => {
      if (!audio) return null;

    return (
      <section className="py-60 px-6 bg-white overflow-hidden border-t border-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-script text-3xl text-accent mb-6 block">a voice for the silence</span>
          <h2 className="text-6xl md:text-8xl font-serif text-primary mb-16 tracking-tight">Personal <br/><span className="italic text-accent">Voice Apology.</span></h2>
          
          <div className="bg-bg-cream/40 p-12 md:p-20 rounded-[64px] border border-primary/5 shadow-xl relative overflow-hidden backdrop-blur-sm">
            {/* Visualizer simulation */}
            {isPlaying && (
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
              {/* Current Song Display */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-serif text-primary mb-2">{songs[currentSongIndex].title}</h3>
                <p className="text-sm text-accent">{songs[currentSongIndex].artist}</p>
              </div>
              
              {/* Song Navigation */}
              <div className="flex gap-4 mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevSong}
                  className="w-12 h-12 rounded-full bg-primary/20 text-white flex items-center justify-center transition-all"
                >
                  <Square className="w-4 h-4" fill="currentColor" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={playRecording}
                  className={`w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-2xl relative ${isPlaying ? 'bg-red-500' : 'bg-primary'}`}
                >
                  {isPlaying && (
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 bg-red-500 rounded-full"
                    />
                  )}
                  {isPlaying ? <Square className="text-white relative z-10" size={40} fill="currentColor" /> : <Play className="text-white pl-2" size={42} fill="currentColor" />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSong}
                  className="w-12 h-12 rounded-full bg-primary/20 text-white flex items-center justify-center transition-all"
                >
                  <Square className="w-4 h-4" fill="currentColor" />
                </motion.button>
              </div>
              
              <div className="space-y-4">
                <p className="font-serif italic text-3xl text-primary leading-relaxed border-l-2 border-accent/20 pl-8 text-left">
                  "{transcript}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  );
}

export default VoiceNoteSection;
