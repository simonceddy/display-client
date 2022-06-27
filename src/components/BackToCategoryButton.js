import { BiUpArrowCircle as UpIcon } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import NavbarLink from './NavbarLink';

function defaultGetLink(key, sub) {
  let link = key ? `/category/${key}` : '/';
  if (key && sub) link += `/${sub}`;
  return link;
}

function BackToCategoryButton({ noSub = false, getLink = defaultGetLink }) {
  const { categoryId, subCategoryId } = useParams();
  const link = getLink(categoryId, subCategoryId && !noSub ? subCategoryId : null);
  return (
    <NavbarLink
      to={link}
    >
      <UpIcon size={64} />
    </NavbarLink>
  );
}

export default BackToCategoryButton;
