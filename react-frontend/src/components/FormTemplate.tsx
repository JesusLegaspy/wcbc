import { ReactNode } from "react";
import NavbarSub from "./NavbarTopSub";

interface FormTemplateProps {
  children?: ReactNode;
  title?: string;
}

const FormTemplate: React.FC<FormTemplateProps> = ({ children, title }) => {

  return (
    <div className="bg-slate-50 min-h-screen">
      <NavbarSub text={title} />
      <div className="mx-auto max-w-5xl bg-white lg:border border-b lg:border-t-0 p-8">
        {children}
      </div>
    </div>
  );
}

export default FormTemplate;