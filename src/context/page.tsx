import { createContext, useState, ReactNode } from "react";
import PersonaPage from "../components/PersonaPage";


interface HistoryEntry<P = {}> {
  component: React.ElementType<P>;
  properties: P;
}

const homePage: HistoryEntry = {
  component: PersonaPage,
  properties: {}
}

interface PageInterface {
  goBack: () => void;
  goHome: () => void;
  setComponent: <P extends {}>(component: React.ElementType<P>, properties: P) => void;
  presentEntry: HistoryEntry;
  setModal: (getModalElement: () => JSX.Element) => void;
  modalEntry: JSX.Element | undefined;
  clearModal: () => void;
}

const startPage: PageInterface = {
  goBack: () => { },
  goHome: () => { },
  setComponent: <P extends {}>(component: React.ElementType<P>, properties: P) => { },
  presentEntry: homePage,
  setModal: () => { },
  modalEntry: undefined,
  clearModal: () => { }
}

const PageContext = createContext<PageInterface>(startPage);

const PageProvider = ({ children }: { children?: ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setHistoryEntries] = useState<HistoryEntry<any>[]>([homePage]);
  const [presentEntry, setPresentEntry] = useState<HistoryEntry<any>>(homePage);
  const [modalEntry, setModalEntry] = useState<JSX.Element | undefined>();

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
  };

  const setModal = (getModalElement: () => JSX.Element) => {
    const modalElement = getModalElement();
    setModalEntry(modalElement);
  };

  const clearModal = () => {
    setModalEntry(undefined);
  };

  return (
    <PageContext.Provider value={{
      goBack,
      goHome,
      setComponent,
      presentEntry,
      setModal,
      modalEntry,
      clearModal
    }}>
      {children}
    </PageContext.Provider>
  );
}

export { PageProvider, PageContext };