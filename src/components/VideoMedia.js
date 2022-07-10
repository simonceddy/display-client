import useVideoMedia from '../hooks/useVideoMedia';
import VideoControls from './VideoControls';

function VideoMedia({ src }) {
  const {
    isPlaying, play, pause, ref, stop
  } = useVideoMedia();
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
          maxHeight: '70vh',
          width: 'auto'
        }}
        src={src}
      >
        <track kind="captions" />
      </video>
      <VideoControls
        iconSize={52}
        isPlaying={isPlaying}
        onPlay={play}
        onPause={pause}
        onStop={stop}
      />
    </>
  );
}

export default VideoMedia;
