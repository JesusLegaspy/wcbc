import NavbarSub from "./NavbarSub";
import profile from "../assets/images/profile.png";

const CharacterCreate = () => {

  return (
    <div>
      <NavbarSub />
      <div className="container m-auto max-w-screen-sm">
        <form className="flex flex-col mx-6">
          <div className="relative m-auto p-6 mb-8">
            <div className="absolute w-52 h-52 bg-slate-200 rounded-full" />
            <img className="relative top-2 left-2 z-10 w-48 h-48 m-auto rounded-full" src={profile} alt="Empty profile." />
          </div>
          <div className="my-4">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="my-4">
            <label htmlFor="description">Last name:</label>
            <input type="text" id="description" name="description" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CharacterCreate;