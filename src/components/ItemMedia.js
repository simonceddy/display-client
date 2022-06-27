/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
const mediaData = {
  src: null,
  alt: '',
  type: 'image' // or 'video' or 'audio'
};

const getMediaElement = (type) => {
  switch (type) {
    case 'image':
      return function ({ src, alt }) {
        return (
          <img
            className="flex-1"
            src={src}
            alt={alt}
            style={{
              maxHeight: '78vh',
              objectFit: 'scale-down'
            }}
          />
        );
      };
    case 'video':
      return function ({ src, alt }) {
        return (
          <video
            controls
            autoPlay
            style={{
              maxHeight: '70vh',
              width: 'auto'
            }}
            src={src}
          ><track kind="captions" />
          </video>
        );
      };
    case 'audio':
      return function ({ src, alt }) {
        return <div>audio</div>;
      };
    default:
      return null;
  }
};

function ItemMedia({ src, alt = '', type = 'image' }) {
  if (!src) return null;
  const MediaElement = getMediaElement(type);

  return (
    <MediaElement src={src} alt={alt} />
  );
}

export default ItemMedia;
