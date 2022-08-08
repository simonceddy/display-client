import { useDispatch, useSelector } from 'react-redux';
import useVideoMedia from '../hooks/useVideoMedia';
import { setGlobalVolume } from '../store/appSlice';
import VideoControls from './VideoControls';

function VideoMedia({ src }) {
  const globalVolume = useSelector((state) => state.app.volume);
  const dispatch = useDispatch();
  const {
    isPlaying, play, pause, ref, stop, isFinished, volume, setVolume
  } = useVideoMedia({
    volume: globalVolume,
    onVolumeChange: (vol) => dispatch(setGlobalVolume(vol))
  });
  return (
    <>
      <video
        onClick={isPlaying ? pause : play}
        ref={ref}
        disablePictureInPicture
        controls={false}
        playsInline
        autoPlay
        onPlay={play}
        onPause={pause}
        style={{
          height: '740px',
          width: 'auto'
        }}
        src={src}
      >
        <track kind="captions" />
      </video>
      <VideoControls
        isFinished={isFinished}
        iconSize={52}
        isPlaying={isPlaying}
        onPlay={play}
        onPause={pause}
        onStop={stop}
        volume={volume}
        setVolume={setVolume}
      />
    </>
  );
}

export default VideoMedia;
