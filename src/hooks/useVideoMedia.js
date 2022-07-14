import { useEffect, useRef, useState } from 'react';

function useVideoMedia() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const ref = useRef(null);

  const play = () => {
    if (!isPlaying && ref.current) ref.current.play();
    if (isFinished) setIsFinished(false);
    setIsPlaying(true);
  };
  const pause = () => {
    if (isPlaying && ref.current) ref.current.pause();
    setIsPlaying(false);
  };
  const stop = () => {
    if (ref.current) {
      if (isPlaying) ref.current.pause();
      if (ref.current.currentTime) {
        ref.current.currentTime = 0;
      }
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    if (ref.current && ref.current.addEventListener) {
      ref.current.addEventListener('ended', () => setIsFinished(true));
    }
  }, [ref]);

  return {
    isFinished,
    isPlaying,
    play,
    pause,
    ref,
    stop
  };
}

export default useVideoMedia;
