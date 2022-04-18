import { BiUpArrowCircle as BackIcon } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import NavbarLink from './NavbarLink';

function BackToCategoryButton() {
  const { categoryId } = useParams();
  return (
    <NavbarLink to={`/category/${categoryId}`}><BackIcon size={64} /></NavbarLink>

  );
}

export default BackToCategoryButton;
