import { useState } from 'react';
import { Moodboard } from './components/kreuzbeat/Moodboard';
import { AppUIPreview } from './components/kreuzbeat/AppUIPreview';
import { Button } from './components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'moodboard' | 'ui'>('moodboard');

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-[#E60073]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <WaveformIcon />
              <h1 className="text-2xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                KREUZBEAT
              </h1>
            </div>
            <span className="text-[#E60073] text-sm">Design System</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant={currentPage === 'moodboard' ? 'default' : 'outline'}
              onClick={() => setCurrentPage('moodboard')}
              className={currentPage === 'moodboard' ? 'bg-[#E60073] hover:bg-[#E60073]/90' : 'border-[#E60073]/30 text-white hover:bg-[#E60073]/10'}
            >
              Moodboard
            </Button>
            <Button
              variant={currentPage === 'ui' ? 'default' : 'outline'}
              onClick={() => setCurrentPage('ui')}
              className={currentPage === 'ui' ? 'bg-[#E60073] hover:bg-[#E60073]/90' : 'border-[#E60073]/30 text-white hover:bg-[#E60073]/10'}
            >
              App UI
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20">
        {currentPage === 'moodboard' ? <Moodboard /> : <AppUIPreview />}
      </div>

      {/* Page Navigation */}
      <div className="fixed bottom-6 right-6 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage('moodboard')}
          disabled={currentPage === 'moodboard'}
          className="border-[#E60073]/30 text-white hover:bg-[#E60073]/10 disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Moodboard
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage('ui')}
          disabled={currentPage === 'ui'}
          className="border-[#E60073]/30 text-white hover:bg-[#E60073]/10 disabled:opacity-30"
        >
          App UI
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

function WaveformIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="8" width="2" height="8" fill="#E60073" rx="1" />
      <rect x="6" y="4" width="2" height="16" fill="#E60073" rx="1" />
      <rect x="10" y="6" width="2" height="12" fill="#E60073" rx="1" />
      <rect x="14" y="2" width="2" height="20" fill="#E60073" rx="1" />
      <rect x="18" y="7" width="2" height="10" fill="#E60073" rx="1" />
    </svg>
  );
}
