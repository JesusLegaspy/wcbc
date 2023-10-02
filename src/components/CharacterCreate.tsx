import { useContext, useState } from "react";
import { CharacterContext } from "../context/characters";
import { BookContext } from "../context/books";
import { PageContext } from "../context/page";
import NavbarSub from "./NavbarSub";
import profile from "../assets/images/profile.png";
import { TbPhotoPlus } from 'react-icons/tb';

const CharacterCreate = () => {
  const { createCharacter } = useContext(CharacterContext)
  const { currBookId, addCharacterById } = useContext(BookContext);
  const { goHome, goBack } = useContext(PageContext);
  const [valueName, setValueName] = useState<string>('');
  const [valueDescription, setValueDescription] = useState<string>('');
  const [checkedAddToExistingBook, setCheckedAddToExistingBook] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCharacter(currBookId, valueName, valueDescription, '').then(id => {
      if (!id) {
        console.error("Could not add new character to existing book");
        goHome();
        return;
      }

      if (!checkedAddToExistingBook) {
        goBack();
        return;
      }

      addCharacterById(id);
      goHome();
    });
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueName(e.target.value);
  }

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValueDescription(e.target.value);
  }

  const handleChangeAddToExistingBook = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedAddToExistingBook(e.target.checked);
  }

  return (
    <div>
      <NavbarSub text="Create new character" />
      <div className="container m-auto max-w-sm sm:max-w-md sm:bg-slate-100 sm:border-x sm:border-b sm:border-gray-200">
        <form className="flex flex-col mx-6" onSubmit={handleSubmit}>
          <div className="relative m-auto p-6 mb-8">
            <div className="absolute w-52 h-52 bg-slate-200 rounded-full" />
            <img className="relative top-2 left-2 z-10 w-48 h-48 m-auto rounded-full opacity-40" src={profile} alt="Empty profile." />
            <button className="z-20 w-10 h-10 absolute bottom-4 right-4 p-1 hover:bg-slate-200/50 rounded-full">
              <TbPhotoPlus className="w-full h-full text-slate-600 hover:text-slate-700" />
            </button>
          </div>
          <div className="my-4">
            <label className="block mb-1" htmlFor="name">Name</label>
            <input
              className="p-2 border border-gray-300 rounded w-full bg-slate-200"
              type="text"
              id="name"
              name="name"
              placeholder="ShadowWhisker"
              onChange={handleChangeName}
            />
          </div>
          <div className="my-4">
            <label className="block mb-1" htmlFor="description">Description</label>
            <textarea
              className="p-1 border border-gray-300 rounded w-full resize-none bg-slate-200"
              rows={5}
              id="description"
              name="description"
              placeholder="Dark grey tabby with amber-green eyes..."
              onChange={handleChangeDescription}
            />
          </div>
          <div className="flex justify-end mb-5">
            <label htmlFor="addToCurrent" className="pr-2">Add to current book: </label>
            <input id="addToCurrent" type="checkbox" checked={checkedAddToExistingBook} onChange={handleChangeAddToExistingBook} />
          </div>
          <div className="flex justify-end mb-6">
            <button className="border px-4 py-2 bg-stone-200 border-stone-300">
              Cancel
            </button>
            <button className="border ml-4 px-4 py-2 bg-blue-200 border-blue-400">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CharacterCreate;