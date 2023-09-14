import { ReactNode } from 'react';
import { BookProvider } from './books';
import { CharacterProvider } from './characters';
import { PageProvider } from './page';

const MyProviders = ({ children }: { children?: ReactNode }) => {

  return (
    <PageProvider>
      <BookProvider>
        <CharacterProvider>
          {children}
        </CharacterProvider>
      </BookProvider>
    </PageProvider>
  );
}

export default MyProviders;