import { useEffect } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onNavigate: (screen: 'splash' | 'home' | 'detail' | 'events') => void;
}

export function SplashScreen({ onNavigate }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Auto-navigate to home after 3 seconds
      // onNavigate('home');
    }, 3000);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div 
      className="w-full h-full bg-black flex flex-col items-center justify-center cursor-pointer"
      onClick={() => onNavigate('home')}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#E60073]/20 via-black to-black"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Waveform Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <WaveformLogo />
        </motion.div>

        {/* App Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h1 
            className="text-7xl text-white mb-3"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.08em' }}
          >
            KREUZBEAT
          </h1>
          <motion.p
            className="text-[#E60073] text-xl tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Feel the Beat of Berlin
          </motion.p>
        </motion.div>

        {/* Pulse Indicator */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-2 h-2 bg-[#E60073] rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Tap hint */}
      <motion.div
        className="absolute bottom-12 text-gray-600 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Tap to continue
      </motion.div>
    </div>
  );
}

function WaveformLogo() {
  return (
    <motion.svg 
      width="120" 
      height="120" 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.rect 
        x="10" y="45" width="12" height="30" 
        fill="#E60073" 
        rx="6"
        initial={{ scaleY: 0.3 }}
        animate={{ scaleY: [0.3, 1, 0.5, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.rect 
        x="30" y="30" width="12" height="60" 
        fill="#E60073" 
        rx="6"
        initial={{ scaleY: 0.5 }}
        animate={{ scaleY: [0.5, 0.8, 1, 0.7, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.rect 
        x="50" y="35" width="12" height="50" 
        fill="#E60073" 
        rx="6"
        initial={{ scaleY: 0.4 }}
        animate={{ scaleY: [0.4, 1, 0.6, 0.9, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
      <motion.rect 
        x="70" y="20" width="12" height="80" 
        fill="#E60073" 
        rx="6"
        initial={{ scaleY: 0.6 }}
        animate={{ scaleY: [0.6, 0.9, 1, 0.8, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      <motion.rect 
        x="90" y="40" width="12" height="40" 
        fill="#E60073" 
        rx="6"
        initial={{ scaleY: 0.5 }}
        animate={{ scaleY: [0.5, 1, 0.7, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
    </motion.svg>
  );
}
