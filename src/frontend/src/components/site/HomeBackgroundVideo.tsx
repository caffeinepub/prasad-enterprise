import { useEffect, useRef, useState } from 'react';

export default function HomeBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt to play the video with error handling
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        // Autoplay was prevented - this is expected on some browsers
        console.log('Video autoplay prevented:', error);
      });
    }
  }, []);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video failed to load:', e);
    setVideoError(true);
  };

  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
      {!videoError && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/brick-kiln-background-poster.jpg"
          className="absolute top-0 left-0 w-full h-full object-cover"
          onError={handleVideoError}
        >
          <source src="/assets/brick-kiln-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {/* Fallback background when video is not available */}
      {videoError && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" />
      )}
      {/* Subtle overlay to ensure content readability */}
      <div className="absolute inset-0 bg-background/30" />
    </div>
  );
}
