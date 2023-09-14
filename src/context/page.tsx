import { createContext, useState, ReactNode } from "react";

enum Page {
  Home,
  AddCharacter,
  NewCharacter
}

interface PageInterface {
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>
}

const startPage: PageInterface = {
  page: Page.Home,
  setPage: async () => { },
}

const PageContext = createContext<PageInterface>(startPage);

const PageProvider = ({ children }: { children?: ReactNode }) => {
  const [page, setPage] = useState<Page>(Page.Home);

  return (
    <PageContext.Provider value={{
      page,
      setPage,
    }}>
      {children}
    </PageContext.Provider>
  );
}

export { PageProvider, PageContext, Page };