import { Route, Routes } from 'react-router-dom';
import { BiHome as HomeIcon, BiArrowBack as BackIcon } from 'react-icons/bi';
import { Component } from 'react';
import OuterContainer from './components/OuterContainer';
import Home from './containers/Home';
import { getCategories } from './data';
import Category from './containers/Category';
import Navbar from './components/Navbar';
import NavbarLink from './components/NavbarLink';
import Item from './containers/Item';

// console.log(dataset.categories);

// const categories = Object.values(getCategories());

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    getCategories()
      .then((result) => {
        // console.log(result);
        this.setState({
          categories: Object.values(result)
        });
      });
  }

  render() {
    return (
      <OuterContainer>
        <Navbar>
          <NavbarLink to="/"><HomeIcon size={64} /></NavbarLink>
          <NavbarLink to={-1}><BackIcon size={64} /></NavbarLink>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home categories={this.state.categories} />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/category/:categoryId/item/:itemId" element={<Item />} />
        </Routes>
      </OuterContainer>
    );
  }
}

export default App;
