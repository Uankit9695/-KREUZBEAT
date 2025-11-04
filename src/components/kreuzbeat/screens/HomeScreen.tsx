import { ChevronRight, Search, User, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface HomeScreenProps {
  onNavigate: (screen: 'splash' | 'home' | 'detail' | 'events') => void;
}

const newVinyls = [
  { id: 1, title: 'Midnight Echo', artist: 'TECHNO COLLECTIVE', price: '€24.99', image: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=400' },
  { id: 2, title: 'Berlin Pulse', artist: 'DJ KREUZER', price: '€29.99', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400' },
  { id: 3, title: 'Dark Matter', artist: 'MINIMAL UNIT', price: '€22.99', image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400' }
];

const trendingArtists = [
  { name: 'DJ KREUZER', genre: 'Techno', followers: '12.5K' },
  { name: 'MINIMAL UNIT', genre: 'Minimal', followers: '8.2K' },
  { name: 'BERLIN PULSE', genre: 'House', followers: '15.1K' }
];

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="w-full h-full bg-black overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-[#E60073]/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <WaveformIcon />
              <h1 
                className="text-2xl text-white"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
              >
                KREUZBEAT
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <ShoppingBag className="w-6 h-6" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search vinyls, artists, events..."
              className="w-full bg-[#1A1A1A] text-white pl-12 pr-4 py-3 rounded-lg border border-[#E60073]/20 focus:border-[#E60073] focus:outline-none transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-8">
        {/* Hero Banner */}
        <div 
          className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-[#E60073] to-[#8B0045] cursor-pointer"
          onClick={() => onNavigate('events')}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 h-full flex flex-col justify-end p-6">
            <p className="text-[#E60073] text-sm mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              THIS WEEKEND
            </p>
            <h2 className="text-3xl text-white mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
              DJ NIGHTS AT BERGHAIN
            </h2>
            <p className="text-white/80 text-sm">Tap to view all events →</p>
          </div>
        </div>

        {/* New Vinyls */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 
              className="text-2xl text-white"
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
            >
              NEW VINYLS
            </h2>
            <button className="text-[#E60073] text-sm flex items-center gap-1">
              See All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {newVinyls.map((vinyl) => (
              <div
                key={vinyl.id}
                onClick={() => onNavigate('detail')}
                className="flex-shrink-0 w-40 cursor-pointer group"
              >
                <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-[#1A1A1A] border-2 border-[#E60073]/10 group-hover:border-[#E60073] transition-all">
                  <ImageWithFallback
                    src={vinyl.image}
                    alt={vinyl.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 
                  className="text-white text-sm mb-1 truncate"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
                >
                  {vinyl.title}
                </h3>
                <p className="text-gray-400 text-xs mb-1 truncate">{vinyl.artist}</p>
                <p className="text-[#E60073]">{vinyl.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DJ Nights */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 
              className="text-2xl text-white"
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
            >
              DJ NIGHTS
            </h2>
            <button 
              className="text-[#E60073] text-sm flex items-center gap-1"
              onClick={() => onNavigate('events')}
            >
              See All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {[
              { date: 'FRI 8 NOV', venue: 'Berghain', dj: 'DJ KREUZER', time: '23:00' },
              { date: 'SAT 9 NOV', venue: 'Tresor', dj: 'MINIMAL UNIT', time: '22:00' }
            ].map((event, index) => (
              <div
                key={index}
                onClick={() => onNavigate('events')}
                className="bg-[#1A1A1A] rounded-lg p-4 border border-[#E60073]/10 hover:border-[#E60073] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#E60073] text-xs mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      {event.date}
                    </p>
                    <h3 className="text-white mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                      {event.dj}
                    </h3>
                    <p className="text-gray-400 text-sm">{event.venue} • {event.time}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Artists */}
        <section className="pb-6">
          <h2 
            className="text-2xl text-white mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
          >
            TRENDING ARTISTS
          </h2>
          <div className="space-y-3">
            {trendingArtists.map((artist, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#1A1A1A] rounded-lg p-4 border border-[#E60073]/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E60073] to-[#8B0045] flex items-center justify-center text-white text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                      {artist.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{artist.genre} • {artist.followers} followers</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#E60073] text-white rounded-lg text-sm hover:bg-[#E60073]/80 transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function WaveformIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="2" height="8" fill="#E60073" rx="1" />
      <rect x="6" y="3" width="2" height="14" fill="#E60073" rx="1" />
      <rect x="10" y="5" width="2" height="10" fill="#E60073" rx="1" />
      <rect x="14" y="2" width="2" height="16" fill="#E60073" rx="1" />
    </svg>
  );
}
