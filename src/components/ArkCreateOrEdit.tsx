import { PageContext } from "../context/page";
import { Ark } from "../context/arks";
import ArkCreateForm from "./ArkCreateForm";
import FormTemplate from "./FormTemplate";
import { useContext } from "react";

interface ArkCreateOrEditProps {
  ark?: Ark;
}

const ArkCreateOrEdit: React.FC<ArkCreateOrEditProps> = ({ ark }) => {
  const { goBack } = useContext(PageContext);

  return (
    <FormTemplate title={ark ? `Editing ${ark.title}` : 'Creating Ark'}>
      <div className="lg:mx-36">
        <ArkCreateForm ark={ark} close={goBack} />
      </div>
    </FormTemplate>
  );
}

export default ArkCreateOrEdit;