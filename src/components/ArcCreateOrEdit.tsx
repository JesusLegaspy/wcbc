import { PageContext } from "../context/page";
import { Arc } from "../context/arcs";
import ArcCreateForm from "./ArcCreateForm";
import FormTemplate from "./FormTemplate";
import { useContext } from "react";

interface ArcCreateOrEditProps {
  arc?: Arc;
}

const ArcCreateOrEdit: React.FC<ArcCreateOrEditProps> = ({ arc }) => {
  const { goBack } = useContext(PageContext);

  return (
    <FormTemplate title={arc ? `Editing ${arc.title}` : 'Creating Arc'}>
      <div className="lg:mx-36">
        <ArcCreateForm arc={arc} close={goBack} />
      </div>
    </FormTemplate>
  );
}

export default ArcCreateOrEdit;