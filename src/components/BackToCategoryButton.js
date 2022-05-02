import { BiUpArrowCircle as BackIcon } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import NavbarLink from './NavbarLink';

function BackToCategoryButton({ noSub = false }) {
  const { categoryId, subCategoryId } = useParams();
  return (
    <NavbarLink
      to={`/category/${categoryId}${subCategoryId && !noSub ? `/${subCategoryId}` : ''}`}
    >
      <BackIcon size={64} />
    </NavbarLink>
  );
}

export default BackToCategoryButton;
