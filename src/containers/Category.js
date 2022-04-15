import { Component } from 'react';
// import { useParams } from 'react-router-dom';
import FlexboxLink from '../components/FlexboxLink';
import { getCategory } from '../data';
import withRouter from '../util/withRouter';

class Category extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      id: props.router.params.categoryId || 0,
      data: null
    };
  }

  componentDidMount() {
    getCategory(this.state.id)
      .then((result) => {
        console.log(result);
        this.setState({
          data: result
        });
      });
  }

  render() {
    if (!this.state.data) {
      return <div>Not found!</div>;
    }

    const { data } = this.state;

    return (
      <div className="flex flex-col justify-start items-center">
        <h2 className="text-4xl">
          {data.title}
        </h2>
        <div className="flex flex-row flex-wrap w-full">
          {data.items ? data.items.map((item, key) => (
            <FlexboxLink
              to={`/category/${this.state.id}/item/${key}`}
              key={`item-box-${key}`}
            >
              {item.frontImg ? (
                <img
                  style={{
                    maxHeight: '200px',
                    width: 'auto'
                  }}
                  src={item.frontImg}
                  alt={item.title}
                />
              ) : null}
              <h2 className="text-xl font-bold mb-2 capitalize">{item.title}</h2>
            </FlexboxLink>
          )) : null}
        </div>
      </div>
    );
  }
}

export default withRouter(Category);
