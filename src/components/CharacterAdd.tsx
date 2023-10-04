import { useContext } from "react";
import NavbarSub from "./NavbarSub";
import CharacterList from './CharacterList';
import { PiPlusSquareFill } from "react-icons/pi";
import '../styles/CharacterAdd.css';
import { PageContext, Page } from "../context/page";

const CharacterAdd = () => {
  const { setPage } = useContext(PageContext);

  const handleButtonAdd = () => {
    setPage(Page.CreateCharacter);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarSub text="Add character" />
      <div className="container m-auto max-w-screen-xl flex-grow relative">
        <CharacterList />
      </div>
      <div className="relative container m-auto max-w-screen-xl pb-4">
        <div className="relative container m-auto max-w-screen-xl pb-4">
          <button onClick={handleButtonAdd} className="z-30 btn-create-character fixed bottom-7 right-7 text-5xl ml-auto">
            <PiPlusSquareFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CharacterAdd;