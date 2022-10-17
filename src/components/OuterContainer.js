// import { MEDIA_BASE_URI } from '../shared/consts';

function OuterContainer({ children }) {
  return (
    <div
      className="text-green-900 w-full h-full flex flex-col justify-start items-center"
      // style={{
      //   background: `no-repeat url(${MEDIA_BASE_URI}Image2-bright.jpg)`,
      //   backgroundSize: 'cover'
      // }}
    >
      {children}
    </div>
  );
}

export default OuterContainer;
