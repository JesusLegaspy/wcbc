import { useState } from "react";
import NavbarSub from "./NavbarSub";


const BookCreate = () => {
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

  const handleChangeArk = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueArk(e.target.value);
  }

  const handleChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setValueOrder(e.target.value);
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <NavbarSub text="Create new book" />
      <div className="mx-auto max-w-5xl bg-white lg:border border-b lg:border-t-0 p-8">
        <form className="flex flex-col max-w-2xl mx-auto" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="my-4 flex items-center">
            <label className="mb-1 mr-3" htmlFor="title">Name</label>
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
            <label className="mb-1 mr-3" htmlFor="arks">Name</label>
            <select className="" id="arks">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </form>
      </div>
    </div >
  );
}

export default BookCreate;