/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/no-unused-state */
import { Route, Routes } from 'react-router-dom';
import { BiHome as HomeIcon, BiArrowBack as BackIcon } from 'react-icons/bi';
import { Component } from 'react';
import OuterContainer from './components/OuterContainer';
import Home from './containers/Home';
import { populateData } from './data';
import Category from './containers/Category';
import Navbar from './components/Navbar';
import NavbarLink from './components/NavbarLink';
import Item from './containers/Item';
import BackToCategoryButton from './components/BackToCategoryButton';

// console.log(dataset.categories);

// const categories = Object.values(populateData());

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
        console.log(result);
        this.setState({
          categories: result,
          isLoaded: true
        });
      })
      .then(() => console.log(this.state));
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
              path="/category/:categoryId/item/:itemId"
              element={<BackToCategoryButton />}
            />
          </Routes>
          <NavbarLink to={-1}><BackIcon size={64} /></NavbarLink>
        </Navbar>
        {!this.state.isLoaded ? (
          <div>Loading data...</div>
        ) : (
          <Routes>
            <Route path="/" element={<Home categories={data} />} />
            <Route
              path="/category/:categoryId"
            >
              <Route
                path="item/:itemId"
                element={<Item getItemFrom={this.getItemFrom} />}
              />
              <Route path=":subCategoryId" element={<Category getCategory={this.getCategory} />} />
              <Route
                path=":subCategoryId/item/:itemId"
                element={<Item getItemFrom={this.getItemFrom} />}
              />
              <Route index element={<Category getCategory={this.getCategory} />} />
            </Route>
          </Routes>
        )}
      </OuterContainer>
    );
  }
}

export default App;
