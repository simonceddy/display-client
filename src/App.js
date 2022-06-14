import { Route, Routes } from 'react-router-dom';
import { BiHome as HomeIcon, BiArrowBack as BackIcon } from 'react-icons/bi';
import { Component } from 'react';
import OuterContainer from './components/OuterContainer';
import { populateData } from './data';
import Navbar from './components/Navbar';
import NavbarLink from './components/NavbarLink';
import BackToCategoryButton from './components/BackToCategoryButton';
import withRouter from './util/withRouter';
import AppRoutes from './containers/AppRoutes';
import preloadImg from './util/preloadImg';

function preloadCategory(c, cb = () => {}) {
  if (c.thumbnail) cb(c.thumbnail);
  if (c.items) {
    c.items.map((i) => {
      if (!i.src) return null;
      return cb(i.src);
    });
  }
  if (c.categories && c.categories.map) {
    c.categories.map((sc) => preloadCategory(sc, cb));
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isLoaded: false,
    };

    this.getCategory = this.getCategory.bind(this);
    this.getItemFrom = this.getItemFrom.bind(this);
  }

  componentDidMount() {
    populateData()
      .then((result) => {
        this.setState({
          categories: result,
        });
      })
      .then(async () => {
        // TODO fix preloading - embed into data structure after fetch?
        // TODO handle preloading for audio and video
        const items = [];
        const pushItem = (obj) => {
          if (obj.thumbnail) items.push(preloadImg(obj.thumbnail));
        };
        await Promise.all(Object.values(this.state.categories)
          .map((c) => preloadCategory(c, pushItem)))
          .then(() => console.log(items));

        await Promise.all(items).then(() => {
          console.log('finished preloading');
          this.setState({
            isLoaded: true
          });
        })
          .catch(console.error);
      });
  }

  getCategory(categoryId, subCategoryId = null) {
    const c = this.state.categories[categoryId] ? {
      ...this.state.categories[categoryId],
      totalItems: this.state.categories[categoryId].items
        ? this.state.categories[categoryId].items.length
        : 0
    } : false;

    if (subCategoryId && c.categories) {
      const subC = c.categories.find((s) => (s.id === subCategoryId));
      return {
        ...subC,
        totalItems: subC.items
          ? subC.items.length
          : 0
      };
    }

    return c;
  }

  getItemFrom(categoryId, itemId, subCategoryId = null) {
    const c = this.getCategory(categoryId, subCategoryId);
    if (!c) {
      console.log(categoryId, itemId);
      return false;
    }
    return c.items && c.items[itemId]
      ? { ...c.items[itemId], totalItems: c.totalItems } : false;
  }

  render() {
    const data = Object.values(this.state.categories);

    return (
      <OuterContainer>
        <Navbar>
          <NavbarLink to="/"><HomeIcon size={64} /></NavbarLink>
          <NavbarLink to={-1}><BackIcon size={64} /></NavbarLink>
          <Routes>
            <Route
              path="/category/:categoryId/:subCategoryId"
              element={<BackToCategoryButton noSub />}
            />
            <Route
              path="/category/:categoryId/:subCategoryId/item/:itemId"
              element={<BackToCategoryButton />}
            />
            <Route
              path="/category/:categoryId/item/:itemId"
              element={<BackToCategoryButton />}
            />
          </Routes>
        </Navbar>
        {!this.state.isLoaded ? (
          <div>Loading data...</div>
        ) : (
          <div className="relative w-full h-full">
            <AppRoutes
              data={data}
              getCategory={this.getCategory}
              getItemFrom={this.getItemFrom}
            />
          </div>
        )}
      </OuterContainer>
    );
  }
}

export default withRouter(App);
