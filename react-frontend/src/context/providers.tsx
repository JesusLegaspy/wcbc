import { ReactNode } from 'react';
import { PageProvider } from './page';
import { ArcProvider } from './arcs';
import { BookProvider } from './books';
import { ChapterProvider } from './chapters';
import { PersonaProvider } from './personas';


const MyProviders = ({ children }: { children?: ReactNode }) => {

  return (
    <PageProvider>
      <ArcProvider>
        <BookProvider>
          <ChapterProvider>
            <PersonaProvider>
              {children}
            </PersonaProvider>
          </ChapterProvider>
        </BookProvider>
      </ArcProvider>
    </PageProvider>
  );
}

export default MyProviders;