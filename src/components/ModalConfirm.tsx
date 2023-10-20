import { FC } from 'react';

interface ModalConfirmProps {
  message: string;
  cancelAction: () => void;
  acceptAction: () => void;
}

const ModalConfirm: FC<ModalConfirmProps> = ({ message, cancelAction, acceptAction }) => {

  const handleCancel = () => {
    cancelAction();
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
        <p>{message}</p>
        <div className='flex justify-end mt-2'>
          <button
            className="p-2 bg-yellow-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="p-2 ml-2 bg-orange-400"
            onClick={acceptAction}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm;