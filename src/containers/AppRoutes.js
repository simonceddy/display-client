import { useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Category from '../features/Category/Category';
import Home from './Home';
import Item from '../features/Item/Item';
import TransitionContainer from '../components/TransitionContainer';

function AppRoutes({ data }) {
  const location = useLocation();
  const nodeRef = useRef(null);

  // TODO fix transitions for routes - use key
  return (
    <TransitionGroup component={null}>
      <CSSTransition
        nodeRef={nodeRef}
        key={location.key}
        classNames="fade"
        timeout={0}
        component={null}
      >
        <TransitionContainer ref={nodeRef}>
          <Routes>
            <Route path="/" element={<Home categories={data} />} />
            <Route
              path="/category/:categoryId"
            >
              <Route
                path="item/:itemId"
                element={<Item />}
              />
              <Route path=":subCategoryId" element={<Category />} />
              <Route
                path=":subCategoryId/item/:itemId"
                element={<Item />}
              />
              <Route index element={<Category />} />
            </Route>
          </Routes>
        </TransitionContainer>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default AppRoutes;
