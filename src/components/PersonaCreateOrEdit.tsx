import { useContext, useState } from "react";
import { BookContext } from "../context/books";
import { PageContext } from "../context/page";
import { ChapterContext } from "../context/chapters";
import { Persona, PersonaContext } from "../context/personas";
import NavbarSub from "./NavbarSub";
import profile from "../assets/images/profile.png";
import { TbPhotoPlus } from 'react-icons/tb';
import "../styles/PersonaCreateOrEdit.css";

interface PersonaCreateOrEditProps {
  persona?: Persona;
}

const PersonaCreateOrEdit: React.FC<PersonaCreateOrEditProps> = ({ persona }) => {

  const { goHome, goBack } = useContext(PageContext);
  const { currBookId } = useContext(BookContext);
  const { addPersonaImportanceToChapter, chapter, editPersonaImportanceInChapterByPersonaId } = useContext(ChapterContext);
  const { createPersona, editPersonaById } = useContext(PersonaContext);
  const [valueName, setValueName] = useState<string>(persona?.name ?? '');
  const [valueDescription, setValueDescription] = useState<string>(persona?.description ?? '');
  const [checkedAddToExistingBook, setCheckedAddToExistingBook] = useState<boolean>(true);
  const [valueImportance, setValueImportance] = useState<number>(chapter.personaImportances.find(charImportance => charImportance.personaId === persona?.id)?.importance ?? 3);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (persona !== undefined) {
      editPersonaById(persona.id, { id: persona.id, name: valueName, description: valueDescription }).then(() => {
        goBack();
      });
      editPersonaImportanceInChapterByPersonaId(persona.id, valueImportance);
    } else {
      createPersona(currBookId, valueName, valueDescription, '').then(id => {
        if (!id) {
          console.error("Could not add new persona to existing book");
          goHome();
          return;
        }

        if (!checkedAddToExistingBook) {
          goBack();
          return;
        }

        addPersonaImportanceToChapter({
          personaId: id,
          importance: 3 // todo: add mechanism to order
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

  const handleChangeImportance = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValueImportance(Number(newValue));
  };

  return (
    <div className="sm:bg-slate-50 min-h-screen">
      <NavbarSub text={persona ? `Editing ${persona.name}` : "Create new persona"} />
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
          {persona !== undefined &&
            <div className="flex my-8 items-center">
              <label htmlFor="importance" className="mr-3 whitespace-nowrap">Persona Importance</label>
              <div className="relative w-full">
                {/* Tooltip */}
                <div
                  style={{
                    left: `${(valueImportance - 1) * 100 / 4}%`,
                    bottom: "25px"
                  }}
                  className="absolute p-1 rounded bg-stone-200 text-xs tooltip"
                >
                  {valueImportance}
                </div>
                <input
                  className="slider w-full"
                  id="importance"
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={valueImportance}
                  onChange={handleChangeImportance}
                />
              </div>
              <span className="ml-3">
                {valueImportance}
              </span>
            </div>
          }
          {/* Add to current book */}
          {persona === undefined &&
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
              {persona ? 'Edit' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PersonaCreateOrEdit;