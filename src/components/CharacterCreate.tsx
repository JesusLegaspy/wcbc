import Navbar from "./Navbar";
import { useContext } from "react";
import { BookContext } from "../context/books";

const CharacterCreate = () => {
  const bookContext = useContext(BookContext);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="m-auto pt-9">
          <img className="w-28 h-28" src={`https://picsum.photos/seed/${bookContext?.books?.at(bookContext?.currBookId)?.id ?? 1 * 10}/400/400`} alt="Book cover" />
        </div>
        <div className="m-auto">
          {bookContext?.books?.at(bookContext?.currBookId)?.title}
        </div>
        <div className="pt-9">
          <div className="m-auto">
            <p>Add new character to chapter.</p>
          </div>
        </div>
        <div className="m-auto">
          <button className="p-2 bg-blue-300 hover:bg-blue-400">Existing</button>
          <button className="p-2 bg-green-300 hover:bg-green-400">New</button>
        </div>
      </div>
    </div>
  );
}

export default CharacterCreate;