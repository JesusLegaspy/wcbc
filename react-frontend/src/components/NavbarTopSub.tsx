import { useContext } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { PageContext, } from '../context/page';

const NavbarTopSub = ({ text }: { text?: string }) => {
  const { goBack } = useContext(PageContext);

  const handleClickBack = () => {
    goBack();
  }

  return (
    <div className={`sticky top-0 bg-gray-100  w-full border-b z-10`}>
      <div className="container mx-auto max-w-screen-xl">
        <div className='mb-1 h-14 flex items-center'>
          <button onClick={handleClickBack}><MdArrowBack className='mx-3 text-4xl' /></button>
          <p className='flex-grow text-2xl'>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavbarTopSub;