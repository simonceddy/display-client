import { Route, Routes } from 'react-router-dom';
import { BiHome as HomeIcon, BiArrowBack as BackIcon } from 'react-icons/bi';
import OuterContainer from './components/OuterContainer';
import Navbar from './components/Navbar';
import NavbarLink from './components/NavbarLink';
import BackToCategoryButton from './components/BackToCategoryButton';
import AppRoutes from './containers/AppRoutes';
import ErrorBoundary from './containers/ErrorBoundary';
import DisplayTitle from './features/DisplayTitle/DisplayTitle';

function App() {
  return (
    <ErrorBoundary>
      <OuterContainer>
        <div className="flex flex-row justify-center items-center w-full">
          <Navbar>
            <NavbarLink to="/"><HomeIcon size={64} /></NavbarLink>
            <Routes>
              <Route
                path="/category/:categoryId"
                element={<BackToCategoryButton getLink={() => '/'} />}
              />
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
          <DisplayTitle />
          <Navbar className="justify-end">
            <NavbarLink to={-1}><BackIcon size={64} /></NavbarLink>
          </Navbar>
        </div>
        <div className="relative w-full">
          <AppRoutes />
        </div>
      </OuterContainer>
    </ErrorBoundary>
  );
}

export default App;
