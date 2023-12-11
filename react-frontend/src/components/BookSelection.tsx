import { PageContext } from "../context/page";
import { useContext } from "react";
import BookList from "./BookList";
import NavbarSub from "./NavbarTopSub";
import BookCreateOrEdit from "./BookCreateOrEdit";
import { PiPlusSquareFill } from "react-icons/pi";
import "../styles/Selection.css";


const BookSelection = () => {
  const { setComponent } = useContext(PageContext);

  const handleButtonAdd = () => {
    setComponent(BookCreateOrEdit, {});
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarSub text="Change Book" />
      <div className="container m-auto max-w-screen-lg flex-grow relative">
        <BookList />
      </div>
      <div className="relative container m-auto max-w-screen-lg pb-4">
        <div className="relative container m-auto max-w-screen-lg pb-4">
          <button onClick={handleButtonAdd} className="z-30 btn-create-persona fixed bottom-7 right-7 text-5xl ml-auto">
            <PiPlusSquareFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookSelection;