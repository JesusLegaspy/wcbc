import { useContext } from 'react';
import { BookContext } from '../context/books';
import { MdArrowBack } from 'react-icons/md';
import { PageContext, Page } from '../context/page';

const Navbar = () => {
  const { currBook } = useContext(BookContext);
  const { setPage } = useContext(PageContext);

  const handleClickBack = () => {
    setPage(Page.Home);
  }

  return (
    <div className={`sticky top-0 bg-gray-100  w-full border-b z-10`}>
      <div className="container mx-auto max-w-screen-xl">
        <div className='mb-1 h-14 flex items-center'>
          <button onClick={handleClickBack}><MdArrowBack className='mx-3 text-4xl' /></button>
          <p className='flex-grow text-2xl'>
            {currBook?.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;