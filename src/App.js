/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/no-unused-state */
import { Route, Routes } from 'react-router-dom';
import { BiHome as HomeIcon, BiArrowBack as BackIcon } from 'react-icons/bi';
import { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import OuterContainer from './components/OuterContainer';
import Home from './containers/Home';
import { populateData } from './data';
import Category from './containers/Category';
import Navbar from './components/Navbar';
import NavbarLink from './components/NavbarLink';
import Item from './containers/Item';
import BackToCategoryButton from './components/BackToCategoryButton';
import withRouter from './util/withRouter';
import AppRoutes from './containers/AppRoutes';

// console.log(dataset.categories);

// const categories = Object.values(populateData());

class App extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
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
        // console.log(result);
        this.setState({
          categories: result,
          isLoaded: true
        });
      });
    // .then(() => console.log(this.state));
  }

  getCategory(categoryId, subCategoryId = null) {
    // console.log(categoryId, this.state);
    const c = this.state.categories[categoryId] ? {
      ...this.state.categories[categoryId],
      totalItems: this.state.categories[categoryId].items
        ? this.state.categories[categoryId].items.length
        : 0
    } : false;

    if (subCategoryId && c.categories) {
      const subC = c.categories.find((s) => (s.id === subCategoryId));
      return subC;
    }

    return c;
  }

  getItemFrom(categoryId, itemId, subCategoryId = null) {
    const c = this.getCategory(categoryId, subCategoryId);
    // console.log(c, this.state);
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
