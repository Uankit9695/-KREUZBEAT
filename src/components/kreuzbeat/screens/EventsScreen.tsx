import { ArrowLeft, MapPin, Clock, Users, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { useState } from 'react';

interface EventsScreenProps {
  onNavigate: (screen: 'splash' | 'home' | 'detail' | 'events') => void;
}

const events = [
  {
    id: 1,
    title: 'DJ KREUZER LIVE',
    venue: 'Berghain',
    date: 'FRI 8 NOV',
    time: '23:00',
    price: '€15',
    attending: 234,
    image: 'https://images.unsplash.com/photo-1571266028243-d220c6711ffc?w=400'
  },
  {
    id: 2,
    title: 'MINIMAL UNIT',
    venue: 'Tresor',
    date: 'SAT 9 NOV',
    time: '22:00',
    price: '€12',
    attending: 189,
    image: 'https://images.unsplash.com/photo-1598387846568-c6df8d0e8ee5?w=400'
  },
  {
    id: 3,
    title: 'BERLIN PULSE NIGHT',
    venue: 'Watergate',
    date: 'SAT 9 NOV',
    time: '23:30',
    price: '€18',
    attending: 312,
    image: 'https://images.unsplash.com/photo-1561489396-888724a1543d?w=400'
  },
  {
    id: 4,
    title: 'TECHNO COLLECTIVE',
    venue: 'Sisyphos',
    date: 'SUN 10 NOV',
    time: '00:00',
    price: '€20',
    attending: 445,
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400'
  }
];

export function EventsScreen({ onNavigate }: EventsScreenProps) {
  const [rsvpStates, setRsvpStates] = useState<Record<number, boolean>>({});

  const toggleRSVP = (eventId: number) => {
    setRsvpStates(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

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
            DJ NIGHTS
          </h1>
          <button className="text-white hover:text-[#E60073] transition-colors">
            <Calendar className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Hero */}
        <div className="text-center space-y-2 mb-8">
          <h2 
            className="text-4xl text-white"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
          >
            UPCOMING EVENTS
          </h2>
          <p className="text-gray-400">Experience the best of Berlin's techno scene</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          {['All Events', 'This Week', 'This Month', 'Techno', 'House', 'Minimal'].map((tab, index) => (
            <button
              key={index}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm transition-colors ${
                index === 0
                  ? 'bg-[#E60073] text-white'
                  : 'bg-[#1A1A1A] text-gray-400 hover:text-white border border-[#E60073]/10'
              }`}
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="space-y-4 pb-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#E60073]/10 hover:border-[#E60073]/30 transition-colors"
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="bg-[#E60073] px-3 py-1 rounded-lg">
                    <p 
                      className="text-white text-sm"
                      style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
                    >
                      {event.date}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 
                    className="text-2xl text-white mb-1"
                    style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
                  >
                    {event.title}
                  </h3>
                  <p className="text-white/80 text-sm">{event.venue}</p>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4 text-[#E60073]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 text-[#E60073]" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Users className="w-4 h-4 text-[#E60073]" />
                    <span>{event.attending}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-gray-400 text-xs mb-1">Entry Fee</p>
                    <p 
                      className="text-2xl text-white"
                      style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                    >
                      {event.price}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleRSVP(event.id)}
                    className={`flex-1 py-3 rounded-lg transition-all ${
                      rsvpStates[event.id]
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-[#E60073] hover:bg-[#E60073]/80 text-white'
                    }`}
                  >
                    <span style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                      {rsvpStates[event.id] ? '✓ RSVP\'D' : 'RSVP NOW'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <button className="w-full py-4 bg-[#1A1A1A] text-white rounded-lg border border-[#E60073]/30 hover:border-[#E60073] hover:bg-[#1A1A1A]/80 transition-colors">
          <span style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
            LOAD MORE EVENTS
          </span>
        </button>
      </div>
    </div>
  );
}
