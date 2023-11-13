import { useState, useContext, useEffect } from "react";
import { PageContext } from "../context/page";
import { ArcContext } from "../context/arcs";
import { Book, BookContext } from "../context/books";
import ArcCreateForm from "./ArcCreateForm";
import FormTemplate from "./FormTemplate";
import { LiaTrashAltSolid } from "react-icons/lia";
import "../styles/BookCreateOrEdit.css";


interface BookCreateOrEditProps {
  book?: Book;
  arcId?: number; // Preselect arc
}

// If a book is passed, then assume editing.
// Otherwise, assume book creation.

const BookCreateOrEdit: React.FC<BookCreateOrEditProps> = ({ book, arcId }) => {
  const { goBack } = useContext(PageContext);
  const { allArcsSortedByOrder, deleteArcById } = useContext(ArcContext);
  const { books, createBook, editBook } = useContext(BookContext);

  const [valueTitle, setValueTitle] = useState<string>(book?.title ?? '');

  const [arcDeleteError, setArcDeleteError] = useState<boolean>(false);
  const [showArcCreate, setShowArcCreate] = useState<boolean>(false);
  const [valueArcId, setValueArcId] = useState<number | undefined>(book?.arcId || arcId);
  const [valueOrder, setValueOrder] = useState<number>(book?.order ?? 1);

  useEffect(() => {
    if (book !== undefined || arcId !== undefined || valueArcId !== undefined) return;
    console.debug('BookCreateOrEdit.tsx', 'useEffect', 'setValueArcId', 'dep:allArcs');
    setValueArcId(allArcsSortedByOrder.at(0)?.id ?? -1);
  }, [allArcsSortedByOrder, book, arcId, valueArcId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueArcId === undefined) {
      console.warn("Arc is required");
      // todo: Warning message system.
      return;
    }

    if (book) {
      editBook({
        id: book.id,
        arcId: valueArcId,
        order: valueOrder,
        title: valueTitle,
        chapterIds: book.chapterIds
      });
    } else {
      createBook(valueTitle, valueArcId, valueOrder);
    }
    goBack();
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueTitle(e.target.value);
  }

  const handleChangeArc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValueArcId(parseInt(e.target.value));
  }

  const handleChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValueOrder(Number(newValue));
  };

  const handlClickDeleteArc = () => {
    if (valueArcId === undefined) {
      setArcDeleteError(true);
      return;
    }

    // Only delete if the arc is not associated with any books
    if (books.some(book => book.arcId === valueArcId)) {
      setArcDeleteError(true);
      return;
    }
    deleteArcById(valueArcId);
  }

  const handleClickAddArc = () => {
    setShowArcCreate(isCreate => !isCreate);
  }

  const handleClickCancel = () => {
    goBack();
  }

  return (
    <FormTemplate title={book ? `Editing ${book.title}` : "Create new book"}>
      <form className="flex flex-col max-w-2xl mx-auto" onSubmit={handleSubmit} onClick={() => setArcDeleteError(false)}>

        {/* Title */}
        <div className="my-4 flex items-center">
          <label className="mb-1 mr-3" htmlFor="title">Title</label>
          <input
            className="p-2 border border-gray-300 rounded w-full bg-slate-200"
            type="text"
            id="title"
            name="title"
            placeholder=""
            value={valueTitle}
            onChange={handleChangeTitle}
            required
          />
        </div>

        {/* Arc */}
        <div className="my-4 flex items-center">
          <label className="mb-1 mr-3" htmlFor="arcs">Arc</label>
          <select
            className="mr-3"
            id="arcs"
            onChange={handleChangeArc}
            value={valueArcId}
          >
            {allArcsSortedByOrder.map(arc => (
              <option key={`option_${arc.id}`} value={arc.id}>{arc.title}</option>
            ))}
          </select>
          {arcDeleteError && <div className="text-red-500">Arc with books cannot be deleted.</div>}
          <button
            type="button"
            className="ml-auto bg-stone-200 p-1 text-sm rounded-lg hover:bg-stone-300"
            onClick={(e) => {
              e.stopPropagation()
              handlClickDeleteArc()
            }}
          >
            <LiaTrashAltSolid />
          </button>
          <button
            type="button"
            className="ml-2 bg-stone-200 p-1 px-2 text-sm rounded-lg hover:bg-stone-300"
            onClick={() => handleClickAddArc()}
          >
            {showArcCreate ? "Cancel" : "New Arc"}
          </button>
        </div>

        {/* Arc Create */}
        {showArcCreate && <ArcCreateForm close={(newArcId) => {
          setValueArcId(newArcId);
          setShowArcCreate(false);
        }}
        />}

        {/* Order */}
        <div className="flex my-8 items-center">
          <label htmlFor="order" className="mr-3 whitespace-nowrap">Book Number</label>
          <div className="relative w-full">
            {/* Tooltip */}
            <div
              style={{
                left: `${(valueOrder - 1) * 100 / 5}%`,
                bottom: "25px"
              }}
              className="absolute p-1 rounded bg-stone-200 text-xs tooltip"
            >
              {valueOrder}
            </div>
            <input
              className="slider w-full"
              id="order"
              type="range"
              min="1"
              max="6"
              step="1"
              value={valueOrder}
              onChange={handleChangeOrder}
            />
          </div>
          <span className="ml-3">
            {valueOrder}
          </span>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="button"
            className="p-2 bg-gray-100 hover:bg-gray-200 mt-4 rounded-lg"
            onClick={() => handleClickCancel()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="p-2 bg-cyan-100 hover:bg-cyan-200 mt-4 rounded-lg ml-4"
          >
            {book ? "Edit Book" : "Create Book"}
          </button>
        </div>
      </form>
    </FormTemplate>
  );
}

export default BookCreateOrEdit;