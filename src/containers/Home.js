/* eslint-disable no-unused-vars */
import FlexboxLink from '../components/FlexboxLink';
// import TransitionContainer from '../components/TransitionContainer';
import useImagePreloader from '../hooks/useImagePreloader';
import { MEDIA_BASE_URI } from '../shared/consts';

function Home({ categories = [] }) {
  const { imagesPreloaded } = useImagePreloader(categories.map((c) => c.frontImg));

  if (!imagesPreloaded) {
    return (
      <div>
        Loading media...
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap w-full p-2">
      {categories.map(({
        title, frontImg, id
      }, index) => (
        <FlexboxLink
          to={`/category/${id}`}
          key={`category-box-${id}`}
        >
          {frontImg ? (
            <img
              style={{
                maxHeight: '200px',
                maxWidth: '100%'
              }}
              src={`${MEDIA_BASE_URI}${frontImg}`}
              alt={title}
            />
          ) : null}
          <h2 className="text-xl font-bold mb-2 capitalize">{title}</h2>
          {/* <p className="italic">Contains {items.length} items</p> */}
        </FlexboxLink>
      ))}
    </div>

  );
}

export default Home;
