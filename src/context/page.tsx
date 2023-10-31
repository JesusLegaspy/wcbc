import { createContext, useState, ReactNode } from "react";
import CharacterPage from "../components/CharacterPage";


interface HistoryEntry<P = {}> {
  component: React.ElementType<P>;
  properties: P;
}

const homePage: HistoryEntry = {
  component: CharacterPage,
  properties: {}
}

interface PageInterface {
  goBack: () => void;
  goHome: () => void;
  setComponent: <P extends {}>(component: React.ElementType<P>, properties: P) => void;
  presentEntry: HistoryEntry;
}

const startPage: PageInterface = {
  goBack: () => { },
  goHome: () => { },
  setComponent: <P extends {}>(component: React.ElementType<P>, properties: P) => { },
  presentEntry: homePage
}

const PageContext = createContext<PageInterface>(startPage);

const PageProvider = ({ children }: { children?: ReactNode }) => {
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry<any>[]>([homePage]);
  const [presentEntry, setPresentEntry] = useState<HistoryEntry<any>>(homePage);

  const goBack = () => {
    setHistoryEntries(currHist => {
      if (currHist.length <= 1) {
        setPresentEntry(homePage);
        return [homePage];
      }
      const newHist = currHist.slice(0, -1);
      setPresentEntry(newHist.at(-1) ?? homePage);
      return newHist;
    });
  }

  const goHome = () => {
    setHistoryEntries([homePage]);
    setPresentEntry(homePage);
  };

  const setComponent = <P extends {}>(
    component: React.ElementType<P>,
    properties: P
  ) => {
    const newEntry: HistoryEntry<P> = { component, properties };
    setHistoryEntries(prevEntries => [...prevEntries, newEntry]);
    setPresentEntry(newEntry);
  }

  return (
    <PageContext.Provider value={{
      goBack,
      goHome,
      setComponent,
      presentEntry
    }}>
      {children}
    </PageContext.Provider>
  );
}

export { PageProvider, PageContext };