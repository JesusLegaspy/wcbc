import { PiPlusSquareFill } from "react-icons/pi";
import BookList from "./BookList";
import NavbarSub from "./NavbarSub";
import { Page, PageContext } from "../context/page";
import { useContext } from "react";

const BookSelection = () => {
  const { setPage } = useContext(PageContext);

  const handleButtonAdd = () => {
    setPage(Page.BookCreate);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarSub text="Change Book" />
      <div className="container m-auto max-w-screen-lg flex-grow relative">
        <BookList />
      </div>
      <div className="relative container m-auto max-w-screen-lg pb-4">
        <div className="relative container m-auto max-w-screen-lg pb-4">
          <button onClick={handleButtonAdd} className="z-30 btn-create-character fixed bottom-7 right-7 text-5xl ml-auto">
            <PiPlusSquareFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookSelection;