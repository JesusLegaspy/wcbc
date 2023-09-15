import NavbarSub from "./NavbarSub";
import CharacterList from './CharacterList';
import { PiPlusSquareFill } from "react-icons/pi";

const CharacterCreate = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarSub />
      <div className=" container m-auto max-w-screen-xl flex-grow relative">
        <CharacterList />
      </div>
      <div className="relative container m-auto max-w-screen-xl pb-4">
        <button className="fixed bottom-7 right-7 text-4xl ml-auto">
          <PiPlusSquareFill />
        </button>
      </div>
    </div>
  );
}

export default CharacterCreate;