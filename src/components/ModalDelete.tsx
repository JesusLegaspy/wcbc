import { FC } from 'react';

interface ModalDeleteProps {
  setIsModalAlive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDelete: FC<ModalDeleteProps> = ({ setIsModalAlive }) => {

  const handleCancel = () => {
    setIsModalAlive(false);
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="z-40 fixed top-0 left-0 flex items-center justify-center min-h-screen w-full bg-gray-800 bg-opacity-50"
      onClick={handleCancel}
    >
      <div
        className="bg-white p-4"
        onClick={stopPropagation}
      >
        <p>Would you like to delete this character?</p>
        <div className='flex justify-end mt-2'>
          <button
            className="p-2 bg-yellow-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="p-2 ml-2 bg-orange-400">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;