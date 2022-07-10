import { useRef, useState } from 'react';

function useVideoMedia() {
  const [isPlaying, setIsPlaying] = useState(true);
  const ref = useRef(null);

  const play = () => {
    if (!isPlaying && ref.current) ref.current.play();
    setIsPlaying(true);
  };
  const pause = () => {
    if (isPlaying && ref.current) ref.current.pause();
    setIsPlaying(false);
  };
  const stop = () => {
    if (isPlaying && ref.current) {
      ref.current.pause();
      ref.current.fastSeek(0);
    }
    setIsPlaying(false);
  };

  return {
    isPlaying,
    play,
    pause,
    ref,
    stop
  };
}

export default useVideoMedia;
