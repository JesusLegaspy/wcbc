import { PiPlusSquareFill } from "react-icons/pi";
import BookList from "./BookList";
import NavbarSub from "./NavbarSub";

const BookSelection = () => {

  const handleButtonAdd = () => {
    // setPage(Page.CreateCharacter);
    console.debug('add new book');
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