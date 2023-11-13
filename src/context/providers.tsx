import { ReactNode } from 'react';
import { PageProvider } from './page';
import { ArcProvider } from './arcs';
import { BookProvider } from './books';
import { ChapterProvider } from './chapters';
import { CharacterProvider } from './characters';


const MyProviders = ({ children }: { children?: ReactNode }) => {

  return (
    <PageProvider>
      <ArcProvider>
        <BookProvider>
          <ChapterProvider>
            <CharacterProvider>
              {children}
            </CharacterProvider>
          </ChapterProvider>
        </BookProvider>
      </ArcProvider>
    </PageProvider>
  );
}

export default MyProviders;