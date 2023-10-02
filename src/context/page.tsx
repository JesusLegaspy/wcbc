import { createContext, useState, ReactNode } from "react";

enum Page {
  Home,
  AddCharacter,
  CreateCharacter
}

interface PageInterface {
  page: Page;
  setPage: (page: Page) => void;
  goBack: () => void;
  goHome: () => void;
}

const startPage: PageInterface = {
  page: Page.Home,
  setPage: () => { },
  goBack: () => { },
  goHome: () => { },
}

const PageContext = createContext<PageInterface>(startPage);

const PageProvider = ({ children }: { children?: ReactNode }) => {
  const [page, setPageInternal] = useState<Page>(Page.Home);
  const [history, setHistory] = useState<readonly Page[]>([Page.Home]);

  const setPage = (newPage: Page) => {
    setHistory(currHist => [...currHist, newPage]);
    setPageInternal(newPage);
  }

  const goBack = () => {
    setHistory(currHist => {
      if (currHist.length <= 2) return [Page.Home];
      return currHist.slice(0, -1);
    });
    setPageInternal(history.at(-2) ?? Page.Home);
  }

  const goHome = () => {
    setHistory([Page.Home]);
    setPageInternal(Page.Home);
  };

  return (
    <PageContext.Provider value={{
      page,
      setPage,
      goBack,
      goHome
    }}>
      {children}
    </PageContext.Provider>
  );
}

export { PageProvider, PageContext, Page };