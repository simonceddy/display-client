// import { useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Category from './Category';
import Home from './Home';
import Item from './Item';

function AppRoutes({ getCategory, getItemFrom, data }) {
  const location = useLocation();
  // const nodeRef = useRef(null);

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fade" timeout={500}>
        <Routes>
          <Route path="/" element={<Home categories={data} />} />
          <Route
            path="/category/:categoryId"
          >
            <Route
              path="item/:itemId"
              element={<Item getItemFrom={getItemFrom} />}
            />
            <Route path=":subCategoryId" element={<Category getCategory={getCategory} />} />
            <Route
              path=":subCategoryId/item/:itemId"
              element={<Item getItemFrom={getItemFrom} />}
            />
            <Route index element={<Category getCategory={getCategory} />} />
          </Route>
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default AppRoutes;
