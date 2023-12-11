import { useContext } from 'react';
import { BookContext } from '../context/books';
import { ChapterContext } from '../context/chapters';
import useScrollDirection from '../hooks/useScrollDirection';

const NavbarTop = () => {
  const { currBook } = useContext(BookContext);
  const { chapterNumber } = useContext(ChapterContext);
  const scrollDirection = useScrollDirection();

  return (
    <div className={`bg-gray-100 fixed w-full border-b z-20 transform ${scrollDirection === 'up' ? 'translate-y-0' : '-translate-y-16'} lg:translate-y-0 transition-transform duration-300 lg:static`}>
      <div className="container mx-auto max-w-screen-xl">
        <div className='mb-1 h-16 flex items-center'>
          <div className='relative w-16 h-16'>
            <img className="w-16 h-16" src={`https://picsum.photos/seed/${currBook?.id ?? 1 * 10}/400/400`} alt="Book cover" />
            <div className='absolute top-0 left-8 bottom-0 w-16 flex items-center justify-center text-6xl text-white bg-black/30'>
              {chapterNumber === 0 ? 'P' : chapterNumber}
            </div>
          </div>
          <p className='flex-grow text-2xl pl-3'>
            {currBook?.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;