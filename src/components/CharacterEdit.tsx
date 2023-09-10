import { useState, useContext } from "react";
import { CharacterContext, Character } from "../context/characters";

const CharacterEdit = ({ character, setShowEdit }: { character: Character, setShowEdit: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const characterContext = useContext(CharacterContext);

  const [name, setName] = useState(character.name);
  const [description, setDescription] = useState(character.description);
  const [imageUrl, setImageUrl] = useState(character.image);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!characterContext) {
      throw new Error("Could not edit character");
    }
    characterContext.editCharacterById(character.id, { id: character.id, name, description, image: imageUrl });
    setShowEdit(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" onChange={handleName} value={name} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input id="description" type="text" onChange={handleDescription} value={description} />
        </div>
        <div>
          <label htmlFor="imageUrl">Image Url</label>
          <input id='imageUrl' type="text" onChange={handleImage} value={imageUrl} />
        </div>
        <button className="bg-green-200 hover:bg-green-100 active:bg-green-300 py-2 px-4">Edit</button>
      </form>
    </div>
  );
};

export default CharacterEdit;