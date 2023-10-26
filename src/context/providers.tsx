import { ReactNode } from 'react';
import { PageProvider } from './page';
import { ArkProvider } from './arks';
import { BookProvider } from './books';
import { CharacterProvider } from './characters';


const MyProviders = ({ children }: { children?: ReactNode }) => {

  return (
    <PageProvider>
      <ArkProvider>
        <BookProvider>
          <CharacterProvider>
            {children}
          </CharacterProvider>
        </BookProvider>
      </ArkProvider>
    </PageProvider>
  );
}

export default MyProviders;