import { useContext } from "react";
import { PageContext, Page } from "../context/page";
import { GoPlusCircle } from "react-icons/go";
import { FaBook } from "react-icons/fa6";
import { TbSortDescending2, TbChevronLeftPipe, TbChevronRightPipe } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";

const Menu = () => {
  const { setPage } = useContext(PageContext);

  const handleClickAdd = () => {
    setPage(Page.AddCharacter);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-gray-100">
      <div className="container mx-auto max-w-screen-xl">
        <ul className="flex flex-row justify-center items-center h-16">
          <li className="p-3 flex justify-center items-center">
            <button><TbChevronLeftPipe className="text-4xl" /></button>
          </li>
          <li className="p-3 flex justify-center items-center">
            <button onClick={handleClickAdd}><GoPlusCircle className="text-4xl" /></button>
          </li>
          <li className="p-3 flex justify-center items-center">
            <button><FaBook className="text-4xl" /></button>
          </li>
          <li className="p-3 flex justify-center items-center">
            <button><TbSortDescending2 className="text-4xl" /></button>
          </li>
          <li className="p-3 flex justify-center items-center">
            <button><FiSearch className="text-4xl" /></button>
          </li>
          <li className="p-3 flex justify-center items-center">
            <button><TbChevronRightPipe className="text-4xl" /></button>
          </li>
        </ul>
      </div>
    </div>

  );
}

export default Menu;