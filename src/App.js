import { Route, Routes } from 'react-router-dom';
import { BiHome as HomeIcon, BiArrowBack as BackIcon } from 'react-icons/bi';
import OuterContainer from './components/OuterContainer';
import Home from './containers/Home';
import { getCategories } from './data';
import Category from './containers/Category';
import Navbar from './components/Navbar';
import NavbarLink from './components/NavbarLink';
import Item from './containers/Item';

// console.log(dataset.categories);

const categories = Object.values(getCategories());

function App() {
  return (
    <OuterContainer>
      <Navbar>
        <NavbarLink to="/"><HomeIcon size={64} /></NavbarLink>
        <NavbarLink to={-1}><BackIcon size={64} /></NavbarLink>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home categories={categories} />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/category/:categoryId/item/:itemId" element={<Item />} />
      </Routes>
    </OuterContainer>
  );
}

export default App;
