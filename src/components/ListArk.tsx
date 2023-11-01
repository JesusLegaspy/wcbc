import { useContext, useState } from "react";
import { PageContext } from "../context/page";
import { BookContext } from "../context/books";
import { ArkContext, Ark } from "../context/arks";
import ArkCreateOrEdit from "./ArkCreateOrEdit";

interface ListSectionProps {
  ark: Ark;
  className?: string;
}

const ListArk: React.FC<ListSectionProps> = ({ ark, className: cName }) => {
  const { setComponent } = useContext(PageContext);
  const { deleteArkById } = useContext(ArkContext);
  const { books } = useContext(BookContext);
  const [showButtons, setShowButtons] = useState<boolean>(false);

  const handleEdit = () => {
    setComponent(ArkCreateOrEdit, { ark });
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
          {ark.title}
        </div>
        <div className="grow">

        </div>
      </div>

      <div className={`${showButtons ? '' : 'hidden'} flex space-x-2`}>
        <button
          className="text-xs py-1 px-2 bg-yellow-100 hover:bg-yellow-200 rounded-md"
          onClick={() => handleEdit()}
        >
          Edit
        </button>
        <button
          className="text-xs py-1 px-2 bg-red-200 hover:bg-red-300 rounded-md"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
        <button
          className="text-xs py-1 px-2 bg-neutral-300 hover:bg-neutral-200 rounded-md"
          onClick={() => handleClick()
          }>
          Cancel
        </button>
      </div>
    </div>

  );
}

export default ListArk;