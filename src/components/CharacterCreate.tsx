import NavbarSub from "./NavbarSub";
import profile from "../assets/images/profile.png";

const CharacterCreate = () => {

  return (
    <div>
      <NavbarSub />
      <div className="container m-auto max-w-screen-xl">
        <form className="flex flex-col">
          <div >
            <img className="" src={profile} alt="Empty profile." />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label htmlFor="description">Last name:</label>
            <input type="text" id="description" name="description" />
          </div>
        </form>
      </div>

    </div>
  );
}

export default CharacterCreate;