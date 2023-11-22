import { useState, useContext } from "react";
import { ArcContext, Arc } from "../context/arcs";

interface ArcCreateFormProps {
  close?: (newArcId?: number) => void; // A callback to close the form with option to pass new arc ID.
  arc?: Arc;
}

const ArcCreateForm: React.FC<ArcCreateFormProps> = ({ close, arc }) => {
  const { createArc, editArc } = useContext(ArcContext);
  const [valueTitle, setValueTitle] = useState<string>(arc?.title ?? '');
  const [valueSeries, setValueSeries] = useState<number>(arc?.series ?? 1);
  const [titleError, setTitleError] = useState<boolean>(false);

  const handleValueTitle = (title: string) => {
    setValueTitle(title);
    setTitleError(false);
  }

  const handleValueSeries = (number: string) => {
    const digit = parseInt(number) ?? 1;
    setValueSeries(digit);
  }

  const handleClickCreateArc = () => {
    if (!valueTitle) {
      setTitleError(true);
      return;
    }
    if (arc === undefined) {
      createArc(valueTitle, valueSeries).then((id) => {
        if (close) close(id); // Calling close callback with new arc ID
      });
    } else {
      editArc({
        id: arc.id,
        title: valueTitle,
        series: valueSeries
      });
      if (close) close();
    }
  }

  return (
    <fieldset className="my-4 border flex flex-col justify-start">
      <legend>Create Arc</legend>

      {/* Title */}
      <div className="mx-4 flex items-center">
        <label htmlFor="arcTitle" className="whitespace-nowrap">Arc Title</label>
        <input
          type="text"
          id="arcTitle"
          placeholder="Arc Title"
          className={`flex-grow m-4 bg-sky-50 max-w-full w-full sm:w-96 border ${titleError ? 'border-rose-600' : ''}`}
          value={valueTitle}
          onChange={e => handleValueTitle(e.target.value)}
        />
        {titleError && <div className="text-red-500">Title is required</div>}
      </div>

      {/* Series */}
      <div className="mx-4">
        <label htmlFor="arcTitle">Arc Series</label>
        <input
          type="number"
          id="arcSeries"
          placeholder="Arc Series"
          step={1}
          min={1}
          className="m-4 w-10 bg-sky-50 border"
          value={valueSeries}
          onChange={e => handleValueSeries(e.target.value)}
        />
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={() => handleClickCreateArc()}
        className="p-2 bg-sky-100 hover:bg-blue-100 mt-4"
      >
        {arc ? 'Edit Arc' : 'Create Arc'}
      </button>
    </fieldset>
  );

}

export default ArcCreateForm;