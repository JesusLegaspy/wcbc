import { useContext, useRef, useEffect, Fragment, useMemo } from "react";
import { PageContext } from "../context/page";
import { ChapterContext } from "../context/chapters";
import { PersonaContext, Persona } from "../context/personas";
import PersonaCreateOrEdit from './PersonaCreateOrEdit';
import ModalConfirm from './ModalConfirm';
import ListItem from "./ListItem";


const PersonaList = () => {
  const { allPersonas, fetchAllPersonas, personas } = useContext(PersonaContext);
  const { setComponent, setModal, clearModal } = useContext(PageContext);
  const { addPersonaImportanceToChapter, deleteAllPersonaImportancesWithPersonaId } = useContext(ChapterContext);
  const { deletePersonaById } = useContext(PersonaContext);
  const { goHome } = useContext(PageContext);

  const fetchAllPersonasRef = useRef(fetchAllPersonas);
  console.debug('PersonaList', 'useEffect', 'fetchAllPersonas');
  useEffect(() => {
    fetchAllPersonasRef.current?.();
  }, []);

  const handleClickEditPersona = (persona: Persona) => {
    setComponent(PersonaCreateOrEdit, { persona: persona });
  };

  const handleDeletePersona = (persona: Persona) => {
    setModal(() => (
      <ModalConfirm
        message={`Delete ${persona.name} from all books?`}
        cancelAction={clearModal}
        acceptAction={() => {
          deletePersonaById(persona.id);
          deleteAllPersonaImportancesWithPersonaId(persona.id);
          clearModal();
        }}
      />
    ));
  };

  const handleClickAddPersona = (persona: Persona) => {
    addPersonaImportanceToChapter({
      personaId: persona.id,
      importance: 2
    });
    goHome();
  }

  type PersonasGroup = {
    [key: string]: Persona[]
  };

  const getUnusedPersonas = () => {
    // todo: think about getting ids from book instead
    const currPersonaIds = new Set(personas.map(c => c.id));

    const sorted = allPersonas
      .filter(persona => !currPersonaIds.has(persona.id))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Dictionary - key of first letter, value of names having the same first letter
    const personaDictionary = sorted.reduce<PersonasGroup>((personaDictionary, persona) => {
      const key: string = persona.name.charAt(0).toUpperCase();
      personaDictionary[key] = personaDictionary[key] || [];
      personaDictionary[key].push(persona);
      return personaDictionary;
    }, {});

    return personaDictionary;
  }

  const unusedPersonas = useMemo(getUnusedPersonas, [personas, allPersonas]);

  return (
    <div className="p-4">
      {Object.entries(unusedPersonas).map(([letter, personas]) => (
        <Fragment key={letter}>
          <div className="z-30 sticky top-16 px-4 py-3 flex items-center font-semibold text-sm text-slate-900 bg-slate-100 backdrop-blur-sm ring-1 ring-slate-900/10">
            {letter}
          </div>
          <div className="divide-y">
            {
              personas.map((persona: Persona) => (
                <ListItem
                  id={persona.id}
                  key={`listitem_${persona.id}`}
                  iconUrl={persona.image ?? ''}
                  title={persona.name}
                  description={persona.description ?? ''}
                  callbackEdit={() => handleClickEditPersona(persona)}
                  callbackDelete={() => handleDeletePersona(persona)}
                  callbackSelect={() => handleClickAddPersona(persona)} />
              ))
            }
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default PersonaList;