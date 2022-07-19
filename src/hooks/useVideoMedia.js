import { useEffect, useRef, useState } from 'react';

const defaultOpts = {
  volume: 0.75,
  onVolumeChange: null
};

function useVideoMedia(options = {}) {
  const opts = { ...defaultOpts, ...options };
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [mediaVolume, setMediaVolume] = useState(opts.volume);
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

  const setVolume = (vol) => {
    if (ref.current && vol <= 1 && vol >= 0) {
      ref.current.volume = vol;
      setMediaVolume(vol);
    }
  };

  useEffect(() => {
    if (ref.current && ref.current.addEventListener) {
      ref.current.volume = mediaVolume;
      ref.current.addEventListener('ended', () => setIsFinished(true));
      if (opts.onVolumeChange) {
        ref.current.addEventListener('volumechange', () => opts.onVolumeChange(ref.current.volume));
      }
    }
  }, [ref]);

  return {
    volume: mediaVolume,
    setVolume,
    isFinished,
    isPlaying,
    play,
    pause,
    ref,
    stop
  };
}

export default useVideoMedia;
