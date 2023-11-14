import { useContext, useState } from "react";
import { BookContext } from "../context/books";
import { PageContext } from "../context/page";
import { ChapterContext } from "../context/chapters";
import { Character, CharacterContext } from "../context/characters";
import NavbarSub from "./NavbarSub";
import profile from "../assets/images/profile.png";
import { TbPhotoPlus } from 'react-icons/tb';
import "../styles/CharacterCreateOrEdit.css";

interface CharacterCreateOrEditProps {
  character?: Character;
}

const CharacterCreateOrEdit: React.FC<CharacterCreateOrEditProps> = ({ character }) => {

  const { goHome, goBack } = useContext(PageContext);
  const { currBookId } = useContext(BookContext);
  const { addCharacterOrderToChapter, chapter, editCharacterOrderInChapterByCharacterId } = useContext(ChapterContext);
  const { createCharacter, editCharacterById } = useContext(CharacterContext);
  const [valueName, setValueName] = useState<string>(character?.name ?? '');
  const [valueDescription, setValueDescription] = useState<string>(character?.description ?? '');
  const [checkedAddToExistingBook, setCheckedAddToExistingBook] = useState<boolean>(true);
  const [valueOrder, setValueOrder] = useState<number>(chapter.characterOrders.find(charOrder => charOrder.characterId === character?.id)?.order ?? 3);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (character !== undefined) {
      editCharacterById(character.id, { id: character.id, name: valueName, description: valueDescription }).then(() => {
        goBack();
      });
      editCharacterOrderInChapterByCharacterId(character.id, valueOrder);
    } else {
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

        addCharacterOrderToChapter({
          characterId: id,
          order: 3 // todo: add mechanism to order
        });
        goHome();
      });
    }
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

  const handleCancel = () => {
    goBack();
  }

  const handleChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValueOrder(Number(newValue));
  };

  return (
    <div className="sm:bg-slate-50 min-h-screen">
      <NavbarSub text={character ? `Editing ${character.name}` : "Create new character"} />
      <div className="container m-auto max-w-sm sm:max-w-md sm:bg-white sm:border-x sm:border-b sm:border-gray-200">
        <form className="flex flex-col mx-6" onSubmit={handleSubmit}>
          {/* Photo */}
          <div className="relative m-auto p-6 mb-8">
            <div className="absolute left-32 w-52 h-52 bg-slate-200 rounded-full" />
            <img className="relative top-2 left-2 z-10 w-48 h-48 m-auto rounded-full opacity-40" src={profile} alt="Empty profile." />
            <button className="z-20 w-10 h-10 absolute bottom-4 right-4 p-1 hover:bg-slate-200/50 rounded-full">
              <TbPhotoPlus className="w-full h-full text-slate-600 hover:text-slate-700" />
            </button>
          </div>
          {/* Name */}
          <div className="my-4">
            <label className="block mb-1" htmlFor="name">Name</label>
            <input
              className="p-2 border border-gray-300 rounded w-full bg-slate-200"
              type="text"
              id="name"
              name="name"
              placeholder="ShadowWhisker"
              value={valueName}
              onChange={handleChangeName}
            />
          </div>
          {/* Description */}
          <div className="my-4">
            <label className="block mb-1" htmlFor="description">Description</label>
            <textarea
              className="p-1 border border-gray-300 rounded w-full resize-none bg-slate-200"
              rows={5}
              id="description"
              name="description"
              placeholder="Darc grey tabby with amber-green eyes..."
              value={valueDescription}
              onChange={handleChangeDescription}
            />
          </div>
          {/* Importance slider */}
          {character !== undefined &&
            <div className="flex my-8 items-center">
              <label htmlFor="order" className="mr-3 whitespace-nowrap">Character Importance</label>
              <div className="relative w-full">
                {/* Tooltip */}
                <div
                  style={{
                    left: `${(valueOrder - 1) * 100 / 4}%`,
                    bottom: "25px"
                  }}
                  className="absolute p-1 rounded bg-stone-200 text-xs tooltip"
                >
                  {valueOrder}
                </div>
                <input
                  className="slider w-full"
                  id="order"
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={valueOrder}
                  onChange={handleChangeOrder}
                />
              </div>
              <span className="ml-3">
                {valueOrder}
              </span>
            </div>
          }
          {/* Add to current book */}
          {character === undefined &&
            <div className="flex justify-end mb-5">
              <label htmlFor="addToCurrent" className="pr-2">Add to current book: </label>
              <input id="addToCurrent" type="checkbox" checked={checkedAddToExistingBook} onChange={handleChangeAddToExistingBook} />
            </div>
          }
          {/* Submit buttons */}
          <div className="flex justify-end mb-6">
            <button type="button" onClick={handleCancel} className="border px-4 py-2 bg-stone-200 border-stone-300">
              Cancel
            </button>
            <button type="submit" className="border ml-4 px-4 py-2 bg-blue-200 border-blue-400">
              {character ? 'Edit' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CharacterCreateOrEdit;