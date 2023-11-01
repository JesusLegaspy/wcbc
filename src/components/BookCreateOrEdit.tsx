import { useState, useContext, useEffect } from "react";
import { ArkContext } from "../context/arks";
import { Book, BookContext } from "../context/books";
import { PageContext } from "../context/page";
import ArkCreateForm from "./ArkCreateForm";
import FormTemplate from "./FormTemplate";
import { LiaTrashAltSolid } from "react-icons/lia";
import "../styles/BookCreateOrEdit.css";


interface BookCreateOrEditProps {
  book?: Book;
  arkId?: number; // Preselect ark
}

// If a book is passed, then assume editing.
// Otherwise, assume book creation.

const BookCreateOrEdit: React.FC<BookCreateOrEditProps> = ({ book, arkId }) => {
  const { allArksSortedByOrder, deleteArkById } = useContext(ArkContext);
  const { books, createBook, editBook } = useContext(BookContext);
  const { goBack } = useContext(PageContext);

  const [valueTitle, setValueTitle] = useState<string>(book?.title ?? '');

  const [arkDeleteError, setArkDeleteError] = useState<boolean>(false);
  const [showArkCreate, setShowArkCreate] = useState<boolean>(false);
  const [valueArkId, setValueArkId] = useState<number | undefined>(book?.arkId || arkId);
  const [valueOrder, setValueOrder] = useState<number>(book?.order ?? 1);

  useEffect(() => {
    if (book !== undefined || arkId !== undefined || valueArkId !== undefined) return;
    console.debug('BookCreateOrEdit.tsx', 'useEffect', 'setValueArkId', 'dep:allArks');
    setValueArkId(allArksSortedByOrder.at(0)?.id ?? -1);
  }, [allArksSortedByOrder, book, arkId, valueArkId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueArkId === undefined) {
      console.warn("Ark is required");
      // todo: Warning message system.
      return;
    }

    if (book) {
      editBook({
        id: book.id,
        arkId: valueArkId,
        order: valueOrder,
        title: valueTitle
      });
    } else {
      createBook(valueTitle, valueArkId);
    }
    goBack();
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueTitle(e.target.value);
  }

  const handleChangeArk = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValueArkId(parseInt(e.target.value));
  }

  const handleChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValueOrder(Number(newValue));
  };

  const handlClickDeleteArk = () => {
    if (valueArkId === undefined) {
      setArkDeleteError(true);
      return;
    }

    // Only delete if the ark is not associated with any books
    if (books.some(book => book.arkId === valueArkId)) {
      setArkDeleteError(true);
      return;
    }
    deleteArkById(valueArkId);
  }

  const handleClickAddArk = () => {
    setShowArkCreate(isCreate => !isCreate);
  }

  const handleClickCancel = () => {
    goBack();
  }

  return (
    <FormTemplate title={book ? `Editing ${book.title}` : "Create new book"}>
      <form className="flex flex-col max-w-2xl mx-auto" onSubmit={handleSubmit} onClick={() => setArkDeleteError(false)}>

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

        {/* Ark */}
        <div className="my-4 flex items-center">
          <label className="mb-1 mr-3" htmlFor="arks">Ark</label>
          <select
            className="mr-3"
            id="arks"
            onChange={handleChangeArk}
            value={valueArkId}
          >
            {allArksSortedByOrder.map(ark => (
              <option key={`option_${ark.id}`} value={ark.id}>{ark.title}</option>
            ))}
          </select>
          {arkDeleteError && <div className="text-red-500">Ark with books cannot be deleted.</div>}
          <button
            type="button"
            className="ml-auto bg-stone-200 p-1 text-sm rounded-lg hover:bg-stone-300"
            onClick={(e) => {
              e.stopPropagation()
              handlClickDeleteArk()
            }}
          >
            <LiaTrashAltSolid />
          </button>
          <button
            type="button"
            className="ml-2 bg-stone-200 p-1 px-2 text-sm rounded-lg hover:bg-stone-300"
            onClick={() => handleClickAddArk()}
          >
            {showArkCreate ? "Cancel" : "New Ark"}
          </button>
        </div>

        {/* Ark Create */}
        {showArkCreate && <ArkCreateForm close={(newArkId) => {
          setValueArkId(newArkId);
          setShowArkCreate(false);
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