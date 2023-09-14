import { useContext } from 'react';
import { BookContext } from '../context/books';
import useScrollDirection from '../hooks/useScrollDirection';

const Navbar = () => {
  const { currBook } = useContext(BookContext);
  const scrollDirection = useScrollDirection();

  return (
    <div className={`bg-gray-100 fixed w-full border-b z-10 transform ${scrollDirection === 'up' ? 'translate-y-0' : '-translate-y-16'} lg:translate-y-0 transition-transform duration-300 lg:static`}>
      <div className="container mx-auto max-w-screen-xl">
        <div className='mb-1 h-16 flex items-center'>
          <img className="w-16 h-16" src={`https://picsum.photos/seed/${currBook?.id ?? 1 * 10}/400/400`} alt="Book cover" />
          <p className='flex-grow text-2xl pl-3'>
            {currBook?.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;