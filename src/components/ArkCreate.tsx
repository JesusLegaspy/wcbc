import { useState, useContext } from "react";
import { ArkContext } from "../context/arks";

const ArkCreate = ({ close }: { close?: () => void }) => {
  const { createArk } = useContext(ArkContext);
  const [valueTitle, setValueTitle] = useState<string>('');
  const [valueOrder, setValueOrder] = useState<number>(1);
  const [titleError, setTitleError] = useState<boolean>(false);

  const handleValueTitle = (title: string) => {
    setValueTitle(title);
    setTitleError(false);
  }

  const handleValueOrder = (number: string) => {
    const digit = parseInt(number) ?? 1;
    setValueOrder(digit);
  }

  const handleClickCreateArk = () => {
    if (!valueTitle) {
      setTitleError(true);
      return;
    }
    createArk(valueTitle, valueOrder);
    if (close) close();
  }

  return (
    <fieldset className="my-4 border flex flex-col justify-start">
      <legend>Create Ark</legend>

      {/* Title */}
      <div className="mx-4 flex items-center">
        <label htmlFor="arkTitle" className="whitespace-nowrap">Ark Title</label>
        <input
          type="text"
          id="arkTitle"
          placeholder="Ark Title"
          className={`flex-grow m-4 bg-sky-50 max-w-full w-full sm:w-96 border ${titleError ? 'border-rose-600' : ''}`}
          value={valueTitle}
          onChange={e => handleValueTitle(e.target.value)}
        />
        {titleError && <div className="text-red-500">Title is required</div>}
      </div>

      {/* Order */}
      <div className="mx-4">
        <label htmlFor="arkTitle">Ark Order</label>
        <input
          type="number"
          id="arkOrder"
          placeholder="Ark Order"
          step={1}
          min={1}
          className="m-4 w-10 bg-sky-50 border"
          value={valueOrder}
          onChange={e => handleValueOrder(e.target.value)}
        />
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={() => handleClickCreateArk()}
        className="p-2 bg-sky-100 hover:bg-blue-100 mt-4"
      >
        Create Ark
      </button>
    </fieldset>
  );

}

export default ArkCreate;