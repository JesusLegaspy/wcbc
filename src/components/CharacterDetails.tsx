import { Character } from "../context/characters";

const CharacterDetails = ({ character }: { character: Character }) => {

  return (
    <div
      key={"detail-" + character.id}
      className={`col-span-3 md:col-span-4 lg:col-span-5 row-span-1 bg-blue-200 border-2 border-blue-200`}>
      <div className="h-48">

      </div>
      {/* <img src="https://placekitten.com/600/300" alt="kitty" /> */}
    </div>
  );
}

export default CharacterDetails