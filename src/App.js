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
          isLoaded: true
        });
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
          <NavbarLink to={-1}><BackIcon size={64} /></NavbarLink>
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
