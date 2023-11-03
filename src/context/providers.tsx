import { ReactNode } from 'react';
import { PageProvider } from './page';
import { ArkProvider } from './arks';
import { BookProvider } from './books';
import { ChapterProvider } from './chapters';
import { CharacterProvider } from './characters';


const MyProviders = ({ children }: { children?: ReactNode }) => {

  return (
    <PageProvider>
      <ArkProvider>
        <BookProvider>
          <ChapterProvider>
            <CharacterProvider>
              {children}
            </CharacterProvider>
          </ChapterProvider>
        </BookProvider>
      </ArkProvider>
    </PageProvider>
  );
}

export default MyProviders;