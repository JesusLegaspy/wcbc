import { useState, useContext } from "react";
import NavbarSub from "./NavbarSub";
import { ArkContext } from "../context/arks";
import "../styles/BookCreate.css";


const BookCreate = () => {
  const { allArks } = useContext(ArkContext);
  const [valueTitle, setValueTitle] = useState<string>('');
  const [valueArk, setValueArk] = useState<string>('');
  const [valueArkId, setValueArkId] = useState<number>(0);
  const [valueOrder, setValueOrder] = useState<number>(0);

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
    console.log('new ark!');
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
              Add Ark
            </button>
          </div>
          {/* Order */}
          <div className="flex my-3 items-center">
            <label htmlFor="order" className="mr-3">Book Number</label>
            <div className="relative w-full">
              {/* Tooltip */}
              <div
                style={{
                  left: `${valueOrder * 100 / 6}%`,
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
                min="0"
                max="6"
                step="1"
                value={valueOrder}
                onChange={handleChangeOrder}
              />
            </div>
          </div>
        </form>
      </div>
    </div >
  );
}

export default BookCreate;