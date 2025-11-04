import { useState } from 'react';
import { SplashScreen } from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { RecordDetailScreen } from './screens/RecordDetailScreen';
import { EventsScreen } from './screens/EventsScreen';
import { ArrowRight } from 'lucide-react';

type Screen = 'splash' | 'home' | 'detail' | 'events';

export function AppUIPreview() {
  const [activeScreen, setActiveScreen] = useState<Screen>('splash');

  const screens = [
    { id: 'splash' as Screen, title: 'Splash Screen', component: SplashScreen },
    { id: 'home' as Screen, title: 'Home Screen', component: HomeScreen },
    { id: 'detail' as Screen, title: 'Record Detail', component: RecordDetailScreen },
    { id: 'events' as Screen, title: 'Events Screen', component: EventsScreen }
  ];

  const ActiveComponent = screens.find(s => s.id === activeScreen)?.component || SplashScreen;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Title */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-6xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
          KREUZBEAT APP UI
        </h1>
        <p className="text-gray-400 text-lg">iPhone 14 Pro • 390×844 px • Dark Mode</p>
      </div>

      {/* Prototype Flow */}
      <div className="mb-12">
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#E60073]/20">
          <h3 className="text-xl text-white mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
            PROTOTYPE FLOW
          </h3>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {screens.map((screen, index) => (
              <div key={screen.id} className="flex items-center gap-3">
                <button
                  onClick={() => setActiveScreen(screen.id)}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeScreen === screen.id
                      ? 'bg-[#E60073] text-white'
                      : 'bg-black text-gray-400 hover:text-white border border-[#E60073]/30'
                  }`}
                  style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
                >
                  {screen.title}
                </button>
                {index < screens.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-[#E60073]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Screen Preview */}
      <div className="flex justify-center">
        <div className="relative">
          {/* iPhone Frame */}
          <div className="bg-[#1A1A1A] rounded-[3rem] p-3 border-4 border-gray-800 shadow-2xl">
            {/* Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-10" />
            
            {/* Screen */}
            <div className="relative w-[390px] h-[844px] bg-black rounded-[2.5rem] overflow-hidden">
              <ActiveComponent onNavigate={setActiveScreen} />
            </div>
          </div>

          {/* Screen Label */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
            <div className="text-[#E60073] text-sm" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
              {screens.find(s => s.id === activeScreen)?.title}
            </div>
          </div>
        </div>
      </div>

      {/* Design Specs */}
      <div className="mt-24 grid grid-cols-3 gap-6">
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#E60073]/20">
          <h3 className="text-xl text-white mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
            GRID SYSTEM
          </h3>
          <p className="text-gray-400 text-sm">8px baseline grid for consistent spacing and alignment across all components.</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#E60073]/20">
          <h3 className="text-xl text-white mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
            AUTO LAYOUT
          </h3>
          <p className="text-gray-400 text-sm">All screens use Auto Layout for responsive design and easy maintenance.</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#E60073]/20">
          <h3 className="text-xl text-white mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
            DARK MODE
          </h3>
          <p className="text-gray-400 text-sm">Minimalist dark theme with bold typography and neon magenta highlights.</p>
        </div>
      </div>
    </div>
  );
}
