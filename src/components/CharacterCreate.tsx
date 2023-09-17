import NavbarSub from "./NavbarSub";
import CharacterList from './CharacterList';
import { PiPlusSquareFill } from "react-icons/pi";
import '../styles/CharacterCreate.css';

const CharacterCreate = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarSub />
      <div className="container m-auto max-w-screen-xl flex-grow relative">
        <CharacterList />
      </div>
      <div className="relative container m-auto max-w-screen-xl pb-4 bg-blue-400">
        <div className="relative container m-auto max-w-screen-xl pb-4">
          <button className="btn-create-character fixed bottom-7 right-7 text-4xl ml-auto">
            <PiPlusSquareFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CharacterCreate;