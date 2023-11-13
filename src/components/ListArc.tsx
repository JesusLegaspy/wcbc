import { useContext, useState } from "react";
import { PageContext } from "../context/page";
import { BookContext } from "../context/books";
import { ArcContext, Arc } from "../context/arcs";
import ArcCreateOrEdit from "./ArcCreateOrEdit";
import { PiPlusSquareFill } from "react-icons/pi";
import BookCreateOrEdit from "./BookCreateOrEdit";

interface ListSectionProps {
  arc: Arc;
  className?: string;
}

const ListArc: React.FC<ListSectionProps> = ({ arc, className: cName }) => {
  const { setComponent } = useContext(PageContext);
  const { deleteArcById } = useContext(ArcContext);
  const { books } = useContext(BookContext);
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [showDeleteError, setShowDeleteError] = useState<boolean>(false);

  const handleEdit = () => {
    setComponent(ArcCreateOrEdit, { arc });
  }

  const handleDelete = () => {
    if (books.some(book => book.arcId === arc.id)) {
      setShowDeleteError(true);
      return;
    }
    deleteArcById(arc.id);
  }

  const handleClick = () => {
    setShowButtons(prev => !prev);
  }

  return (
    <div
      className={`${cName} flex space-x-4 content-center sticky top-16 px-4 py-3 font-semibold text-slate-900 bg-slate-100 backdrop-blur-sm ring-1 ring-slate-900/10`}
      onClick={() => setShowDeleteError(false)}
    >
      <div className="flex">
        <div
          className="hover:underline cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            handleClick();
          }}
        >
          {arc.title}
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
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
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

      {showDeleteError &&
        <div className="font-normal text-red-500">
          <p>Can only delete empty arcs</p>
        </div>
      }
      <div className="grow flex justify-end">
        <button
          aria-label={`Add book to ${arc.title}`}
          onClick={() => setComponent(BookCreateOrEdit, { arcId: arc.id })}
        >
          <PiPlusSquareFill className="text-2xl text-slate-400 hover:text-slate-500" />
        </button>
      </div>

    </div>
  );
}

export default ListArc;