import { useContext } from "react";
import { PageContext } from "../context/page";
import NavbarSub from "./NavbarSub";
import CharacterList from './CharacterList';
import CharacterCreate from "./CharacterCreate";
import { PiPlusSquareFill } from "react-icons/pi";
import '../styles/CharacterAdd.css';


const CharacterSelection = () => {
  const { setComponent } = useContext(PageContext);

  const handleButtonAdd = () => {
    setComponent(CharacterCreate, {});
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarSub text="Add character" />
      <div className="container m-auto max-w-screen-lg flex-grow relative">
        <CharacterList />
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

export default CharacterSelection;