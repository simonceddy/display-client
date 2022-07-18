import {
  BiPlayCircle as PlayIcon,
  BiPauseCircle as PauseIcon,
  BiStopCircle as StopIcon,
  BiReset as ReplayIcon,
} from 'react-icons/bi';

function IconWrapper({ Icon, onClick, size = 40 }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="m-2 hover:text-cyan-800-op-60 active:text-yellow-200 p-1 bg-purple-200-op-30 active:bg-cyan-400-op-75 rounded-md"
    >
      <Icon size={size} />
    </button>
  );
}

function VideoControls({
  isPlaying = false, onPlay, onPause, onStop, iconSize, isFinished = false
}) {
  return (
    <div className="flex flex-row justify-around items-center p-1">
      {isPlaying ? (
        <IconWrapper Icon={PauseIcon} onClick={onPause} size={iconSize} />
      ) : (
        <IconWrapper Icon={PlayIcon} onClick={onPlay} size={iconSize} />
      )}
      {isFinished ? (
        <IconWrapper Icon={ReplayIcon} onClick={onPlay} size={iconSize} />
      ) : (
        <IconWrapper Icon={StopIcon} onClick={onStop} size={iconSize} />
      )}
    </div>
  );
}

export default VideoControls;
