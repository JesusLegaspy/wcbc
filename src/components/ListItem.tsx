import { useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
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
  const [xPosition, setXPosition] = useState<number>(0);
  const nodeRef = useRef(null);

  let dragStartX = 0;
  const handleDragStart = (e: DraggableEvent) => {
    if (e instanceof MouseEvent) {
      dragStartX = e.clientX;
    }
  };

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    const dragDistance = data.x - dragStartX; // Calculate the distance dragged
    // todo: I think there's access to previous position so it may be better to use that
    const wasOpen = xPosition === -148;

    setXPosition(xPos => {
      if (dragDistance < -74) {
        return -148;
      }
      return 0;
    });

    // If drag distance is minimal and the last drag position was the starting point, consider it a click
    if (Math.abs(dragDistance) < 10 && !wasOpen) {
      callbackSelect(id);
    }
  };

  return (
    <>
      <div
        key={"listitem_child_" + id}
        className="group relative"
      >
        <div className="z-0 lg:z-30 absolute top-0 bottom-0 right-0">
          <div className="flex items-center min-h-full space-x-0 lg:space-x-3">
            {/* Edit */}
            <button
              className="lg:invisible lg:group-hover:visible rounded-full hover:bg-slate-200 text-slate-500 hover:text-black"
              onClick={(e) => {
                e.stopPropagation();
                callbackEdit(id);
              }}
            >
              <TbEdit className="hidden lg:block" />
              <div className="lg:hidden bg-yellow-200 w-16 h-12 flex justify-center items-center text-white">
                Edit
              </div>
            </button>

            {/* Delete */}
            <button
              className="lg:invisible lg:group-hover:visible  rounded-full hover:bg-slate-200 text-slate-500 hover:text-black"
              onClick={(e) => {
                e.stopPropagation();
                callbackDelete(id);
              }}
            >
              <LiaTrashAltSolid className="hidden lg:block" />
              <div className="lg:hidden bg-red-400 w-20 h-12 -mr-12 flex justify-center items-center text-white">
                Delete
              </div>
            </button>
          </div>
        </div>

        <Draggable
          nodeRef={nodeRef}
          position={{ x: xPosition || 0, y: 0 }}
          axis="x"
          bounds={{ left: -148, right: 0 }}
          onStart={handleDragStart}
          onStop={(e, data) => handleDragStop(e, data)}
        >

          <div
            ref={nodeRef}
            className="z-10 flex items-center p-4 lg:pr-28 bg-white hover:bg-slate-50 space-x-4 lg:space-x-6"
          >
            {/* Image */}
            <img
              className="w-12 h-12 rounded-full"
              src={`https://picsum.photos/seed/${id * 10}/100/100`}
              alt={`Pic of ${title}`}
            />

            {/* Title */}
            <strong className="text-slate-900 text-sm font-medium w-16">
              {title}
            </strong>

            {/* Description */}
            <div className="font-thin text-sm line-clamp-2">
              {description}
            </div>
          </div>
        </Draggable>

      </div>
    </>
  );
}

export default ListItem;