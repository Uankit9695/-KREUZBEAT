import { ArrowLeft, Heart, Share2, ShoppingCart, Play } from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { useState } from 'react';

interface RecordDetailScreenProps {
  onNavigate: (screen: 'splash' | 'home' | 'detail' | 'events') => void;
}

export function RecordDetailScreen({ onNavigate }: RecordDetailScreenProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-full h-full bg-black overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-[#E60073]/10">
        <div className="px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('home')}
            className="text-white hover:text-[#E60073] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 
            className="text-lg text-white"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
          >
            RECORD DETAILS
          </h1>
          <button className="text-white hover:text-[#E60073] transition-colors">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Album Cover */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#1A1A1A] border-2 border-[#E60073]/20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1619983081563-430f63602796?w=800"
            alt="Midnight Echo"
            className="w-full h-full object-cover"
          />
          <button 
            onClick={() => setLiked(!liked)}
            className="absolute top-4 right-4 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
          >
            <Heart 
              className={`w-6 h-6 ${liked ? 'fill-[#E60073] text-[#E60073]' : 'text-white'} transition-colors`}
            />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <button className="w-full bg-[#E60073]/90 backdrop-blur-sm text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#E60073] transition-colors">
              <Play className="w-5 h-5" />
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                PREVIEW
              </span>
            </button>
          </div>
        </div>

        {/* Record Info */}
        <div className="space-y-4">
          <div>
            <h1 
              className="text-4xl text-white mb-2"
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
            >
              MIDNIGHT ECHO
            </h1>
            <p className="text-xl text-gray-400">TECHNO COLLECTIVE</p>
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-[#1A1A1A] border border-[#E60073]/30 rounded-full text-[#E60073] text-sm">
              Techno
            </span>
            <span className="px-3 py-1 bg-[#1A1A1A] border border-[#E60073]/30 rounded-full text-[#E60073] text-sm">
              180g Vinyl
            </span>
            <span className="px-3 py-1 bg-[#1A1A1A] border border-[#E60073]/30 rounded-full text-[#E60073] text-sm">
              Limited Edition
            </span>
          </div>

          {/* Details */}
          <div className="bg-[#1A1A1A] rounded-2xl p-4 border border-[#E60073]/10 space-y-3">
            <div className="flex justify-between py-2 border-b border-[#E60073]/10">
              <span className="text-gray-400">Label</span>
              <span className="text-white">Berlin Underground Records</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#E60073]/10">
              <span className="text-gray-400">Released</span>
              <span className="text-white">October 2025</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#E60073]/10">
              <span className="text-gray-400">Format</span>
              <span className="text-white">12" Vinyl • 33 RPM</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Condition</span>
              <span className="text-green-400">Mint (M)</span>
            </div>
          </div>

          {/* Tracklist */}
          <div>
            <h3 
              className="text-xl text-white mb-3"
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
            >
              TRACKLIST
            </h3>
            <div className="space-y-2">
              {[
                { side: 'A1', title: 'Midnight Echo', duration: '7:24' },
                { side: 'A2', title: 'Dark Pulse', duration: '6:18' },
                { side: 'B1', title: 'Berlin After Hours', duration: '8:12' },
                { side: 'B2', title: 'Underground', duration: '5:45' }
              ].map((track, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between bg-[#1A1A1A] rounded-lg p-3 border border-[#E60073]/10"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#E60073] text-sm w-8" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      {track.side}
                    </span>
                    <span className="text-white">{track.title}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 
              className="text-xl text-white mb-3"
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
            >
              ABOUT
            </h3>
            <p className="text-gray-400 leading-relaxed">
              A masterpiece of modern techno, Midnight Echo captures the raw energy and hypnotic 
              rhythms of Berlin's underground scene. This limited edition pressing features four 
              tracks of deep, driving techno that will move any dancefloor.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="sticky bottom-0 bg-black/95 backdrop-blur-md border-t border-[#E60073]/10 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-gray-400 text-sm">Price</p>
            <p className="text-3xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              €24.99
            </p>
          </div>
          <button className="flex-1 bg-[#E60073] text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#E60073]/80 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em', fontSize: '18px' }}>
              ADD TO CART
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
