import { ImageWithFallback } from '../figma/ImageWithFallback';

const moodImages = [
  { url: 'https://images.unsplash.com/photo-1644770510895-b61702eaafc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZXJsaW4lMjBuaWdodGxpZmUlMjBuZW9ufGVufDF8fHx8MTc2MjI2NjM5Nnww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Berlin nightlife' },
  { url: 'https://images.unsplash.com/photo-1698230846727-99a24a391db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMHN0b3JlfGVufDF8fHx8MTc2MjI1NDA4Nnww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Vinyl record store' },
  { url: 'https://images.unsplash.com/photo-1600542552868-56ed242290e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMHR1cm50YWJsZSUyMGNsdWJ8ZW58MXx8fHwxNzYyMjY5NDYwfDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'DJ turntable' },
  { url: 'https://images.unsplash.com/photo-1648391944883-a9a818c3b357?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwc2lnbiUyMG5pZ2h0Y2x1YnxlbnwxfHx8fDE3NjIyODg2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Neon sign' },
  { url: 'https://images.unsplash.com/photo-1560084355-96dc9ca52245?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm8lMjBwYXJ0eSUyMGxpZ2h0c3xlbnwxfHx8fDE3NjIyODg2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Techno party' },
  { url: 'https://images.unsplash.com/photo-1653383454515-0b42b711ed7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZHMlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2MjIyNDU3M3ww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Vinyl collection' },
  { url: 'https://images.unsplash.com/photo-1552943272-b60c260fdfbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcmdyb3VuZCUyMGNsdWIlMjBkYXJrfGVufDF8fHx8MTc2MjI2NjM5N3ww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Underground club' },
  { url: 'https://images.unsplash.com/photo-1508750890367-ae51d0ef8cb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZXJsaW4lMjBzdHJlZXQlMjBhcnR8ZW58MXx8fHwxNzYyMjg4NjgzfDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Berlin street art' }
];

const keywords = ['Underground', 'Vinyl', 'Techno', 'Minimal', 'Berlin', 'Nightlife'];

export function Moodboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
          KREUZBEAT MOODBOARD
        </h1>
        <p className="text-gray-400 text-lg">Berlin Underground Music Culture</p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-4 gap-4">
        {moodImages.map((image, index) => (
          <div
            key={index}
            className="aspect-square overflow-hidden rounded-lg border-2 border-[#E60073]/20 hover:border-[#E60073] transition-all duration-300 group"
          >
            <ImageWithFallback
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {/* Color Palette & Typography */}
      <div className="grid grid-cols-2 gap-8">
        {/* Color Palette */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#E60073]/20">
          <h2 className="text-3xl text-white mb-6" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
            COLOR PALETTE
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-black border-2 border-[#E60073]/30" />
              <div>
                <div className="text-white">Black</div>
                <div className="text-gray-400 text-sm">#000000</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-[#1A1A1A] border-2 border-[#E60073]/30" />
              <div>
                <div className="text-white">Dark Gray</div>
                <div className="text-gray-400 text-sm">#1A1A1A</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-[#E60073] border-2 border-[#E60073]" />
              <div>
                <div className="text-white">Magenta Accent</div>
                <div className="text-gray-400 text-sm">#E60073</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-white border-2 border-[#E60073]/30" />
              <div>
                <div className="text-white">White</div>
                <div className="text-gray-400 text-sm">#FFFFFF</div>
              </div>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#E60073]/20">
          <h2 className="text-3xl text-white mb-6" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
            TYPOGRAPHY
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-gray-400 text-sm">Headings</div>
              <div className="text-5xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                BEBAS NEUE
              </div>
              <div className="text-gray-500 text-sm">Bold, Uppercase, 0.05em tracking</div>
            </div>
            <div className="h-px bg-[#E60073]/20" />
            <div className="space-y-2">
              <div className="text-gray-400 text-sm">Body Text</div>
              <div className="text-2xl text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                Inter Regular
              </div>
              <div className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                Clean, modern, and highly readable for UI elements and body text.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keywords */}
      <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#E60073]/20">
        <h2 className="text-3xl text-white mb-6" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
          KEYWORDS
        </h2>
        <div className="flex flex-wrap gap-3">
          {keywords.map((keyword, index) => (
            <div
              key={index}
              className="px-6 py-3 bg-black border border-[#E60073] rounded-full text-[#E60073] hover:bg-[#E60073] hover:text-white transition-all duration-300 cursor-default"
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
            >
              {keyword}
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gradient-to-br from-[#E60073]/10 to-[#E60073]/5 rounded-2xl p-8 border border-[#E60073]/30">
        <h2 className="text-3xl text-white mb-6" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
          ABOUT THIS PROJECT
        </h2>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="text-gray-400 text-sm mb-2">Project Title</div>
            <div className="text-white text-xl" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
              KREUZBEAT – RECORD STORE & DJ HUB
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-2">Designer</div>
            <div className="text-white text-xl">Ankit Kumar Yadav</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-2">Submission Date</div>
            <div className="text-white text-xl">5 November 2025</div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-[#E60073]/20">
          <p className="text-gray-400 leading-relaxed">
            KreuzBeat is a mobile application that brings together Berlin's underground music scene, 
            offering a curated collection of vinyl records and exclusive DJ events. The app celebrates 
            the raw energy and minimalist aesthetic of Berlin's techno culture, providing music 
            enthusiasts with a seamless platform to discover, collect, and experience the beat of the city.
          </p>
        </div>
      </div>
    </div>
  );
}
