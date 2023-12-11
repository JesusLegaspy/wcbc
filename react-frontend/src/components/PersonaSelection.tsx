import { useContext } from "react";
import { PageContext } from "../context/page";
import NavbarSub from "./NavbarTopSub";
import PersonaList from './PersonaList';
import PersonaCreateOrEdit from "./PersonaCreateOrEdit";
import { PiPlusSquareFill } from "react-icons/pi";
import '../styles/Selection.css';


const PersonaSelection = () => {
  const { setComponent } = useContext(PageContext);

  const handleButtonAdd = () => {
    setComponent(PersonaCreateOrEdit, {});
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarSub text="Add persona" />
      <div className="container m-auto max-w-screen-lg flex-grow relative">
        <PersonaList />
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

export default PersonaSelection;