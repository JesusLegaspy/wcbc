import Navbar from "./Navbar";
import { useContext } from "react";
import { BookContext } from "../context/books";

const CharacterCreate = () => {
  const { books, currBookId } = useContext(BookContext);

  return (
    <div>
      <Navbar />
      <div className="container">
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