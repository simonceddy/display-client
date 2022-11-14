import { Route, Routes } from 'react-router-dom';
import { BiHome as HomeIcon, BiArrowBack as BackIcon } from 'react-icons/bi';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import OuterContainer from './components/OuterContainer';
import Navbar from './components/Navbar';
import NavbarLink from './components/NavbarLink';
import BackToCategoryButton from './components/BackToCategoryButton';
import AppRoutes from './containers/AppRoutes';
import ErrorBoundary from './containers/ErrorBoundary';
import DisplayTitle from './features/DisplayTitle/DisplayTitle';
// import { setDisplayTitle } from './features/DisplayTitle/displayTitleSlice';
import { useFetchManifestQuery } from './services/api';
import MediaPreloader from './containers/MediaPreloader';

function App() {
  // const dispatch = useDispatch();
  const { data, isSuccess } = useFetchManifestQuery();

  useEffect(() => {
    let setup = false;
    if (!setup && isSuccess) {
      if (data['display-title']
            && data['display-title'].trim
            && data['display-title'].trim().length > 0
      ) {
        // Set title from manifest
        document.getElementsByTagName('title')[0].innerHTML = data['display-title'];
      }
    }
    return () => {
      setup = true;
    };
  }, [isSuccess]);

  return (
    <ErrorBoundary>
      <MediaPreloader>
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
          <div className="relative flex-1 w-full overflow-y-scroll whitespace-nowrap">
            <AppRoutes />
          </div>
        </OuterContainer>
      </MediaPreloader>
    </ErrorBoundary>
  );
}

export default App;
