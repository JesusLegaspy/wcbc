import { ReactNode } from 'react';
import { BookProvider } from './books';
import { CharacterProvider } from './characters';

const MyProviders = ({ children }: { children?: ReactNode }) => {

  return (
    <BookProvider>
      <CharacterProvider>
        {children}
      </CharacterProvider>
    </BookProvider>
  );
}

export default MyProviders;