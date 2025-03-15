
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Add YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Define the onYouTubeIframeAPIReady callback
    window.onYouTubeIframeAPIReady = () => {
      setIsReady(true);
    };

    return () => {
      // Clean up
      window.onYouTubeIframeAPIReady = () => {};
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // Initialize YouTube player when API is ready
    const player = new window.YT.Player('youtube-audio', {
      videoId: 'jfKfPfyJRdk', // Lo-fi beats for relaxing/studying to
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: 'jfKfPfyJRdk', // Same ID for looping
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        iv_load_policy: 3,
      },
      events: {
        onReady: (event) => {
          event.target.setVolume(15); // Set initial volume to 15%
          if (isMuted) {
            event.target.mute();
          }
        },
      },
    });

    const toggleMute = () => {
      if (player) {
        if (isMuted) {
          player.unMute();
        } else {
          player.mute();
        }
      }
    };

    // Add event listener to the mute button
    const muteButton = document.getElementById('mute-button');
    muteButton?.addEventListener('click', toggleMute);

    return () => {
      muteButton?.removeEventListener('click', toggleMute);
    };
  }, [isReady, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div style={{ width: '0', height: '0', overflow: 'hidden' }}>
        <div id="youtube-audio"></div>
      </div>
      <Button
        id="mute-button"
        variant="secondary"
        size="icon"
        className="rounded-full shadow-lg opacity-70 hover:opacity-100"
        onClick={toggleMute}
        title={isMuted ? "Activer la musique" : "Désactiver la musique"}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
    </div>
  );
};

// Add type definition for YouTube API
declare global {
  interface Window {
    YT: {
      Player: any;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export default BackgroundMusic;
