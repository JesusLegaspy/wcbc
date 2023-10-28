import { useState, useContext } from "react";
import NavbarSub from "./NavbarSub";
import { ArkContext } from "../context/arks";
import "../styles/BookCreate.css";
import ArkCreate from "./ArkCreate";


const BookCreate = () => {
  const { allArks } = useContext(ArkContext);
  const [valueTitle, setValueTitle] = useState<string>('');
  const [valueArk, setValueArk] = useState<string>('');
  const [isArkCreate, setIsArkCreate] = useState<boolean>(false);
  const [valueArkId, setValueArkId] = useState<number>(0);
  const [valueOrder, setValueOrder] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueTitle(e.target.value);
  }

  const handleChangeArk = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValueArkId(parseInt(e.target.value));
  }

  const handleChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValueOrder(Number(newValue));
  };

  const handleClickAddArk = () => {
    setIsArkCreate(isCreate => !isCreate);
  }

  const handleClickCancel = () => {
    console.log('cancel');
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <NavbarSub text="Create new book" />
      <div className="mx-auto max-w-5xl bg-white lg:border border-b lg:border-t-0 p-8">
        <form className="flex flex-col max-w-2xl mx-auto" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="my-4 flex items-center">
            <label className="mb-1 mr-3" htmlFor="title">Title</label>
            <input
              className="p-2 border border-gray-300 rounded w-full bg-slate-200"
              type="text"
              id="title"
              name="title"
              placeholder=""
              value={valueTitle}
              onChange={handleChangeTitle}
              required
            />
          </div>
          {/* Ark */}
          <div className="my-4 flex items-center">
            <label className="mb-1 mr-3" htmlFor="arks">Ark</label>
            <select className="mr-3" id="arks" onChange={handleChangeArk} value={valueArkId}>
              {allArks.map(ark => (
                <option key={`option_${ark.id}`} value={ark.id}>{ark.title}</option>
              ))}
            </select>
            <button
              type="button"
              className="ml-auto bg-stone-200 p-1 px-2 text-sm rounded-lg hover:bg-stone-300"
              onClick={() => handleClickAddArk()}
            >
              {isArkCreate ? "Cancel" : "Add Ark"}
            </button>
          </div>
          {/* Ark Create */}
          {isArkCreate && <ArkCreate close={() => setIsArkCreate(false)} />}
          {/* Order */}
          <div className="flex my-8 items-center">
            <label htmlFor="order" className="mr-3 whitespace-nowrap">Book Number</label>
            <div className="relative w-full">
              {/* Tooltip */}
              <div
                style={{
                  left: `${(valueOrder - 1) * 100 / 5}%`,
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
                max="6"
                step="1"
                value={valueOrder}
                onChange={handleChangeOrder}
              />
            </div>
            <span className="ml-3">
              {valueOrder}
            </span>
          </div>

          {/* Submit */}
          <div className="flex flex justify-end">
            <button
              type="button"
              className="p-2 bg-gray-100 hover:bg-gray-200 mt-4 rounded-lg"
              onClick={() => handleClickCancel()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 bg-cyan-100 hover:bg-cyan-200 mt-4 rounded-lg ml-4"
            >
              Create Ark
            </button>
          </div>
        </form>
      </div>
    </div >
  );
}

export default BookCreate;