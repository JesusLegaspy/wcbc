import { useState } from "react";


interface ListSectionProps {
  text: string;
  className?: string;
}

const ListSection: React.FC<ListSectionProps> = ({ text, className: cName }) => {
  const [showButtons, setShowButtons] = useState<boolean>(false);

  const handleEdit = () => {
    console.log('Edit');
  }

  const handleDelete = () => {
    console.log('Delete');
  }

  const handleClick = () => {
    setShowButtons(prev => !prev);
  }

  return (
    <div className={`${cName} flex space-x-4 sticky top-16 px-4 py-3 font-semibold text-slate-900 bg-slate-100 backdrop-blur-sm ring-1 ring-slate-900/10`}>
      <div className="flex">
        <div
          className="hover:underline cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            handleClick();
          }}
        >
          {text}
        </div>
        <div className="grow">

        </div>
      </div>

      <div className={`${showButtons ? '' : 'hidden'} flex space-x-2`}>
        <button className="text-xs py-1 px-2 bg-yellow-100 rounded-md" onClick={() => handleEdit()}>Edit</button>
        <button className="text-xs py-1 px-2 bg-red-200 rounded-md" onClick={() => handleDelete()}>Delete</button>
        <button className="text-xs py-1 px-2 bg-neutral-300 rounded-md" onClick={() => handleClick()}>Cancel</button>
      </div>
    </div>

  );
}

export default ListSection;