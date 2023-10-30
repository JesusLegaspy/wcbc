import { LiaTrashAltSolid } from "react-icons/lia";
import { TbEdit } from "react-icons/tb";


interface ListItemProps {
  id: number,
  iconUrl: string,
  title: string,
  description: string,
  callbackEdit: (id: number) => void;
  callbackDelete: (id: number) => void;
  callbackSelect: (id: number) => void;
}

const ListItem: React.FC<ListItemProps> = ({
  id,
  iconUrl,
  title,
  description,
  callbackEdit,
  callbackDelete,
  callbackSelect
}) => {

  return (
    <>
      <div
        key={"listitem_child_" + id}
        className="group z-10 flex items-center w-full hover:bg-slate-50"
        onClick={() => callbackSelect(id)}
      >
        {/* Title */}
        <div className="flex items-center gap-4 p-4">
          <img
            className="w-12 h-12 rounded-full"
            src={`https://picsum.photos/seed/${id * 10}/100/100`}
            alt={`Pic of ${title}`}
          />
          <strong className="text-slate-900 text-sm font-medium line-clamp-2">{title}</strong>
        </div>

        {/* Description */}
        <div className="grow font-thin text-sm line-clamp-2">
          {description}
        </div>

        {/* Edit */}
        <button
          className="invisible group-hover:visible flex p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-black"
          onClick={(e) => {
            e.stopPropagation();
            callbackEdit(id);
          }}
        >
          <TbEdit />
        </button>

        {/* Delete */}
        <button
          className="invisible group-hover:visible flex p-2 mr-3 rounded-full hover:bg-slate-200 text-slate-500 hover:text-black"
          onClick={(e) => {
            e.stopPropagation();
            callbackDelete(id);
          }}
        >
          <LiaTrashAltSolid />
        </button>
      </div>
    </>
  );
}

export default ListItem;