import { useState, useRef } from 'react';
import { urlFor } from '~/lib/sanity.image';

interface VideoSectionProps {
  title: string;
  videoUrl: string;
  coverImage: {
    asset: {
      _ref: string;
    };
  };
}

const PlayButton = ({ size = 'small' }: { size?: 'small' | 'large' }) => (
  <svg 
    width={size === 'large' ? "56" : "28"} 
    height={size === 'large' ? "64" : "32"} 
    viewBox="0 0 28 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 ${size === 'large' ? 'hover:scale-110' : ''}`}
  >
    <path 
      d="M26 12.5359C28.6667 14.0755 28.6667 17.9245 26 19.4641L6.5 30.7224C3.83334 32.262 0.499998 30.3375 0.499999 27.2583L0.5 4.74167C0.5 1.66247 3.83333 -0.262033 6.5 1.27757L26 12.5359Z" 
      fill="#C8D6E6"
    />
  </svg>
);

export default function VideoSection({ title, videoUrl, coverImage }: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Video container */}
          <button 
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer w-full text-left"
            onClick={handleVideoClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleVideoClick();
              }
            }}
          >
            {/* Gradient overlay */}
            <div 
              className="absolute top-0 left-0 right-0 h-[184px] z-20 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, #17283D 0%, rgba(23, 40, 61, 0.00) 100%)'
              }}
            />

            {/* Title and small play button */}
            <div className="absolute top-8 left-8 z-30 flex items-center space-x-4 pointer-events-none">
              <PlayButton />
              <h3 className="text-h3-mobile md:text-h3 font-medium text-[#C8D6E6]">{title}</h3>
            </div>

            {/* Cover image */}
            {!isPlaying && (
              <div className="absolute inset-0 z-[15]">
                <img
                  src={urlFor(coverImage).width(1920).height(1080).url()}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                {/* Large centered play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayButton size="large" />
                </div>
              </div>
            )}

            {/* Video */}
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-cover"
              playsInline
              onEnded={() => setIsPlaying(false)}
              aria-label={title}
              controls={isPlaying}
            >
              <track 
                kind="captions" 
                src="" 
                label="English" 
                srcLang="en" 
                default 
              />
            </video>
          </button>
        </div>
      </div>
    </section>
  );
}
