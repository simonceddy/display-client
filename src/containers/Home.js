import FlexboxLink from '../components/FlexboxLink';

function Home({ categories = [] }) {
  return (
    <div className="flex flex-row flex-wrap w-full p-2">
      {categories.map(({
        title, items, frontImg, id
      }) => (
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
              src={frontImg}
              alt={title}
            />
          ) : null}
          <h2 className="text-xl font-bold mb-2 capitalize">{title}</h2>
          <p className="italic">Contains {items.length} items</p>
        </FlexboxLink>
      ))}
    </div>
  );
}

export default Home;
